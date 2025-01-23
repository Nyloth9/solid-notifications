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

/**
 * Provides the theme context to its child components.
 */
export function ThemeProvider(props: ThemeProviderProps) {
  // Create theme storage signal
  const [getTheme, setTheme] = createStorageSignal<Theme>(
    "theme",
    globalThis.matchMedia?.("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark",
  );

  // Add or remove "dark" class when theme changes
  createEffect(() => {
    // Destructure document element
    const { documentElement } = document;
    const { classList } = documentElement;

    // Disable CSS transitions while changing theme
    // disableTransitions();

    // Add or remove "dark" class
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

/**
 * Provides the ability to access the theme context.
 *
 * @returns The theme context.
 */
export function useTheme() {
  return useContext(ThemeContext)!;
}
