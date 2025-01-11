import { RegisteredToaster, Toaster } from "../types";

function registerToaster(
  toasters: Map<string, Toaster>,
  { id, toasts, setToasts, toasterConfig, counter }: Toaster,
): RegisteredToaster {
  if (id === "__default")
    throw new Error('Toaster ID "__default" is reserved and cannot be used.');

  if (!id) {
    if (toasters.size === 0) id = "__default";
    else
      throw new Error("Toaster ID is required when using multiple toasters.");
  }

  if (toasters.has(id))
    throw new Error(`Toaster with ID "${id}" already exists.`);

  if (toasters.size > 0 && toasters.has("__default"))
    throw new Error(
      "When using multiple toasters, all toasters must be provided with a unique ID.",
    );

  toasters.set(id, { id, toasts, setToasts, toasterConfig, counter });

  return { id, toasts, setToasts, toasterConfig, counter };
}

function getToaster(toasters: Map<string, Toaster>, id?: string): Toaster {
  if (toasters.size === 0)
    throw new Error(
      "No toasters are currently registered. Please make sure that a toaster component has been rendered within the <ToastProvider> and registered properly.",
    );

  if (!id) {
    if (toasters.size === 1) return Array.from(toasters.values())[0];

    throw new Error(
      "When using multiple toasters, a toaster ID must be included either in the useToast invocation or in the toast options if calling toast functions.",
    );
  }

  const toaster = toasters.get(id);
  if (!toaster) throw new Error(`Toaster with ID "${id}" does not exist.`);

  return toaster;
}

function unregisterToaster(toasters: Map<string, Toaster>, id: string) {
  if (!toasters.has(id)) {
    throw new Error(`Toaster with ID "${id}" does not exist.`);
  }

  toasters.delete(id);
}

export const toasterService = {
  registerToaster,
  getToaster,
  unregisterToaster,
};
