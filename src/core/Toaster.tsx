import { createEffect, createSignal, For, onCleanup, onMount } from "solid-js";
import Toast from "./Toast";
import { useService } from "./Context";
import {
  customMerge,
  getToasterStyle,
  handleVisibilityChange,
} from "../utils/helpers";
import { Config } from "../types";
import { defaultConfig } from "../config/defaultConfig";

export default function Toaster(props: Partial<Config>) {
  const [toasts, setToasts] = createSignal<Toast[]>([]);
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
    /*** Here we implement the reversing of the toast order and the queue mechanic (by not showing the toasts that exceed the toast limit) ***/
    const resolvedToasts = toasterConfig.reverseToastOrder
      ? toasts().slice(-toasterConfig.limit).reverse()
      : toasts().slice(-toasterConfig.limit);

    let accumulatedOffset = toasterConfig.offsetY; // <-- We want to render the first toast at the same height as positionY offset

    /*** Here we reorder toasts when there are changes like toast created or toast updated ***/
    resolvedToasts.forEach((toast) => {
      if (toast.ref) {
        const _body = toast.toastConfig.body; // This ensures toast is being tracked for reactivity
        toast.offset = accumulatedOffset;

        accumulatedOffset += toast.ref.clientHeight + toasterConfig.gutter;
      }
    });
  });

  onMount(() => {
    /*** Here we handle stopping the timer when the tab is not active ***/

    if (typeof document === "undefined") return;
    if (!toasterConfig.pauseOnTabSwitch) return;

    document.addEventListener("visibilitychange", () =>
      handleVisibilityChange(toasts),
    );

    onCleanup(() => {
      document.removeEventListener("visibilitychange", () =>
        handleVisibilityChange(toasts),
      );
      unregisterToaster(toasterId);
    });
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
      <For each={toasts().slice(-toasterConfig.limit)}>
        {(toast) => toast.render()}
      </For>
    </div>
  );
}
