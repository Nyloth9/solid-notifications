import { Accessor } from "solid-js";
import { Config, TimerControls } from "../types";
import Toast from "../core/Toast";

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
  toasts: Accessor<Toast[]>,
  { offsetY, gutter, reverseToastOrder }: Config,
) {
  if (!reverseToastOrder) return offsetY;

  const precedingToast = toasts()[0];
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
    "pauseOnTabSwitch",
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

export function handleVisibilityChange(toasts: Accessor<Toast[]>) {
  if (document.hidden)
    toasts().forEach((toast) => !toast.timer.static && toast.timer.pause());
  else toasts().forEach((toast) => !toast.timer.static && toast.timer.play());
}

function setTimerControls(toast: Toast): TimerControls {
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
      toast.timer.pause();
      toast.timer.static = true;
    },
    play: () => {
      toast.timer.play();
      toast.timer.static = false;
    },
    reset: () => {
      toast.timer.reset();
      toast.timer.static = true;
    },
  };
}

class Timer {
  /*** We never start (play) the timer in the class itself, this should always be done externally, depending on toast events ***/
  private id: number | undefined;
  initialDuration;
  remaining;
  private start: number | undefined;
  private callback: () => void;
  animations: Animation[] = []; // We save the animations in the timer so it's easier to pause, play and reset them when the timer controls are used
  static = false;

  constructor(callback: () => void, initialDuration: number | false) {
    this.initialDuration = initialDuration;
    this.remaining = initialDuration;
    this.start = Date.now();
    this.callback = callback;
  }

  play() {
    if (!this.remaining) return;
    this.animations.forEach((animation) => animation.play());

    this.start = Date.now();
    this.id = window.setTimeout(this.callback, this.remaining);
  }

  pause() {
    if (!this.id) return; // Fixes a scenario when mouseEnter stops the timer, and then the user click pause() on the timer controls inside the toast. The bug is that the timer will be paused twice (and thus reducing the remaining time twice)
    if (!this.remaining) return;

    this.animations.forEach((animation) => animation.pause());
    window.clearTimeout(this.id);
    this.id = undefined;
    this.remaining -= Date.now() - this.start!;
  }

  reset() {
    this.pause();
    this.remaining = this.initialDuration;
    this.animations.forEach((animation) => animation.cancel());
  }

  update(newDuration: number | false) {
    this.pause();
    this.initialDuration = newDuration;
    this.remaining = newDuration;
    this.animations = [];
  }
}

export {
  getToasterStyle,
  setStartingOffset,
  customMerge,
  filterOptions,
  applyState,
  setTimerControls,
  Timer,
};
