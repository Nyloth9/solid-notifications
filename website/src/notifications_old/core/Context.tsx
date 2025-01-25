import { createContext, mergeProps, splitProps, useContext } from "solid-js";
import { Toaster, ToasterContextType, ToastProviderOptions } from "../types";
import { toasterService } from "./services";
import toastActions from "./actions";
import { defaultConfig } from "../config/defaultConfig";

const ToasterContext = createContext<ToasterContextType>();

export default function ToastProvider(props: ToastProviderOptions) {
  const toasters = new Map<string, Toaster>();
  const providerProps = mergeProps(
    defaultConfig,
    splitProps(props, ["children"])[1],
  );

  function registerToaster(toaster: Toaster) {
    return toasterService.registerToaster(toasters, toaster);
  }

  function getToaster(toasterId?: string) {
    return toasterService.getToaster(toasters, toasterId);
  }

  function unregisterToaster(toasterId: string) {
    return toasterService.unregisterToaster(toasters, toasterId);
  }

  return (
    <ToasterContext.Provider
      value={{
        providerProps,
        toasters,
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
