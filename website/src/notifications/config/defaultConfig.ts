import { Config } from "../types";

export const defaultConfig: Config = {
  theme: "light",
  type: "default",
  duration: 5000,
  onEnter: undefined,
  enterDuration: 300,
  onExit: undefined,
  exitDuration: 300,
  onIdle: undefined,
  positionY: "top",
  positionX: "right",
  offsetX: 12,
  offsetY: 12,
  gutter: 12,
  limit: 8,
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
  showDismissButton: true,
  dismissButtonStyle: undefined,
  dismissButtonClass: "sn-dismiss-button",
  dismissOnClick: false,
  toasterStyle: null,
  showProgressBar: true,
  progressBarStyle: undefined,
  progressBarClass: "sn-progress-bar",
  showIcon: true,
  icon: null,
  dragToDismiss: true,
  dragTreshold: 100,
  ariaLive: "polite",
  role: "status",
};
