import { RegisteredToaster, Toaster } from "../types";

function registerToaster(
  toasters: Map<string, Toaster>,
  { toasterId, store, setStore, counter }: Toaster,
): RegisteredToaster {
  if (toasterId === "__default")
    throw new Error(
      'Toaster with toasterId "__default" is reserved and cannot be used.',
    );

  if (!toasterId) {
    if (toasters.size === 0) toasterId = "__default";
    else throw new Error("ToasterId is required when using multiple toasters.");
  }

  if (toasters.has(toasterId))
    throw new Error(`Toaster with toasterId "${toasterId}" already exists.`);

  if (toasters.size > 0 && toasters.has("__default"))
    throw new Error(
      "When using multiple toasters, all toasters must be provided with a unique toasterId.",
    );

  toasters.set(toasterId, { toasterId, store, setStore, counter });

  return { toasterId, store, setStore, counter };
}

function getToaster(
  toasters: Map<string, Toaster>,
  toasterId?: string,
): Toaster {
  if (toasters.size === 0)
    throw new Error(
      "No toasters are currently registered. Please make sure that a toaster component has been rendered within the <ToastProvider> and registered properly.",
    );

  if (!toasterId) {
    if (toasters.size === 1) return Array.from(toasters.values())[0];

    throw new Error(
      "When using multiple toasters, a toasterId must be included either in the useToast invocation or in the toast options if calling toast functions.",
    );
  }

  const toaster = toasters.get(toasterId);
  if (!toaster)
    throw new Error(`Toaster with toasterId "${toasterId}" does not exist.`);

  return toaster;
}

function unregisterToaster(toasters: Map<string, Toaster>, toasterId: string) {
  if (!toasters.has(toasterId)) {
    throw new Error(`Toaster with toasterId "${toasterId}" does not exist.`);
  }

  toasters.delete(toasterId);
}

export const toasterService = {
  registerToaster,
  getToaster,
  unregisterToaster,
};
