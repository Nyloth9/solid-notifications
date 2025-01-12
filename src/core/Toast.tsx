import {
  batch,
  createMemo,
  createSignal,
  JSX,
  onCleanup,
  onMount,
  Show,
} from "solid-js";
import { createMutable, produce } from "solid-js/store";
import { Config, ToastConstructor } from "../types";
import {
  applyState,
  customMerge,
  setStartingOffset,
  createProgressManager,
} from "../utils/helpers";

/***
 * TO DO
 * ✔ - will remove "infinite"
 * ✔ - will remove animation options
 * ✔ - will fix positionX = center
 * ✔ - add queue for toasts? (if there is not enough space for the toast, it will be added to the queue)
 * - will remove unstyled?
 * - will remove the inline dismiss button
 * - max toast duration. If the toast is rendered and stays for too long, it will be dismissed (should be duration + maxDuration -> so even if timer is static, it will be dismissed)
 * ✔ - remove overflow-control
 * ✔ - existing toast id should be checked and error should be thrown if the id already exists
 * ✔ - we are merging defaultConfig with the toast instead of config passed to the toaster <- this should be fixed
 * ✔ - add property for queue limit
 * ✔ - dont allow positionX, positionY, offsetX and offsetY to be changed per Toast as this should be handled by the Toaster
 * ✔ - add option to not have a toast limit
 * ✔ - allow users to read the queue
 * - add pause on onMouseEnter etc.
 * - add pause on tab switch
 * ✔ - added reverseToastOrder
 * ✔ - add return types
 * ✔ - exitCallback will be called with a reason (true, false or manually provided reason) which can then be used when declaring the callback as the first argument
 * ✔ - add callbacks
 * ✔ - put "toasterConfig" and "toastConfig" as separate objects in the Toast, no need to have positionX, positionY, offsetX and offsetY in the Toast
 * ✔ - add toast timer controls
 * ✔ - change dismiss, update and remove signatures
 * ✔ - enable false as duration
 * - add custom ordering support?
 * - change library name to "solid-notifications"
 * ✔ - update all toasts in a toaster, update all toasts in all toasters
 * ✔ - fix a bug where timer controls dont work when toast is added to the queue
 *  - add function as body argument in notify
 * ✔ - added visibility change event listener
 * - add option to not render toasts if the tab is blurred
 * - add clear rendered toasts
 * - handle a situation when window is blurred but an update happens to the toast and then the timer runs... (we dont want that)
 */

/***
 * NEW FEATURES
 * - Now supports multiple progress bars at the same time
 * - For infinite duration, set the duration to 0
 * - Now supports queue for toasts (if there is not enough space for the toast, or there is a toast limit, it will be added to the queue)
 * - If a toast is not rendered and stays in the queue, it will not run the dismiss timer
 * - If a toast update happens while the toast is in the queue, it will update the toast without running the dismiss timer, and render it when there is enough space
 * - Now supports multiple toasters at the same time (if only one toaster is used, no arg for useToast is required)
 * - Now exposes a progress() method to get the progress of the timer, which is reactive and can be used in the UI
 */

class Toast {
  private toasts; // <-- Should be removed
  private setToasts;
  toasterConfig: Config;
  toastConfig: Config;
  ref: HTMLElement | null = null;
  state: "entering" | "idle" | "exiting" = "entering";
  renderedAt: number | undefined; // Flag to check against when we need to know if the toast was rendered
  progressManager!: ReturnType<typeof createProgressManager>;
  isStatic = false; // True if the timer was paused by the user
  offset = 0;

  constructor(args: ToastConstructor) {
    this.toasts = args.toasts;
    this.setToasts = args.setToasts;
    this.toasterConfig = args.toasterConfig;
    this.toastConfig = customMerge(args.toasterConfig, args.toastConfig); // Combine the per toast config with the toaster config
    this.offset = setStartingOffset(args.toasts, args.toasterConfig); // We need to change the starting offset to prevent the toast from flying to the updated offset (more info in the helper function)

    return createMutable(this); // This is how we make the class reactive
  }

  init() {
    /*** By assigning the timer in the constructor we lose reactivity of "state", so we assign it here */
    this.progressManager = createProgressManager(
      this.toastConfig.duration,
      () => this.dismiss("__expired"),
    );

    const isLimitReached =
      this.toasterConfig.limit &&
      this.toasts.rendered.length >= this.toasterConfig.limit;

    if (isLimitReached)
      return this.setToasts("queued", [...this.toasts.queued, this]);

    this.setToasts("rendered", [this, ...this.toasts.rendered]);
  }

