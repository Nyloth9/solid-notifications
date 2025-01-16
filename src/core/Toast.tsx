import { batch, JSX, onMount, Show } from "solid-js";
import { createMutable } from "solid-js/store";
import { Config, ToastConstructor } from "../types";
import {
  applyState,
  customMerge,
  setStartingOffset,
  createProgressManager,
  handleClick,
  handleMouseEnter,
  handleMouseLeave,
  renderDismissButton,
  renderProgressBar,
  renderIcon,
  createDragManager,
} from "../utils/helpers";

/***
 * TO DO
 * ✔ - will remove "infinite"
 * ✔ - will remove animation options
 * ✔ - will fix positionX = center
 * ✔ - add queue for toasts? (if there is not enough space for the toast, it will be added to the queue)
 * ✔ will remove unstyled?
 * ✔ will remove the floating dismiss button
 * - max toast duration? If the toast is rendered and stays for too long, it will be dismissed (should be duration + maxDuration -> so even if timer is isPausedByUser, it will be dismissed) - maybe
 * ✔ - remove overflow-control
 * ✔ - existing toast id should be checked and error should be thrown if the id already exists
 * ✔ - we are merging defaultConfig with the toast instead of config passed to the toaster <- this should be fixed
 * ✔ - add property for queue limit
 * ✔ - dont allow positionX, positionY, offsetX and offsetY to be changed per Toast as this should be handled by the Toaster
 * ✔ - add option to not have a toast limit
 * ✔ - allow users to read the queue
 * ✔ add pause on onMouseEnter etc.
 * ✔ add pause on tab switch
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
 * ✔ - add function as content argument in notify
 * ✔ - added visibility change event listener
 * ✔ - add option to not render toasts if the tab is blurred
 * ✔ - add clear only rendered toasts (keepQueued)
 * ✔ - handle a situation when window is blurred but an update happens to the toast and then the timer runs... (we dont want that)
 * ✔ - add styling
 * - add tests
 * ✔ add swipe to dismiss
 * - clean up comments
 * ✔ - add dismiss on click body
 * ✔ - add dismiss on click close button
 * - add aria roles
 * - add themes?
 * - write default config to docs
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
 * - per toaster window blur event listener
 * - option to not render toasts if the tab is blurred
 * - custom toast (function as content argument), will be unstyled
 */

class Toast {
  private setStore;
  private dragManager = createDragManager(this);
  store; // <-- Should be removed
  toasterConfig: Config;
  toastConfig: Config;
  ref: HTMLElement | null = null;
  state: "entering" | "idle" | "exiting" = "entering";
  renderedAt: number | undefined; // Flag to check against when we need to know if the toast was rendered
  progressManager: ReturnType<typeof createProgressManager>;
  isPaused = true; // A flag that's exposed for custom toasts. Has no internal use
  isPausedByUser = false; // True if the timer was paused by the user (checked on window blur and mouse hover)
  offset = 0;

  constructor(args: ToastConstructor) {
    this.store = args.store;
    this.setStore = args.setStore;
    this.toasterConfig = args.toasterConfig;
    this.toastConfig = customMerge(args.toasterConfig, args.toastConfig); // Combine the per toast config with the toaster config
    this.offset = setStartingOffset(args.store, args.toasterConfig); // We need to change the starting offset to prevent the toast from flying to the updated offset (more info in the helper function)
    this.progressManager = createProgressManager(); // We need to initialize it here so the user can acces it when using custom toast (if we initialize it with "this" like in init method, we will lose reactivity)
    return createMutable(this); // This is how we make the class reactive
  }

