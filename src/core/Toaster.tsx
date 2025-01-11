import { createEffect, createSignal, For, onCleanup, onMount } from "solid-js";
import Toast from "./Toast";
import { useService } from "./Context";
import { customMerge, getToasterStyle } from "../utils/helpers";
import { Config, ToastStore } from "../types";
import { defaultConfig } from "../config/defaultConfig";
import { createStore } from "solid-js/store";

export default function Toaster(props: Partial<Config>) {
  const [toasts, setToasts] = createStore<ToastStore>({
    queued: [],
    rendered: [],
  });
  const { registerToaster, unregisterToaster } = useService();
  const toasterConfig: Config = customMerge(defaultConfig, props);

  const { id: toasterId } = registerToaster({
    id: props.id,
    toasts,
    setToasts,
    toasterConfig,
    counter: 0,
  });

  createEffect(() => {
    /*** Here we implement the reversing of the toast order if that options is enabled ***/
    const resolvedToasts = toasterConfig.reverseToastOrder
      ? [...toasts.rendered].reverse()
      : toasts.rendered;

    /*** Here we reorder toasts when there are changes like toast created or toast updated ***/
    let accumulatedOffset = toasterConfig.offsetY; // <-- We want to render the first toast at the same height as positionY offset

    resolvedToasts.forEach((toast) => {
      if (toast.ref) {
        const _body = toast.toastConfig.body; // This ensures toast is being tracked for reactivity
        toast.offset = accumulatedOffset;

        accumulatedOffset += toast.ref.clientHeight + toasterConfig.gutter;
      }
    });
  });
  /* 
  const handleWindowBlur = () =>
    toasts().forEach((toast) => {
      toast.progressManager.pause();
      toast.isStatic = true; // If you hover over the toast while the window is blurred , it will start the progress again (to avoid that we set isStatic to true and check against that on mouse enter)
    });

  const handleWindowFocus = () =>
    toasts().forEach((toast) => {
      toast.progressManager.play();
      toast.isStatic = false;
    }); */

  onMount(() => {
    /*** Here we handle stopping the timer when the tab is not active ***/
    if (toasterConfig.pauseOnWindowInactive) {
      /*       window.addEventListener("blur", handleWindowBlur);
      window.addEventListener("focus", handleWindowFocus); */
    }
  });

  onCleanup(() => unregisterToaster(toasterId));

  return (
    <div
      id={
        toasterId === "__default"
          ? "moon-toast-toaster"
          : `moon-toast-toaster:${toasterId}`
      }
      style={{
        ...toasterConfig.toasterStyle,
        "justify-content": getToasterStyle(toasterConfig.positionX),
      }}
      class="pointer-events-none fixed left-0 top-0 flex h-screen w-screen overflow-hidden"
    >
      <For each={toasts.rendered}>{(toast) => toast.render()}</For>
    </div>
  );
}
