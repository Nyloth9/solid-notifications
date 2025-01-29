import { Accessor, JSX } from "solid-js";
import Toast from "./core/Toast";
import { SetStoreFunction } from "solid-js/store";

export interface ToasterStore {
  rendered: Toast[];
  queued: Toast[];
  toasterConfig: Config;
  isWindowBlurred: boolean;
}

export interface Toaster {
  toasterId?: string;
  store: ToasterStore;
  setStore: SetStoreFunction<ToasterStore>;
  counter: number;
}

export type RegisteredToaster = Omit<Toaster, "toasterId"> & {
  toasterId: string;
};

export type ToastType =
  | "default"
  | "success"
  | "error"
  | "loading"
  | "warning"
  | "info";

export interface ToastProviderOptions
  extends Omit<ToasterOptions, "toasterId"> {
  children: JSX.Element;
}

export type ToasterOptions = Partial<
  Omit<Config, "content" | "contentType" | "id">
>;

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

export type ToastOptionsUpdate = RequireAtLeastOne<
  ToastOptions & {
    content?: ToastContent;
  }
>;

export type ToastContent =
  | string
  | JSX.Element
  | ((toast: Toast) => JSX.Element | string);

export interface ToastPromiseMessages {
  pending: string | JSX.Element;
  success: string | JSX.Element | ((data: any) => string | JSX.Element);
  error: string | JSX.Element | ((error: any) => string | JSX.Element);
}

export interface ToasterContextType {
  toasters: Map<string, Toaster>;
  providerProps: Config;
  registerToaster: (args: Toaster) => RegisteredToaster;
  getToaster: (id?: string) => Toaster;
  unregisterToaster: (id: string) => void;
}

export interface ToastActions {
  notify: (
    content?: ToastContent,
    options?: ToastOptions,
  ) => {
    id: string;
    ref: HTMLElement | null;
    progressControls: ProgressControls;
  };
  update: (options: ToastOptionsUpdate) =>
    | {
        id: string | undefined;
        ref: HTMLElement | null;
        progressControls: ProgressControls;
      }
    | undefined;
  dismiss: (options?: {
    id?: string;
    toasterId?: string;
    reason?: string;
    keepQueued?: boolean;
  }) => void;
  remove: (options?: {
    id?: string;
    toasterId?: string;
    keepQueued?: boolean;
  }) => void;
  promise: <T>(
    promise: Promise<T>,
    messages: ToastPromiseMessages,
    options?: ToastOptions,
  ) => Promise<T>;
  getQueue: (toasterId?: string) => Toast[];
  clearQueue: (toasterId?: string) => void;
}

export interface ToastConstructor {
  store: ToasterStore;
  setStore: SetStoreFunction<ToasterStore>;
  toastConfig?: Partial<Config>;
}

export interface ProgressControls {
  play: () => void;
  pause: () => void;
  reset: () => void;
  progress: Accessor<number>;
}

export interface ToastContext {
  theme: string | undefined | null;
  type: ToastType;
}

export interface Config {
  id?: string;
  toasterId?: string;
  content?: ToastContent;
  contentType?: "static" | "dynamic";
  theme: string | undefined | null;
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
  class: string | ((args: ToastContext) => string);
  style:
    | JSX.CSSProperties
    | ((args: ToastContext) => JSX.CSSProperties)
    | undefined;
  wrapperClass: string | ((args: ToastContext) => string);
  wrapperStyle:
    | JSX.CSSProperties
    | ((args: ToastContext) => JSX.CSSProperties)
    | undefined;
  enterCallback: (() => void) | null;
  updateCallback: (() => void) | null;
  exitCallback: ((reason?: boolean | string) => void) | null;
  showDismissButton: boolean;
  dismissButtonClass: string | ((args: ToastContext) => string);
  dismissButtonStyle:
    | JSX.CSSProperties
    | ((args: ToastContext) => JSX.CSSProperties)
    | undefined;
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
  showProgressBar: boolean;
  progressBarClass: string | ((args: ToastContext) => string);
  progressBarStyle:
    | JSX.CSSProperties
    | ((args: ToastContext) => JSX.CSSProperties)
    | undefined;
  showIcon: boolean;
  icon: ((args: ToastContext) => JSX.Element) | JSX.Element | null;
  dragToDismiss: boolean;
  dragTreshold: number;
  ariaLive: "off" | "assertive" | "polite";
  role: "status" | "alert";
}

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];
