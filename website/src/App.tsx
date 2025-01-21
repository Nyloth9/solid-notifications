import type { Component } from "solid-js";
import Example from "./components/Example.mdx";
import logo from "./logo.svg";
import Counter from "./components/Counter";

const App: Component = () => {
  return (
    <div>
      <header>
        <img src={logo} class="pointer-events-none h-60" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          class="text-blue-500"
          href="https://solidjs.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
      <Example components={{ Counter }} />
    </div>
  );
};

export default App;
