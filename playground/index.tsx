/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import "../src/index.css";
import App from "./App";
import ToastProvider from "../src/core/Context";
import Toaster from "../src/core/Toaster";
import { createSignal, onMount } from "solid-js";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

const [className, setClassName] = createSignal("bg-red-200");
const [theme, setTheme] = createSignal("light");
const [style, setStyle] = createSignal({
  "margin-top": "0px",
});

onMount(() => {
  setTimeout(() => {
    setClassName("bg-green-200");
    //setTheme("dark");
  }, 4000);

  /*   setInterval(() => {
    setStyle({
      "margin-top": `${Math.floor(Math.random() * 100)}px`,
    });
  }, 1000); */
});

render(() => {
  return (
    <ToastProvider theme={theme()}>
      <Toaster
        toasterId="toaster-1"
        /*         wrapperStyle={style()} */
      />
      <Toaster toasterId="toaster-2" positionY="bottom" reverseToastOrder />
      <App />
      <div class="container mx-auto -mt-4 px-4">
        <button
          class="mt-4 rounded bg-slate-700 px-4 py-2 font-bold text-white hover:bg-slate-800 active:bg-slate-900"
          onClick={() => setTheme(theme() === "light" ? "dark" : "light")}
        >
          Change theme
        </button>
        <span class="ml-2">
          Current theme: <span class="font-medium uppercase">{theme()}</span>
        </span>
      </div>
    </ToastProvider>
  );
}, root!);
