import { Accessor, JSX } from "solid-js";
import Toast from "./core/Toast";
import { SetStoreFunction } from "solid-js/store";

export interface ToasterStore {
  rendered: Toast[];
  queued: Toast[];
  isWindowBlurred: boolean;
}

export interface Toaster {
  id?: string;
  store: ToasterStore;
  setStore: SetStoreFunction<ToasterStore>;
  toasterConfig: Config;
  counter: number;
}

export type RegisteredToaster = Omit<Toaster, "id"> & { id: string };

type ToastType =
  | "default"
  | "success"
  | "error"
  | "loading"
  | "warning"
  | "info";

export type ToasterOptions = Partial<Omit<Config, "content" | "contentType">>;

export interface ToastOptions
  extends Partial<
    Omit<
      Config,
      | "content"
      | "state"
      | "positionX"
      | "positionY"
      | "offsetX"
      | "offsetY"
      | "gutter"
      | "limit"
      | "toasterStyle"
      | "reverseToastOrder"
      | "pauseOnWindowInactive"
      | "renderOnWindowInactive"
      | "contentType"
    >
  > {
  toasterId?: string;
}

export type UpdateToastOptions = RequireAtLeastOne<
  ToastOptions & {
    content?: string | JSX.Element | ((toast?: Toast) => JSX.Element | string);
  }
>;

export interface ToasterContextType {
  toasters: Map<string, Toaster>;
  registerToaster: (args: Toaster) => RegisteredToaster;
  getToaster: (id?: string) => Toaster;
  unregisterToaster: (id: string) => void;
}

export interface ToastActions {
  notify: (
    content?: string | JSX.Element | ((toast: Toast) => JSX.Element | string),
    options?: ToastOptions,
  ) => {
    id: string;
    ref: HTMLElement | null;
    progressControls: ProgressControls;
  };
  update: (options: UpdateToastOptions) =>
    | {
        id: string | undefined;
        ref: HTMLElement | null;
        progressControls: ProgressControls;
      }
    | undefined;
  dismiss: (options?: {
    id?: string;
    toasterId?: string;
    reason?: string | boolean;
    keepQueued?: boolean;
  }) => void;
  remove: (options?: {
    id?: string;
    toasterId?: string;
    keepQueued?: boolean;
  }) => void;
  getQueue: (toasterId?: string) => Toast[];
  clearQueue: (toasterId?: string) => void;
}

export interface ToastConstructor {
  store: ToasterStore;
  setStore: SetStoreFunction<ToasterStore>;
  toastConfig?: Partial<Config>;
  toasterConfig: Config;
}

export interface ProgressControls {
  play: () => void;
  pause: () => void;
  reset: () => void;
  progress: Accessor<number>;
}

export interface Config {
  id?: string;
  content?: JSX.Element | string;
  contentType?: "static" | "dynamic";
  type: ToastType;
  duration: number | false;
  onEnter: string | undefined;
  enterDuration: number;
  onExit: string | undefined;
  exitDuration: number;
  onIdle: string | undefined;
  positionY: "top" | "bottom";
  positionX: "left" | "right" | "center";
  offsetX: number;
  offsetY: number;
  gutter: number;
  limit: number | false;
  reverseToastOrder: boolean;
  pauseOnHover: boolean;
  pauseOnWindowInactive: boolean;
  renderOnWindowInactive: boolean;
  class: string;
  style: JSX.CSSProperties | undefined;
  wrapperClass: string;
  wrapperStyle: JSX.CSSProperties | undefined;
  enterCallback: (() => void) | null;
  updateCallback: (() => void) | null;
  exitCallback: ((reason?: boolean | string) => void) | null;
  dismissButton: {
    showDefault?: boolean;
    style?: JSX.CSSProperties;
    class?: string;
  };
  dismissOnClick: boolean;
  toasterStyle: Omit<
    JSX.CSSProperties,
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "justify-content"
    | "align-items"
    | "pointer-events"
  > | null;
  progressBar: {
    showDefault?: boolean;
    style?: JSX.CSSProperties;
    class?: string;
  };
  showIcon: boolean;
  icon: ((type: ToastType) => JSX.Element) | JSX.Element | null;
  dragToDismiss: boolean;
  dragTreshold: number;
  aria: {
    ariaLive: "off" | "assertive" | "polite";
    role: "status" | "alert";
  };
}

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];
