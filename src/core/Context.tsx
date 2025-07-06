import {
  createContext,
  mergeProps,
  onCleanup,
  onMount,
  splitProps,
  useContext,
} from "solid-js";
import {
  ToastContent,
  Toaster,
  ToasterContextType,
  ToastOptions,
  ToastProviderOptions,
} from "../types";
import { toasterService } from "./services";
import toastActions from "./actions";
import { defaultConfig } from "../config/defaultConfig";
import { handleKeyboardFocus } from "../utils/helpers";

const ToasterContext = createContext<ToasterContextType>();
let toasters: Map<string, Toaster> | null = null;

export default function ToastProvider(props: ToastProviderOptions) {
  const initializedToasters = getToasters();

  const providerProps = mergeProps(
    defaultConfig,
    splitProps(props, ["children"])[1],
  );

  function registerToaster(toaster: Toaster) {
    return toasterService.registerToaster(initializedToasters, toaster);
  }

  function getToaster(toasterId?: string) {
    return toasterService.getToaster(initializedToasters, toasterId);
  }

  function unregisterToaster(toasterId: string) {
    return toasterService.unregisterToaster(initializedToasters, toasterId);
  }

  onMount(() => {
    if (typeof window === "undefined") return;
    document.addEventListener("keydown", handleKeyboardFocus);
  });

  onCleanup(() => {
    if (typeof window === "undefined") return;
    document.removeEventListener("keydown", handleKeyboardFocus);
  });

  return (
    <ToasterContext.Provider
      value={{
        providerProps,
        toasters: initializedToasters,
        registerToaster,
        getToaster,
        unregisterToaster,
      }}
    >
      {props.children}
    </ToasterContext.Provider>
  );
}

export function useService() {
  const context = useContext(ToasterContext);

  if (!context) {
    throw new Error(
      "ServiceContext is not provided. Please wrap your component with <ToastProvider></ToastProvider>.",
    );
  }

  return {
    providerProps: context.providerProps,
    registerToaster: context.registerToaster,
    unregisterToaster: context.unregisterToaster,
    getToaster: context.getToaster,
  };
}

export function useToast(targetToaster?: string) {
  // We can target a specific toaster by passing the toasterId
  const context = useContext(ToasterContext);

  if (!context) {
    throw new Error(
      "ToastContext is not provided. Please wrap your component with <ToastProvider></ToastProvider>.",
    );
  }

  return toastActions(context, targetToaster);
}

export function getToasters() {
  if (typeof window === "undefined") {
    return new Map();
  }

  if (!toasters) {
    toasters = new Map();
  }

  return toasters;
}
