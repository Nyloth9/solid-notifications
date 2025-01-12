import { Config } from "../types";

export const defaultConfig: Config = {
  type: "default",
  duration: 5000,
  onEnter: "moon-toast--slide-in-right", //solidnotif__slide-in-right
  enterDuration: 300,
  onExit: "moon-toast--slide-out-right",
  exitDuration: 150,
  onIdle: "",
  positionY: "top",
  positionX: "right",
  offsetX: 16,
  offsetY: 16,
  gutter: 16,
  limit: 3,
  reverseToastOrder: false,
  pauseOnHover: true,
  pauseOnWindowInactive: true, // Will not run timer when window is inactive
  renderOnWindowInactive: false, // Will not render toasts when window is inactive and will put them in the queue
  enterCallback: null,
  updateCallback: null,
  exitCallback: null,
  toasterStyle: null,
  progressBar: {
    showDefault: true,
    className: "moon-toast-progress-bar",
  },
};
