import { Config, ToastActions, ToasterContextType } from "../types";
import {
  createToastId,
  filterOptions,
  setTimerControls,
} from "../utils/helpers";
import Toast from "./Toast";

function toastActions(context: ToasterContextType, targetToaster?: string) {
  /** Because we allow useToast to be called with a toasterId, we need to handle the following cases:
   * 1. toasterId is not provided in the useToast hook, and the options object (where applicable) is also not provided in a method, we want to keep the options object as undefined.
   * 2. toasterId is not provided in the useToast hook, but the options object is provided in a method, we want to keep the options object as it is.
   * 3. toasterId is provided in the useToast hook, but the options object is not provided in a method, we want to create an options object with the toasterId.
   * 4. toasterId is provided in the useToast hook, and the options object is also provided in a method, we want to merge the options object with the toasterId.
   */

  const notify: ToastActions["notify"] = (body, options) => {
    /**
     * Notify can be called in the following ways:
     * 1. notify() - default toast to showcase it works
     * 2. notify("Example text") - when there is only one toaster or useToast has specified a toasterId
     * 3. notify("Example text", { id: "toastId", ... }) - Notify with a specific ID (when there is only one toaster or useToast has specified a toasterId)
     * 4. notify("Example text", { toasterId: "toasterId", ... }) - Notify in a specific toaster
     * 5. notify("Example text", { toasterId: "toasterId", id: "toastId", ... }) - Notify with a specific ID in a specific toaster
     */

    if (targetToaster) options = { toasterId: targetToaster, ...options };

    const toaster = context.getToaster(options?.toasterId);
    const { id: toasterId, toasts, setToasts, toasterConfig } = toaster;

    const toastId = createToastId(
      (toaster.counter += 1),
      toasterId,
      options?.id,
    );

    // Warn if multiple toasts with the same ID are detected
    if (toasts().some((toast) => toast.toastConfig.id === toastId)) {
      console.warn(
        `Multiple toasts with the ID "${toastId}" detected. This may cause unexpected behavior, such as issues with the dismiss timer.`,
      );
    }

    const filteredOptions = filterOptions(
      options as Partial<Config> | undefined,
    );

    const newToast = new Toast({
      toasts,
      setToasts,
      toasterConfig,
      toastConfig: {
        ...filteredOptions,
        body: body || `🍞 Moon Toast "${toastId}", ready to serve! 🌟`,
        id: toastId,
      },
    });

    newToast.init();

    return {
      id: toastId,
      ref: newToast.ref,
      timer: setTimerControls(newToast),
    };
  };

  const update: ToastActions["update"] = (options) => {
    /**
     * Update can be called in the following ways:
     * 1. update({ id: "toastId", ...newOptions }) - Update a specific toast (when there is only one toaster or useToast has specified a toasterId)
     * 2. update({ toasterId: "toasterId", ...newOptions }) - Update all toasts in a specific toaster
     * 3. update({ toasterId: "toasterId", id: "toastId", ...newOptions }) - Update a specific toast in a specific toaster
     * 4. update({ ...newOptions }) - Update all toasts in all toasters
     */

    if (targetToaster) options = { toasterId: targetToaster, ...options };

    const { id, toasterId, ...rest } = options;

    // If no id and toasterId provided, update all toasts
    if (!id && !toasterId) {
      context.toasters.forEach((toaster) =>
        toaster.toasts().forEach((toast) => toast.update(rest)),
      );

      return;
    }

    // If only the toasterId is provided, update all toasts in the specified toaster
    const toaster = context.getToaster(toasterId);
    const { toasts } = toaster;

    if (toasterId && !id) {
      toasts().forEach((toast) => toast.update(rest));

      return;
    }

    // Finally, update the specified toast
    const toast = toasts().find((toast) => toast.toastConfig.id === id);

    if (!toast)
      throw new Error(
        `Failed to update toast: No toast found with the provided ID (${id}).`,
      );

    const filteredOptions = filterOptions(rest as Partial<Config> | undefined);

    toast.update(filteredOptions);

    return {
      id: id,
      ref: toast.ref,
      timer: setTimerControls(toast),
    };
  };

  const dismiss: ToastActions["dismiss"] = (options) => {
    /**
     * Dismiss can be called in the following ways:
     * 1. dismiss({ id: "toastId" }) - Dismiss a specific toast (when there is only one toaster or useToast has specified a toasterId)
     * 2. dismiss({ toasterId: "toasterId" }) - Dismiss all toasts in a specific toaster
     * 3. dismiss({ toasterId: "toasterId", id: "toastId" }) - Dismiss a specific toast in a specific toaster
     * 4. dismiss() - Dismiss all toasts in all toasters
     */

    if (targetToaster) options = { toasterId: targetToaster, ...options }; // If there is no toasterId, and no options, we don't want to create an options object with undefined values

    // If no argument, dismiss toasts from all toasters
    if (!options) {
      context.toasters.forEach((toaster) =>
        toaster.toasts().forEach((toast) => toast.dismiss()),
      );

      return;
    }

    // Warn if the reason is "__expired"
    if (options?.reason === "__expired") {
      console.warn(
        'Dismiss reason "__expired" is reserved and is not recommended to use. This may cause unexpected behavior.',
      );
    }

    const toaster = context.getToaster(options?.toasterId);

    // If only the toasterId is provided, dismiss all toasts in the specified toaster
    if (options?.toasterId && !options?.id) {
      toaster.toasts().forEach((toast) => toast.dismiss(options?.reason));

      return;
    }

    // Finally, dismiss the specified toast
    const { toasts } = toaster;
    const toast = toasts().find(
      (toast) => toast.toastConfig.id === options?.id,
    );

    if (!toast)
      throw new Error(
        `Failed to dismiss toast: No toast found with the provided ID (${options?.id}).`,
      );

    toast.dismiss(options?.reason);
  };

  const remove: ToastActions["remove"] = (options) => {
    /**
     * Remove can be called in the following ways:
     * 1. remove({ id: "toastId" }) - Remove a specific toast (when there is only one toaster or useToast has specified a toasterId)
     * 2. remove({ toasterId: "toasterId" }) - Remove all toasts in a specific toaster
     * 3. remove({ toasterId: "toasterId", id: "toastId" }) - Remove a specific toast in a specific toaster
     * 4. remove() - Remove all toasts in all toasters
     */

    if (targetToaster) options = { toasterId: targetToaster, ...options };

    // If no argument, remove toasts from all toasters
    if (!options) {
      context.toasters.forEach((toaster) =>
        toaster.toasts().forEach((toast) => toast.remove()),
      );

      return;
    }

    // If only the toasterId is provided, remove all toasts in the specified toaster
    const toaster = context.getToaster(options?.toasterId);

    if (options.toasterId && !options.id) {
      toaster.toasts().forEach((toast) => toast.remove());

      return;
    }

    // Finally, remove the specified toast
    const { toasts } = toaster;
    const toast = toasts().find(
      (toast) => toast.toastConfig.id === options?.id,
    );

    if (!toast)
      throw new Error(
        `Failed to dismiss toast: No toast found with the provided ID (${options?.id}).`,
      );

    toast.remove();
  };

  const getQueue: ToastActions["getQueue"] = (toasterId = targetToaster) => {
    /**
     * getQueue can only be called for a specific toaster in the following ways:
     * 1. getQueue("toasterId") - Get the queue of a specific toaster
     * 2. getQueue() - Get the queue of a single toast (when there is only one toaster or useToast has specified a toasterId)
     */

    const { toasts, toasterConfig } = context.getToaster(toasterId);
    const { limit } = toasterConfig;

    return toasts().slice(0, Math.max(0, toasts().length - limit));
  };

  const clearQueue: ToastActions["clearQueue"] = (
    toasterId = targetToaster,
  ) => {
    /**
     * clearQueue can be called for a specific toaster or all toasters in the following ways:
     * 1. clearQueue("toasterId") - Clear the queue of a specific toaster
     * 2. clearQueue() - Clear the queue of all toasters
     */

    // If no argument, clear all toasters' queues
    if (!toasterId) {
      context.toasters.forEach((toaster) => {
        const queue = getQueue(toaster.id);
        queue.forEach((toast) => toast.remove());

        return;
      });
    }

    // If toasterId is provided, clear the specified toaster queue
    const queue = getQueue(toasterId);

    queue.forEach((toast) => toast.remove());
  };

  return {
    notify,
    update,
    dismiss,
    remove,
    getQueue,
    clearQueue,
  };
}

export default toastActions;
