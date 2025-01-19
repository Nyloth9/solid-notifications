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

render(() => {
  return (
    <ToastProvider>
      <Toaster toasterId="toaster-1" />
      {/* <Toaster toasterId="toaster-2" positionY="bottom" reverseToastOrder /> */}
      <App />
    </ToastProvider>
  );
}, root!);
