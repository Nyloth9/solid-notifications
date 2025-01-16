import { batch } from "solid-js";
import { Config, ToastActions, ToasterContextType } from "../types";
import {
  createToastId,
  filterOptions,
  findToast,
  resolveBody,
  setProgressControls,
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

    if (targetToaster) {
      options = { toasterId: targetToaster, ...options };
    }

    const toaster = context.getToaster(options?.toasterId);
    const { id: toasterId, store, setStore, toasterConfig } = toaster;

    const toastId = createToastId(
      (toaster.counter += 1),
      toasterId,
      options?.id,
    );

    // Warn if multiple toasts with the same ID are detected
    if (
      store.rendered.some((toast) => toast.toastConfig.id === toastId) ||
      store.queued.some((toast) => toast.toastConfig.id === toastId)
    ) {
      console.warn(
        `Multiple toasts with the ID "${toastId}" detected. This may cause unexpected behavior, such as issues with the dismiss timer.`,
      );
    }

    const filteredOptions = filterOptions(
      options as Partial<Config> | undefined,
    );

    const newToast = new Toast({
      store,
      setStore,
      toasterConfig,
      toastConfig: {
        ...filteredOptions,
        type:
          typeof body === "function"
            ? "__custom"
            : (options?.type ?? "default"),
        body: undefined,
        id: toastId,
      },
    });

    newToast.toastConfig.body = resolveBody(body, newToast); // If using a function as the first argument, we want to resolve it to JSX

    newToast.init();

    return {
      id: toastId,
      ref: newToast.ref,
      progressControls: setProgressControls(newToast),
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

    if (targetToaster) {
      options = { toasterId: targetToaster, ...options };
    }

    const { id, toasterId } = options;

    const resolvedArgs = filterOptions(options as Partial<Config> | undefined);

    // If no id and toasterId provided, update all toasts
    if (!id && !toasterId) {
      context.toasters.forEach((toaster) => {
        if (options.body && typeof options.body === "function") {
          resolvedArgs.body = options.body();
          resolvedArgs.type = "__custom";
        }

        toaster.store.rendered.forEach((toast) => toast.update(resolvedArgs));
        toaster.store.queued.forEach((toast) => toast.update(resolvedArgs));
      });

      return;
    }

    // If only the toasterId is provided, update all toasts in the specified toaster
    const toaster = context.getToaster(toasterId);
    const { store } = toaster;

    if (toasterId && !id) {
      if (options.body && typeof options.body === "function") {
        resolvedArgs.body = options.body();
        resolvedArgs.type = "__custom";
      }

      toaster.store.rendered.forEach((toast) => toast.update(resolvedArgs));
      toaster.store.queued.forEach((toast) => toast.update(resolvedArgs));

      return;
    }

    // Finally, update the specified toast
    const toast = findToast(id, store);

    if (!toast) return; // Should we warn or throw here?

    if (options.body && typeof options.body === "function") {
      resolvedArgs.body = options.body(toast);
      resolvedArgs.type = "__custom";
    }

    toast.update(resolvedArgs);

    return {
      id: id,
      ref: toast.ref,
      progressControls: setProgressControls(toast),
    };
  };

  const dismiss: ToastActions["dismiss"] = (options) => {
    // Mount the toasterId that was provided in the useToast hook or in options
    // If no options are provided, we want to keep the options object as undefined
    if (targetToaster) {
      options = { toasterId: targetToaster, ...options };
    }

    // If no argument, dismiss toasts from all toasters
    if (!options) {
      context.toasters.forEach((toaster) => {
        toaster.store.rendered.forEach((toast) => toast.dismiss());
        toaster.store.queued.forEach((toast) => toast.dismiss());
      });

      return;
    }

    // If only the keepQueued key is in the options object, we dismiss all rendered toasts in all toasters
    if (!options.toasterId && !options.id && options.keepQueued) {
      context.toasters.forEach((toaster) => {
        toaster.store.rendered.forEach((toast) =>
          toast.dismiss(options.reason),
        );
      });

      return;
    }

    // We want to throw from here if no toasterId is provided in the options object
    const toaster = context.getToaster(options.toasterId);

    // If only the id is provided, dismiss the specified toast
    if (options.id) {
      const toast = findToast(options.id, toaster.store);

      if (!toast) {
        throw new Error(
          options.toasterId === "__default"
            ? `Failed to dismiss toast: No toast found with the provided ID (${options.id}).`
            : `Failed to dismiss toast: No toast found with the provided ID (${options.id}) in the toaster with the ID "${options.toasterId}".`,
        );
      }

      toast.dismiss(options.reason);

      return;
    }

    // Finally, if toasterId, dismiss toasts in specified toaster with/without keeping queued toasts
    toaster.store.rendered.forEach((toast) => toast.dismiss(options.reason));
    !options.keepQueued &&
      toaster.store.queued.forEach((toast) => toast.dismiss(options.reason));

    return;
  };

  const remove: ToastActions["remove"] = (options) => {
    if (targetToaster) {
      options = { toasterId: targetToaster, ...options };
    }

    // If no argument, remove toasts from all toasters
    if (!options) {
      context.toasters.forEach((toaster) => {
        batch(() => {
          toaster.setStore("rendered", []);
          toaster.setStore("queued", []);
        });
      });

      return;
    }

    // If only the keepQueued key is in the options object, we remove all rendered toasts in all toasters
    if (!options.toasterId && !options.id && options.keepQueued) {
      context.toasters.forEach((toaster) => {
        toaster.store.rendered.forEach((toast) => toast.remove());
      });

      return;
    }

    // We want to throw from here if no toasterId is provided in the options object
    const toaster = context.getToaster(options.toasterId);

    // If only the id is provided, remove the specified toast
    if (options.id) {
      const toast = findToast(options.id, toaster.store);

      if (!toast) {
        throw new Error(
          options.toasterId === "__default"
            ? `Failed to remove toast: No toast found with the provided ID (${options.id}).`
            : `Failed to remove toast: No toast found with the provided ID (${options.id}) in the toaster with the ID "${options.toasterId}".`,
        );
      }

      toast.remove();

      return;
    }

    // Finally, if toasterId, remove toasts in specified toaster with/without keeping queued toasts
    toaster.store.rendered.forEach((toast) => toast.remove());
    !options.keepQueued &&
      toaster.store.queued.forEach((toast) => toast.remove());

    return;
  };

  const getQueue: ToastActions["getQueue"] = (toasterId = targetToaster) => {
    /**
     * getQueue can only be called for a specific toaster in the following ways:
     * 1. getQueue("toasterId") - Get the queue of a specific toaster
     * 2. getQueue() - Get the queue of a single toast (when there is only one toaster or useToast has specified a toasterId)
     */

    const { store } = context.getToaster(toasterId);
    return store.queued;
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
        toaster.setStore("queued", []);

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
