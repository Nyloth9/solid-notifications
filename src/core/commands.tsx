import { defaultConfig } from "../config/defaultConfig";
import { ToastActions, Toaster } from "../types";
import toastActions from "./actions";
import { toasterService } from "./services";
import { getToasters } from "./Context";

export const showToast: ToastActions["notify"] = (content, options) => {
  const toasters = getToasters();

  const actions = toastActions({
    providerProps: defaultConfig,
    toasters,
    registerToaster: (toaster: Toaster) => {
      return toasterService.registerToaster(toasters, toaster);
    },
    getToaster: (id?: string): Toaster => {
      return toasterService.getToaster(toasters, id);
    },
    unregisterToaster: () => {},
  });

  return actions.notify(content, options);
};