  private lifecycle() {
    /*** Fires when toast is rendered and when it's updated ***/
    /*** Special attention is required to the situation if toast update happens while the toast is staying in the queue and still wasn't rendered. ***/
    /*** In that case, we want to update the toast in the queue, but not run its dismiss timer. ***/
    /*** This is solved by checking if the toast was rendered, and if not, don't run the lifecycle. ***/
    console.log("isStatic", this.isStatic);

    if (!this.renderedAt) return;
    // if (this.isWindowBlurred) return; // If the toast appears while the window is blurred, we dont want to start the timer

    this.progressManager.play(); // This is the only place where we will start the dismiss timer programmatically (so basically when the toast is rendered)

    if (this.state === "idle") return; // If a rendered toast is updated, we don't want to re-run the entrance animation again. There is also no need to re-set the state to idle

    setTimeout(() => (this.state = "idle"), this.toastConfig.enterDuration);
  }

  update(args: Partial<Config>) {
    // Combine the args with the existing config
    const merged = customMerge(this.toastConfig, args);
    Object.assign(this.toastConfig, merged);

    this.toastConfig.updateCallback?.();

    this.progressManager.update(this.toastConfig.duration); // Update the timer with the new duration

    if (this.isStatic) return; // If the timer was paused by the user, we dont want to start it again
    this.lifecycle(); // Should fix the situation when the toast is updated while the timer is paused (it should not start the timer again). We dont want to run the timer of the updated toast if window is blurred etc
  }

  dismiss(reason?: string | boolean) {
    // The reason can be used as the argument of the exitCallback
    if (this.toastConfig.exitCallback) {
      switch (reason) {
        case "__expired":
          reason = false; // If the reason was "__expired", that means the toast was dismissed by the Timer
          break;
        case undefined:
          reason = true; // If no reason was provided, that means the toast was dismissed by the user (the Timer will send "__expired" as a reason)
          break;
        default:
          reason = reason as string; // If the reason was provided, we pass it as a string
          break;
      }

      this.toastConfig.exitCallback?.(reason);
    }

    this.state = "exiting";

    setTimeout(() => {
      batch(() => {
        this.setToasts("rendered", (state) =>
          state.filter((t) => t.toastConfig.id !== this.toastConfig.id),
        );
        this.setToasts("queued", (state) =>
          state.filter((t) => t.toastConfig.id !== this.toastConfig.id),
        );
      });
    }, this.toastConfig.exitDuration);
  }

  remove() {
    // This will remove the toast without calling the exitCallback and without the exit animation
    batch(() => {
      this.setToasts("rendered", (state) =>
        state.filter((t) => t.toastConfig.id !== this.toastConfig.id),
      );
      this.setToasts("queued", (state) =>
        state.filter((t) => t.toastConfig.id !== this.toastConfig.id),
      );
    });
  }

  render(): JSX.Element {
    onMount(() => {
      this.renderedAt = Date.now(); // We dont want to run this in the lifecycle because lifecycle can also run on update (which can happen before the toast is rendered)
      this.toastConfig.enterCallback?.();
      this.lifecycle(); // Will start the dismiss timer
    });

    return (
      <div
        data-role="toast"
        ref={(el) => {
          this.ref = el;
        }}
        id={this.toastConfig.id}
        class={`absolute max-w-80 overflow-hidden rounded bg-white p-2.5 shadow-strong transition-all duration-300 ${applyState(
          this.toastConfig,
          this.state,
        )}`.trim()}
        onMouseEnter={() => {
          if (!this.toastConfig.pauseOnHover) return;
          if (this.isStatic) return;
          // if (this.isWindowBlurred) return;

          this.progressManager.pause();
        }}
        onMouseLeave={() => {
          if (!this.toastConfig.pauseOnHover) return;
          if (this.isStatic) return;
          //  if (this.isWindowBlurred) return;

          this.progressManager.play();
        }}
        style={{
          [this.toasterConfig.positionX]: `${this.toasterConfig.offsetX}px`,
          [this.toasterConfig.positionY]: `${this.offset}px`,
        }}
      >
        <div class="toast">{this.toastConfig.body}</div>

        <Show
          when={
            this.toastConfig.progressBar?.showDefault &&
            this.toastConfig.duration
          }
        >
          <div
            data-role="progress"
            class={this.toastConfig.progressBar?.className!}
            style={{
              transform: `scaleX(${(100 - this.progressManager?.progress()) / 100})`,
              "transform-origin": "left",
            }}
          />
        </Show>
      </div>
    );
  }
}

export default Toast;
