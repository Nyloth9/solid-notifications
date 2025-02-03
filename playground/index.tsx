/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import { Route, Router } from "@solidjs/router";
import { createSignal } from "solid-js";
import "../src/index.css";
import App from "./App";
import Toaster from "../src/core/Toaster";
import ToastProvider from "../src/core/Context";
import Showcase from "./pages/Showcase";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

const [theme, setTheme] = createSignal("light");

render(() => {
  return (
    <ToastProvider theme={theme()}>
      <Toaster toasterId="toaster-1" limit={3} />
      <Toaster toasterId="toaster-2" positionY="bottom" reverseToastOrder />
      <Router>
        <Route
          path="/"
          component={() => <App theme={theme} setTheme={setTheme} />}
        />
        <Route path="/showcase" component={Showcase} />
      </Router>
    </ToastProvider>
  );
}, root!);
