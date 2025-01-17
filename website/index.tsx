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
  const [show, setShow] = createSignal(true);
  const [x, setX] = createSignal(false);
  const [y, setY] = createSignal(false);

  setTimeout(() => {
    setOffsetX((prev) => prev + 300);
    setShow(false);
    setX(true);
    setY(true);
  }, 3000);

  return (
    <ToastProvider>
      <Toaster
        id="toaster-1"
        offsetX={offsetX()}
        progressBar={{ showDefault: show() }}
        dismissButton={{ showDefault: show() }}
        dismissOnClick={x()}
        dragToDismiss={y()}
      />
      {/*   <Toaster id="toaster-2" positionY="bottom" reverseToastOrder /> */}
      <App />
    </ToastProvider>
  );
}, root!);
