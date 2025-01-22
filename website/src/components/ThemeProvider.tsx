import { JSX, createContext, createSignal, onMount } from "solid-js";

const ThemeContext = createContext();

interface themeProps {
  children?: JSX.Element | JSX.Element[];
  initialTheme: "light" | "dark";
}

export function ThemeProvider(props: themeProps) {
  const [isDarkMode, setIsDarkMode] = createSignal(
    props.initialTheme === "dark",
  );
  const lightTheme = "light";
  const darkTheme = "dark";

  onMount(() => {
    // see if there is a theme in local storage.
    const theme = localStorage.getItem("theme");

    // if not, find the users preferred theme.
    if (!theme) {
      if (window.matchMedia("(prefers-color-scheme: dark)")) {
        setIsDarkMode(true);
        toggleTheme(darkTheme);
        localStorage.setItem("theme", darkTheme);
      } else {
        setIsDarkMode(false);
        toggleTheme(lightTheme);
        localStorage.setItem("theme", lightTheme);
      }
    } else {
      if (theme === darkTheme) {
        setIsDarkMode(true);
        toggleTheme(darkTheme);
      } else {
        setIsDarkMode(false);
        toggleTheme(lightTheme);
      }
    }
  });

  // FUNCTIONS
  function toggleTheme(colorTheme: string) {
    // update the darkmode state.
    setIsDarkMode(!isDarkMode());
    // data theme is for Daisy
    document.documentElement.setAttribute("data-theme", colorTheme);
    // Save the user's preference in localStorage or a cookie for persistence
    localStorage.setItem("theme", colorTheme);
  }

  // PROVIDER VALUES
  const sharedValues = {
    lightTheme,
    darkTheme,
    isDarkMode,
    toggleTheme,
  };

  // TSX

  return (
    <ThemeContext.Provider value={sharedValues}>
      {props.children}
    </ThemeContext.Provider>
  );
}
