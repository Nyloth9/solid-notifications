import { createSignal, JSX } from "solid-js";
import { Config, ProgressControls, TStore } from "../types";
import Toast from "../core/Toast";

function findToast(id: string | undefined, store: TStore): Toast | undefined {
  if (!id) return;

  const allToasts = [...store.rendered, ...store.queued];
  return allToasts.find((toast) => toast.toastConfig.id === id);
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

function resolveBody(
  body: string | JSX.Element | ((toast: Toast) => JSX.Element),
  t: Toast,
): JSX.Element | string {
  if (typeof body === "function") {
    // If the body is a function, pass the toast instance to it
    return body(t);
  }
  return body || `🍞 Toast "${t.toastConfig.id}" ready to serve!`;
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
  store: TStore,
  { offsetY, gutter, reverseToastOrder }: Config,
) {
  if (!reverseToastOrder) return offsetY;

  const precedingToast = store.rendered[0];
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

    if (newProgress >= 100) return callback();

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

export {
  findToast,
  createToastId,
  resolveBody,
  getToasterStyle,
  setStartingOffset,
  customMerge,
  filterOptions,
  applyState,
  createProgressManager,
  setProgressControls,
};
