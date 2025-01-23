import { createStorageSignal } from "@solid-primitives/storage";
import {
  Accessor,
  createContext,
  createEffect,
  JSX,
  Setter,
  useContext,
} from "solid-js";

type Theme = "dark" | "light" | null;

// Create theme context
const ThemeContext = createContext<{
  getTheme: Accessor<Theme>;
  setTheme: Setter<Theme>;
}>();

type ThemeProviderProps = {
  children: JSX.Element;
};

export function ThemeProvider(props: ThemeProviderProps) {
  const [getTheme, setTheme] = createStorageSignal<Theme>(
    "theme",
    globalThis.matchMedia?.("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark",
  );

  createEffect(() => {
    const { documentElement } = document;
    const { classList } = documentElement;

    disableTransitions();

    if (getTheme() === "dark") {
      classList.add("dark");
      documentElement.setAttribute("data-theme", "dark");
    } else {
      classList.remove("dark");
      documentElement.removeAttribute("data-theme");
    }
  });

  return <ThemeContext.Provider value={{ setTheme, getTheme }} {...props} />;
}

export function useTheme() {
  return useContext(ThemeContext)!;
}

function disableTransitions() {
  const { classList } = document.documentElement;
  classList.add("disable-transitions");
  setTimeout(() => classList.remove("disable-transitions"), 100);
}
