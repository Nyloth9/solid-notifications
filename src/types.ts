import { Accessor, JSX } from "solid-js";
import Toast from "./core/Toast";
import { SetStoreFunction } from "solid-js/store";

export interface TStore {
  rendered: Toast[];
  queued: Toast[];
  isWindowBlurred: boolean;
}

export interface Toaster {
  id?: string;
  store: TStore;
  setStore: SetStoreFunction<TStore>;
  toasterConfig: Config;
  counter: number;
}

export type RegisteredToaster = Omit<Toaster, "id"> & { id: string };

export interface ToastOptions
  extends Partial<
    Omit<
      Config,
      | "body"
      | "state"
      | "positionX"
      | "positionY"
      | "offsetX"
      | "offsetY"
      | "gutter"
      | "limit"
      | "toasterStyle"
      | "reverseToastOrder"
    >
  > {
  toasterId?: string;
}

export type UpdateToastOptions = RequireAtLeastOne<
  ToastOptions & { body?: string | JSX.Element }
>;

export interface ToasterContextType {
  toasters: Map<string, Toaster>;
  registerToaster: (args: Toaster) => RegisteredToaster;
  getToaster: (id?: string) => Toaster;
  unregisterToaster: (id: string) => void;
}

export interface ToastActions {
  notify: (
    body?: string | JSX.Element | ((toast: Toast) => JSX.Element),
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
  }) => void;
  remove: (options?: { id?: string; toasterId?: string }) => void;
  getQueue: (toasterId?: string) => Toast[];
  clearQueue: (toasterId?: string) => void;
}

export interface ToastConstructor {
  store: TStore;
  setStore: SetStoreFunction<TStore>;
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
  body?: JSX.Element | string;
  duration: number | false;
  onEnter: string;
  enterDuration: number;
  onExit: string;
  exitDuration: number;
  onIdle: string;
  positionY: "top" | "bottom";
  positionX: "left" | "right" | "center";
  offsetX: number;
  offsetY: number;
  gutter: number;
  limit: number;
  reverseToastOrder: boolean;
  pauseOnHover: boolean;
  pauseOnWindowInactive: boolean;
  renderOnWindowInactive: boolean;
  enterCallback: (() => void) | null;
  updateCallback: (() => void) | null;
  exitCallback: ((reason?: boolean | string) => void) | null;
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
    className?: string;
  };
}

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];