  init() {
    /*** By assigning the timer in the constructor we lose reactivity of "state", so we assign it here */
    this.progressManager = createProgressManager(this, () =>
      this.dismiss("__expired"),
    );

    const isLimitReached =
      this.toasterConfig.limit &&
      this.store.rendered.length >= this.toasterConfig.limit;

    if (isLimitReached)
      return this.setStore("queued", [...this.store.queued, this]);

    const shouldQueueDueToBlur =
      this.store.isWindowBlurred && !this.toasterConfig.renderOnWindowInactive;

    if (shouldQueueDueToBlur)
      return this.setStore("queued", [this, ...this.store.queued]);

    this.setStore("rendered", [this, ...this.store.rendered]);
  }

  private lifecycle() {
    /*** Fires when toast is rendered and when it's updated ***/
    /*** If toast update happens while the toast is staying in the queue and still wasn't rendered, ***/
    /*** we want to update the toast in the queue, but not run its dismiss timer. ***/
    /*** This is solved by checking if the toast was rendered, and if not, don't run the lifecycle. ***/

    if (!this.renderedAt) return;

    /** If we check for isPausedByUser and blurred before applying state; toast would run entrance animation and never apply idle state (if isPausedByUser or blurred), so we do it here */
    if (this.state !== "idle")
      setTimeout(() => (this.state = "idle"), this.toastConfig.enterDuration);

    if (this.isPausedByUser) return;
    if (this.store.isWindowBlurred && this.toastConfig.pauseOnWindowInactive)
      return;

    this.progressManager.play(); // This is where we first start the timer in the toast lifecycle
  }

  update(args: Partial<Config>) {
    // Combine the args with the existing toast config
    const merged = customMerge(this.toastConfig, args);
    Object.assign(this.toastConfig, merged);

    this.toastConfig.updateCallback?.();

    this.progressManager.update(this.toastConfig.duration); // Update the timer with the new duration

    this.lifecycle(); // Will start the dismiss timer if conditions are met
  }

  dismiss(reason?: string | boolean, animated = true) {
    /*** The reason can be used as the argument of the exitCallback ***/
    /*** Animated flag is used only for dragEnd event to disable exit animation on dismiss when toast dragged (otherwise it will jump back to start and play exit animation)  */
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

    if (animated) this.state = "exiting";

    setTimeout(() => {
      batch(() => {
        this.setStore("rendered", (state) =>
          state.filter((t) => t.toastConfig.id !== this.toastConfig.id),
        );
        this.setStore("queued", (state) =>
          state.filter((t) => t.toastConfig.id !== this.toastConfig.id),
        );
      });
    }, this.toastConfig.exitDuration);
  }

  remove() {
    /*** This will remove the toast without calling the exitCallback and without the exit animation ***/
    batch(() => {
      this.setStore("rendered", (state) =>
        state.filter((t) => t.toastConfig.id !== this.toastConfig.id),
      );
      this.setStore("queued", (state) =>
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
        id={this.toastConfig.id}
        ref={(el) => (this.ref = el)}
        onClick={(e) => handleClick(e, this)}
        onMouseEnter={handleMouseEnter.bind(null, this)}
        onMouseLeave={handleMouseLeave.bind(null, this)}
        onTouchStart={this.dragManager.handleDragStart}
        onTouchMove={this.dragManager.handleDragMove}
        onTouchEnd={this.dragManager.handleDragEnd}
        class={`${this.toastConfig.wrapperClass} ${applyState(this)}`.trim()}
        style={{
          ...this.toastConfig.wrapperStyle,
          [this.toasterConfig.positionX]: `${this.toasterConfig.offsetX}px`,
          [this.toasterConfig.positionY]: `${this.offset}px`,
        }}
      >
        {/* If the toastConfig.body is a function (it's contentType will be "dynamic") we want to leave it unstyled */}
        <Show
          fallback={this.toastConfig.content}
          when={this.toastConfig.contentType === "static"}
        >
          <div class={this.toastConfig.class} style={this.toastConfig.style}>
            {renderIcon(this)}
            {this.toastConfig.content}
            {renderDismissButton(this)}
          </div>
          {renderProgressBar(this)}
        </Show>
      </div>
    );
  }
}

export default Toast;
