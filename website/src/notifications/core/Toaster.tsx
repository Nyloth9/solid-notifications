import {
  batch,
  createEffect,
  For,
  mergeProps,
  on,
  onCleanup,
  onMount,
} from "solid-js";
import { useService } from "./Context";
import { getToasterStyle } from "../utils/helpers";
import { ToasterOptions, ToasterStore } from "../types";
import { defaultConfig } from "../config/defaultConfig";
import { createStore } from "solid-js/store";

export default function Toaster(props: ToasterOptions) {
  const { registerToaster, unregisterToaster } = useService();
  const [store, setStore] = createStore<ToasterStore>({
    queued: [],
    rendered: [],
    toasterConfig: mergeProps(defaultConfig, props),
    isWindowBlurred:
      typeof window !== "undefined" && document.visibilityState === "hidden",
  });

  const { toasterId } = registerToaster({
    toasterId: props.toasterId,
    store,
    setStore,
    counter: 0,
  });

  createEffect(
    /** Here we track if toasterConfig has changed, and if it has, we update all toasts in the toaster, excluding the props that are unique to the toast (ownProperties) ***/
    on(
      () => ({ ...store.toasterConfig }),
      (newConfig) =>
        [...store.queued, ...store.rendered].forEach((t) => t.patch(newConfig)),
    ),
  );

  createEffect(() => {
    /*** If set to not render on windowInactive, we want to wait untill window is visible again to start rendering toasts ***/
    if (store.isWindowBlurred && !store.toasterConfig.renderOnWindowInactive)
      return;

    /*** Here we manage putting toasts from queue to render ***/
    const shouldMoveFromQueueToRendered =
      store.toasterConfig.limit &&
      store.queued.length &&
      store.rendered.length < store.toasterConfig.limit;

    if (shouldMoveFromQueueToRendered) {
      const [nextToast, ...rest] = store.queued;
      batch(() => {
        setStore("queued", rest);
        setStore("rendered", [nextToast, ...store.rendered]);
      });
    }

    /*** Here we implement the reversing of the toast order if that options is enabled ***/
    const resolvedToasts = store.toasterConfig.reverseToastOrder
      ? [...store.rendered].reverse()
      : store.rendered;

    /*** Here we reorder toasts (manage their positions) when there are changes such as toast created or toast updated ***/
    let accumulatedOffset = store.toasterConfig.offsetY; // We want to render the first toast at the same height as positionY offset

    resolvedToasts.forEach((toast) => {
      if (toast.ref) {
        const _content = toast.toastConfig.content; // Ensures content reactivity
        toast.offset = accumulatedOffset;

        accumulatedOffset +=
          toast.ref.clientHeight + store.toasterConfig.gutter;
      }
    });
  });

  const handleWindowBlur = () => {
    setStore("isWindowBlurred", true);

    if (!store.toasterConfig.pauseOnWindowInactive) return;
    store.rendered.forEach((toast) => toast.progressManager.pause()); // If you hover over the toast while the window is blurred , it will start the progress again (to avoid that we check against isWindowBlurred on mouse enter)
  };

  const handleWindowFocus = () => {
    setStore("isWindowBlurred", false);

    if (!store.toasterConfig.pauseOnWindowInactive) return;
    store.rendered.forEach((toast) => {
      if (toast.isPausedByUser) return; // If the user paused the timer, we dont want to start it again
      toast.progressManager.play();
    });
  };

  onMount(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);
  });

  onCleanup(() => {
    unregisterToaster(toasterId);

    if (typeof window === "undefined") return;
    window.removeEventListener("blur", handleWindowBlur);
    window.removeEventListener("focus", handleWindowFocus);
  });

  return (
    <div
      class="sn-toaster"
      id={toasterId === "__default" ? "sn-toaster" : toasterId}
      style={{
        ...store.toasterConfig.toasterStyle,
        "justify-content": getToasterStyle(store.toasterConfig.positionX),
      }}
    >
      <For each={store.rendered}>{(toast) => toast.render()}</For>
    </div>
  );
}
