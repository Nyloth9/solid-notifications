import { createSignal } from "solid-js";
import { Config, ProgressControls, ToastStore } from "../types";
import Toast from "../core/Toast";

function findToast(
  id: string | undefined,
  toasts: ToastStore,
): Toast | undefined {
  const allToasts = [...toasts.rendered, ...toasts.queued];
  return allToasts.find((toast) => toast.toastConfig.id === id);
}

export function createToastId(
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
  toasts: ToastStore,
  { offsetY, gutter, reverseToastOrder }: Config,
) {
  if (!reverseToastOrder) return offsetY;

  const precedingToast = toasts.rendered[0];
  if (!precedingToast) return offsetY; // Means there is only one toast so we can safely return offsetY

  // To get the new offset, we only need info about the preceding toast
  return precedingToast.offset + precedingToast.ref?.clientHeight! + gutter;
}

function customMerge(target: any, source: any, omit: string[] = []) {
  const isPlainObject = (obj: any) =>
    obj && typeof obj === "object" && obj.constructor === Object;

  if (Array.isArray(target)) {
    return source; // Replace arrays (otherwise animation keyframes will not work)
  }

  if (isPlainObject(target) && isPlainObject(source)) {
    return Object.keys(source).reduce(
      (acc, key) => {
        if (typeof key !== "symbol") {
          acc[key] = customMerge(target[key], source[key]);
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
    "positionX",
    "positionY",
    "offsetX",
    "offsetY",
    "gutter",
    "limit",
    "toasterStyle",
    "reverseToastOrder",
    "pauseOnWindowInactive",
  ];

  const filteredOptions = Object.fromEntries(
    Object.entries(options).filter(
      ([key]) => !keysToRemove.includes(key as keyof Config),
    ),
  );

  return filteredOptions;
}

function applyState(
  toasConfig: Config,
  state: "entering" | "idle" | "exiting" = "entering",
) {
  switch (state) {
    case "entering":
      return toasConfig.onEnter;
    case "idle":
      return toasConfig.onIdle;
    case "exiting":
      return toasConfig.onExit;
  }
}

function createProgressManager(duration: number | false, callback: () => void) {
  const [progress, setProgress] = createSignal(0);

  let start = performance.now();
  let elapsed = 0;
  let paused = false;

  const getFrame = () => {
    if (!duration) return;
    if (paused) return;

    const now = performance.now();
    elapsed = now - start;

    const newProgress = Math.min(
      Math.round((elapsed / duration) * 10000) / 100,
      100,
    );

    setProgress(newProgress);

    if (newProgress >= 100) return callback();

    requestAnimationFrame(getFrame);
  };

  const play = () => {
    paused = false;
    start = performance.now() - elapsed;
    requestAnimationFrame(getFrame);
  };

  const pause = () => {
    paused = true;
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
  /** Why static flag?
   * It's basically a flag to check if the timer was paused by the user and not by the visibility change event listener.
   * We need this flag for the case when the timer is paused by the user, and the browser tab is switched.
   * Because we have a global event listener for visibility change, and because we pause all timers when the tab is not visible (if this option is enabled),
   * while we play all timers when the tab is visible again, thus the timer which was paused by the user will be played again.
   * To avoid this, we set a static flag to true when the timer is paused by the user, and then we check this flag in the visibility change event listener
   * once the tab is visible again, and if the flag is true, we don't play the timer.
   */

  return {
    pause: () => {
      toast.progressManager.pause();
      toast.isStatic = true;
    },
    play: () => {
      toast.progressManager.play();
      toast.isStatic = false;
    },
    reset: () => {
      toast.progressManager.reset();
      toast.isStatic = true;
    },
  };
}

export {
  findToast,
  getToasterStyle,
  setStartingOffset,
  customMerge,
  filterOptions,
  applyState,
  createProgressManager,
  setProgressControls,
};
