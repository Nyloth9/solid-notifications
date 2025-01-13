import { batch, createEffect, For, onCleanup, onMount } from "solid-js";
import { useService } from "./Context";
import { customMerge, getToasterStyle } from "../utils/helpers";
import { Config, TStore } from "../types";
import { defaultConfig } from "../config/defaultConfig";
import { createStore } from "solid-js/store";

export default function Toaster(props: Partial<Config>) {
  const toasterConfig: Config = customMerge(defaultConfig, props);
  const { registerToaster, unregisterToaster } = useService();
  const [store, setStore] = createStore<TStore>({
    queued: [],
    rendered: [],
    isWindowBlurred:
      typeof document !== "undefined" && document.visibilityState === "hidden",
  });

  const { id: toasterId } = registerToaster({
    id: props.id,
    store,
    setStore,
    toasterConfig,
    counter: 0,
  });

  createEffect(() => {
    if (store.isWindowBlurred && !toasterConfig.renderOnWindowInactive) return;

    /** Here we manage putting toasts from queue to render */
    const shouldMoveFromQueueToRendered =
      toasterConfig.limit &&
      store.queued.length &&
      store.rendered.length < toasterConfig.limit;

    if (shouldMoveFromQueueToRendered) {
      const [nextToast, ...rest] = store.queued;
      batch(() => {
        setStore("queued", rest);
        setStore("rendered", [nextToast, ...store.rendered]);
      });
    }

    /*** Here we implement the reversing of the toast order if that options is enabled ***/
    const resolvedToasts = toasterConfig.reverseToastOrder
      ? [...store.rendered].reverse()
      : store.rendered;

    /*** Here we reorder toasts when there are changes like toast created or toast updated ***/
    let accumulatedOffset = toasterConfig.offsetY; // We want to render the first toast at the same height as positionY offset

    resolvedToasts.forEach((toast) => {
      if (toast.ref) {
        const _body = toast.toastConfig.body; // This ensures toast is being tracked for reactivity
        toast.offset = accumulatedOffset;

        accumulatedOffset += toast.ref.clientHeight + toasterConfig.gutter;
      }
    });
  });

  const handleWindowBlur = () => {
    setStore("isWindowBlurred", true);

    if (!toasterConfig.pauseOnWindowInactive) return;
    store.rendered.forEach((toast) => toast.progressManager.pause()); // If you hover over the toast while the window is blurred , it will start the progress again (to avoid that we check against isWindowBlurred on mouse enter)
  };

  const handleWindowFocus = () => {
    setStore("isWindowBlurred", false);

    if (!toasterConfig.pauseOnWindowInactive) return;
    store.rendered.forEach((toast) => {
      if (toast.isPausedByUser) return; // If the user paused the timer, we dont want to start it again
      toast.progressManager.play();
    });
  };

  onMount(() => {
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);
  });

  onCleanup(() => {
    window.removeEventListener("blur", handleWindowBlur);
    window.removeEventListener("focus", handleWindowFocus);
    unregisterToaster(toasterId);
  });

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
      <For each={store.rendered}>{(toast) => toast.render()}</For>
    </div>
  );
}
