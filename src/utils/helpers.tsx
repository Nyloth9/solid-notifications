import { createSignal, JSX } from "solid-js";
import { Config, ProgressControls, ToasterStore, ToastContext } from "../types";
import Toast from "../core/Toast";

function findToast(
  id: string | undefined,
  store: ToasterStore,
): Toast | undefined {
  if (!id) return;

  const toast = store.rendered.find((toast) => toast.toastConfig.id === id);
  if (toast) return toast;

  return store.queued.find((toast) => toast.toastConfig.id === id);
}

function createToastId(
  toastCounter: number,
  toasterId: string | undefined,
  userProvidedId?: string,
): string {
  if (userProvidedId) return userProvidedId;

  if (!toasterId || toasterId === "__default") {
    return `toast-${toastCounter++}`;
  }

  return `${toasterId}:toast-${toastCounter}`;
}

function resolveContent(t: Toast): JSX.Element | string {
  if (typeof t.toastConfig.content === "function") {
    // If the content is a function, pass the toast instance to it
    return t.toastConfig.content(t);
  }
  return (
    t.toastConfig.content || `🍞 Toast "${t.toastConfig.id}" ready to serve!`
  );
}

function resolvePropValue<K extends keyof Config>(key: K, t: Toast) {
  const prop = t.toastConfig[key];

  if (typeof prop === "function") {
    return (prop as (args: ToastContext) => unknown)({
      theme: t.toastConfig.theme,
      type: t.toastConfig.type,
    });
  }

  return prop;
}

function getToasterStyle(positionX: "left" | "right" | "center") {
  switch (positionX) {
    case "left":
      return "start";
    case "right":
      return "end";
    case "center":
      return "center";
  }
}

function setStartingOffset(
  /*** We need to set starting offset because otherwise newly created toast will always appear at positionY of the toaster and then fly to the updated offset (when reversed order is true this is a problem) ***/
  store: ToasterStore,
) {
  if (!store.toasterConfig.reverseToastOrder)
    return store.toasterConfig.offsetY;

  const precedingToast = store.rendered[0];
  if (!precedingToast) return store.toasterConfig.offsetY; // Means there is only one toast so we can safely return offsetY

  // To get the new offset, we only need info about the preceding toast
  return (
    precedingToast.offset +
    precedingToast.ref?.clientHeight! +
    store.toasterConfig.gutter
  );
}

function merge(target: any, source: any) {
  const isPlainObject = (obj: any) =>
    obj && typeof obj === "object" && obj.constructor === Object;

  if (Array.isArray(target)) {
    return source;
  }

  if (isPlainObject(target) && isPlainObject(source)) {
    return Object.keys(source).reduce(
      (acc, key) => {
        if (typeof key !== "symbol") {
          acc[key] = merge(target[key], source[key]);
        }

        return acc;
      },
      { ...target },
    );
  }

  return source;
}

function filterOptions(options: Partial<Config> | undefined): Partial<Config> {
  if (!options) return {};

  const keysToRemove: (keyof Config)[] = [
    "toasterId",
    "positionX",
    "positionY",
    "offsetX",
    "offsetY",
    "gutter",
    "limit",
    "toasterStyle",
    "reverseToastOrder",
    "pauseOnWindowInactive",
    "renderOnWindowInactive",
  ];

  const filteredOptions = Object.fromEntries(
    Object.entries(options).filter(
      ([key]) => !keysToRemove.includes(key as keyof Config),
    ),
  );

  return filteredOptions;
}

function applyState(toast: Toast) {
  const toastConfig = toast.toastConfig;

  switch (toast.state) {
    case "entering":
      if (toastConfig.onEnter) return toastConfig.onEnter;
    case "idle":
      if (toastConfig.onIdle) return toastConfig.onIdle;
    case "exiting":
      if (toastConfig.onExit) return toastConfig.onExit;
    default:
      return `sn-state-${toastConfig.positionX}-${toastConfig.positionY}-${toast.state}`;
  }
}

function createProgressManager(toast?: Toast, callback?: () => void) {
  const [progress, setProgress] = createSignal(0);

  let duration = toast?.toastConfig.duration;
  let start = performance.now();
  let elapsed = 0;
  let paused = false;

  const getFrame = () => {
    if (!duration || !callback) return;
    if (paused) return;

    const now = performance.now();
    elapsed = now - start;

    const newProgress = Math.min(
      Math.round((elapsed / duration) * 10000) / 100,
      100,
    );

    setProgress(newProgress);

    if (newProgress >= 100) {
      paused = true;
      return callback();
    }

    requestAnimationFrame(getFrame);
  };

  const play = () => {
    paused = false;
    start = performance.now() - elapsed;
    requestAnimationFrame(getFrame);

    if (toast) toast.isPaused = false;
  };

  const pause = () => {
    paused = true;
    if (toast) toast.isPaused = true;
  };

  const update = (newDuration: number | false) => {
    reset();
    duration = newDuration;
    start = performance.now();
  };

  const reset = () => {
    paused = true;
    setProgress(0);
    elapsed = 0;
    if (toast) toast.isPaused = true;
  };

  return {
    progress,
    play,
    pause,
    update,
    reset,
  };
}

function setProgressControls(toast: Toast): ProgressControls {
  /** Why isPausedByUser flag?
   * It's basically a flag to check if the timer was paused by the user and not by the window blur and focus event listener.
   * We need this flag for the case when the timer is paused by the user, and the browser tab is switched.
   * Because we have a global event listener for window blur and focus, and because we pause all timers when the tab is not visible (if this option is enabled),
   * while we play all timers when the tab is visible again, thus the timer which was paused by the user will be played again.
   * To avoid this, we set a isPausedByUser flag to true when the timer is paused by the user, and then we check this flag in the blur and focus event listener
   * once the tab is visible again, and if the flag is true, we don't play the timer.
   */

  return {
    pause: () => {
      toast.progressManager.pause();
      toast.isPausedByUser = true;
    },
    play: () => {
      toast.progressManager.play();
      toast.isPausedByUser = false;
    },
    reset: () => {
      toast.progressManager.reset();
      toast.isPausedByUser = true;
    },
    progress: toast.progressManager.progress,
  };
}

