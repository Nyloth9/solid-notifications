import { Config } from "../types";

export const defaultConfig: Config = {
  type: "default",
  duration: 5000,
  onEnter: undefined,
  enterDuration: 300,
  onExit: undefined,
  exitDuration: 300,
  onIdle: undefined,
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
  class: "sn-toast",
  style: undefined,
  wrapperClass: "sn-toast-wrapper",
  wrapperStyle: undefined,
  enterCallback: null,
  updateCallback: null,
  exitCallback: null,
  dismissButton: {
    showDefault: true,
    style: undefined,
    class: "sn-dismiss-button",
  },
  dismissOnClick: false,
  toasterStyle: null,
  progressBar: {
    showDefault: true,
    class: "sn-progress-bar",
  },
  showIcon: true,
  icon: null,
  dragToDismiss: true,
  dragTreshold: 100,
  aria: {
    role: "alert",
    ariaLive: "polite",
  },
};
