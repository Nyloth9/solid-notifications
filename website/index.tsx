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
  const [offsetX, setOffsetX] = createSignal(64);
  const [class1, setClass1] = createSignal("sn-toast-wrapper");
  const [bg, setBg] = createSignal("red");

  onMount(() => {
    setTimeout(() => {
      setOffsetX((prev) => prev + 100);
      setClass1("1asdasdsad");
      setBg("white");
    }, 4000);

    /*     setTimeout(() => {
      setOffsetX((prev) => prev + 300);
      setClass1("sn-toast-wrapper");
      setBg("purple");
    }, 6000); */
  });

  return (
    <ToastProvider>
      <Toaster
        toasterId="toaster-1"
        offsetX={offsetX()}
        wrapperClass={class1()}
        wrapperStyle={{ "background-color": "green" }}
      />
      {/* <Toaster toasterId="toaster-2" positionY="bottom" reverseToastOrder /> */}
      <App />
    </ToastProvider>
  );
}, root!);
