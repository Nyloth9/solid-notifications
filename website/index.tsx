/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import "../src/index.css";
import App from "./App";
import { ToastProvider } from "../src/core/Context";
import Toaster from "../src/core/Toaster";
import { createSignal } from "solid-js";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

render(() => {
  const [offsetX, setOffsetX] = createSignal(64);
  const [class1, setClass1] = createSignal("sn-toast-wrapper");
  const [bg, setBg] = createSignal("red");

  setTimeout(() => {
    setOffsetX((prev) => prev + 300);
    setClass1("1asdasdsad");
    setBg("blue");
  }, 3000);

  return (
    <ToastProvider>
      <Toaster
        toasterId="toaster-1"
        positionY="bottom"
        offsetX={offsetX()}
        wrapperClass={class1()}
        wrapperStyle={{ "background-color": bg() }}
      />
      {/* <Toaster toasterId="toaster-2" positionY="bottom" reverseToastOrder /> */}
      <App />
    </ToastProvider>
  );
}, root!);