function createDragManager(toast: Toast) {
  let startX = 0;
  let currentX = 0;

  const handleDragStart = (e: TouchEvent) => {
    if (!toast.ref) return;
    if (!toast.toastConfig.dragToDismiss) return;

    startX = e.touches[0].clientX;
    toast.ref.style.transition = "none";
    toast.progressManager.pause();
  };

  const handleDragMove = (e: TouchEvent) => {
    if (!toast.ref) return;
    if (!toast.toastConfig.dragToDismiss) return;

    currentX = e.touches[0].clientX - startX;
    toast.ref.style.transform = `translateX(${currentX}px)`;
  };

  const handleDragEnd = () => {
    if (!toast.ref) return;
    if (!toast.toastConfig.dragToDismiss) return;

    // Check if drag distance is sufficient to dismiss
    if (Math.abs(currentX) > toast.toastConfig.dragTreshold) {
      toast.ref.style.transition = "all 0.3s ease";
      toast.ref.style.transform = `translateX(${currentX > 0 ? "100%" : "-100%"})`;
      toast.ref.style.opacity = "0";

      toast.dismiss(undefined, false);
    } else {
      // Reset position if drag distance is insufficient
      toast.progressManager.play();
      toast.ref.style.transition = "all 0.3s ease";
      toast.ref.style.transform = "translateX(0)";
    }

    startX = 0;
    currentX = 0;
  };

  return {
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  };
}

function handleClick(e: MouseEvent, toast: Toast) {
  if (!toast.toastConfig.dismissOnClick) return;

  const isInteractiveElement =
    e.target instanceof HTMLElement &&
    e.target.closest("a, button, input, select, textarea");

  if (isInteractiveElement) return;

  toast.dismiss();
}

function handleMouseEnter(toast: Toast) {
  if (!toast.toastConfig.pauseOnHover) return;

  const shouldIgnoreHoverWhileBlurred =
    toast.store.isWindowBlurred && toast.toastConfig.pauseOnWindowInactive;

  if (shouldIgnoreHoverWhileBlurred) return;
  if (toast.isPausedByUser) return;

  toast.progressManager.pause();
}

function handleMouseLeave(toast: Toast) {
  if (!toast.toastConfig.pauseOnHover) return;

  const shouldIgnoreHoverWhileBlurred =
    toast.store.isWindowBlurred && toast.toastConfig.pauseOnWindowInactive;

  if (shouldIgnoreHoverWhileBlurred) return;
  if (toast.isPausedByUser) return;

  toast.progressManager.play();
}

function renderDismissButton(toast: Toast) {
  if (toast.toastConfig.dismissOnClick || !toast.toastConfig.showDismissButton)
    return null;

  return (
    <button
      aria-label="Close notification"
      class={resolvePropValue("dismissButtonClass", toast) as string}
      style={resolvePropValue("dismissButtonStyle", toast) as JSX.CSSProperties}
      onClick={() => toast.dismiss()}
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="100%"
        height="100%"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2.5"
          d="m7 7l10 10M7 17L17 7"
        />
      </svg>
    </button>
  );
}

function renderProgressBar(toast: Toast) {
  if (!toast.toastConfig.showProgressBar || !toast.toastConfig.duration)
    return null;

  return (
    <div
      role="progressbar"
      data-role="progress"
      class={resolvePropValue("progressBarClass", toast) as string}
      style={{
        transform: `scaleX(${(100 - toast.progressManager?.progress()) / 100})`,
        "transform-origin": "left",
        ...(resolvePropValue("progressBarStyle", toast) as JSX.CSSProperties),
      }}
    />
  );
}

function renderIcon(toast: Toast) {
  const config = toast.toastConfig;

  if (!config.showIcon) return null;
  if (config.icon) {
    if (typeof config.icon === "function")
      return config.icon({ theme: config.theme, type: config.type });

    return config.icon;
  }

  switch (config.type) {
    case "success":
      return (
        <svg
          class="sn-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle stroke="currentColor" cx="26" cy="26" r="25" fill="none" />
          <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
      );

    case "error":
      return (
        <svg
          class="sn-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle stroke="currentColor" cx="26" cy="26" r="25" fill="none" />
          <path fill="none" d="M14.1 14.1l23.8 23.8 m0,-23.8 l-23.8,23.8" />
        </svg>
      );

    case "warning":
      return (
        <svg
          class="sn-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle stroke="currentColor" cx="26" cy="26" r="25" fill="none" />
          <path fill="none" d="M26 9v20M26 34v8" />
        </svg>
      );

    case "info":
      return (
        <svg
          class="sn-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle stroke="currentColor" cx="26" cy="26" r="25" fill="none" />
          <path fill="none" d="M26 9v8M26 22v22" />
        </svg>
      );

    case "loading":
      return <div class="sn-icon sn-icon-loading" />;

    default:
      return null;
  }
}

export {
  findToast,
  createToastId,
  resolveContent,
  resolvePropValue,
  getToasterStyle,
  setStartingOffset,
  merge,
  filterOptions,
  applyState,
  createProgressManager,
  setProgressControls,
  createDragManager,
  handleClick,
  handleMouseEnter,
  handleMouseLeave,
  renderDismissButton,
  renderProgressBar,
  renderIcon,
};
