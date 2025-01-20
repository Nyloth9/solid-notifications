/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import "../src/index.css";
import App from "./App";
import { ToastProvider } from "../src/core/Context";
import Toaster from "../src/core/Toaster";
import { createSignal, onMount } from "solid-js";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

const [className, setClassName] = createSignal("bg-red-200");

onMount(() => {
  setTimeout(() => {
    setClassName("bg-green-200");
  }, 4000);
});

render(() => {
  return (
    <ToastProvider>
      <Toaster
        toasterId="toaster-1"
        wrapperClass={className()}
        reverseToastOrder
      />
      {/* <Toaster toasterId="toaster-2" positionY="bottom" reverseToastOrder /> */}
      <App />
    </ToastProvider>
  );
}, root!);
