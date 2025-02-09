import { batch, JSX, onMount, Show } from "solid-js";
import { createMutable } from "solid-js/store";
import { Config, ToastConstructor } from "../types";
import {
  applyState,
  setStartingOffset,
  createProgressManager,
  handleClick,
  handleMouseEnter,
  handleMouseLeave,
  renderDismissButton,
  renderProgressBar,
  renderIcon,
  createDragManager,
  merge,
  resolvePropValue,
  resolveContent,
  handleFocusOut,
} from "../utils/helpers";

class Toast {
  private setStore;
  private dragManager = createDragManager(this);
  private ownProperties: Set<string>; // We keep track of the properties that are unique to this toast to not override them when the toaster config changes
  store;
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
    this.ownProperties = new Set(Object.keys(args.toastConfig!));
    this.toastConfig = merge(args.store.toasterConfig, args.toastConfig); // Combine the per toast config with the toaster config and keep reactivity. More info in the helper function
    this.offset = setStartingOffset(args.store); // We need to change the starting offset to prevent the toast from flying to the updated offset (more info in the helper function)
    this.progressManager = createProgressManager(); // We need to initialize the progressManager here so the user can acces it when using custom toast (if we initialize it with "this" like in init method, we will lose reactivity)
    return createMutable(this); // This is how we make the class reactive
  }

  init() {
    this.progressManager = createProgressManager(this, () =>
      this.dismiss("__expired"),
    );

    const isLimitReached =
      this.store.toasterConfig.limit &&
      this.store.rendered.length >= this.store.toasterConfig.limit;

    const shouldQueueDueToBlur =
      this.store.isWindowBlurred &&
      !this.store.toasterConfig.renderOnWindowInactive;

    if (isLimitReached || shouldQueueDueToBlur)
      return this.setStore("queued", [...this.store.queued, this]);

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
    Object.keys(args).forEach((key) => this.ownProperties.add(key));

    Object.assign(this.toastConfig, args);

    this.toastConfig.updateCallback?.();

    this.progressManager.update(this.toastConfig.duration); // Update the timer with the new (or old) duration

    this.lifecycle(); // Will start the dismiss timer if conditions are met
  }

  dismiss(reason?: string | boolean, animated = true) {
    /*** The reason can be used as the argument of the exitCallback ***/
    /*** Animated flag is used only for dragEnd event to disable exit animation on dismiss when toast dragged (otherwise it will jump back to start and play the exit animation)  */
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

  patch(args: Config) {
    /** Used to patch toasterConfig (when changed) to the toast, without touching the unique properties of the toast */
    const filteredConfig = Object.fromEntries(
      Object.entries(args).filter(([key]) => !this.ownProperties.has(key)),
    );

    Object.assign(this.toastConfig, filteredConfig);
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
        tabIndex={0}
        id={this.toastConfig.id}
        ref={(el) => (this.ref = el)}
        role={this.toastConfig.role}
        aria-live={this.toastConfig.ariaLive}
        onClick={(e) => handleClick(e, this)}
        onMouseEnter={handleMouseEnter.bind(null, this)}
        onMouseLeave={handleMouseLeave.bind(null, this)}
        onTouchStart={this.dragManager.handleDragStart}
        onTouchMove={this.dragManager.handleDragMove}
        onTouchEnd={this.dragManager.handleDragEnd}
        onFocusIn={this.progressManager.pause}
        onFocusOut={(e) => handleFocusOut(this, e)}
        onKeyDown={(e) => e.key === "Escape" && this.dismiss()}
        class={`${resolvePropValue("wrapperClass", this)} sn-theme-${this.toastConfig.theme} sn-type-${this.toastConfig.type} ${applyState(this)}`.trim()}
        style={{
          ...(resolvePropValue("wrapperStyle", this) as JSX.CSSProperties),
          [this.store.toasterConfig.positionX]:
            `${this.store.toasterConfig.offsetX}px`,
          [this.store.toasterConfig.positionY]: `${this.offset}px`,
        }}
      >
        {/* If the toastConfig.content is a function (it's contentType will be "dynamic") we want to leave it unstyled */}
        <Show
          fallback={resolveContent(this)}
          when={this.toastConfig.contentType === "static"}
        >
          <div
            class={resolvePropValue("class", this) as string}
            style={resolvePropValue("style", this) as JSX.CSSProperties}
          >
            {renderIcon(this)}
            {resolveContent(this)}
            {renderDismissButton(this)}
            {renderProgressBar(this)}
          </div>
        </Show>
      </div>
    );
  }
}

export default Toast;
