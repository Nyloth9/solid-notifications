import { createSignal } from "solid-js";

const useSearchbarState = () => {
  const [searchbarOpen, setSearchbarOpen] = createSignal(false);
  const [opacity, setOpacity] = createSignal("opacity-0");

  function openSearchbar() {
    setSearchbarOpen(true);

    setTimeout(() => {
      setOpacity("opacity-100");
    }, 0);
  }

  function closeSearchbar() {
    setOpacity("opacity-0");

    setTimeout(() => {
      setSearchbarOpen(false);
    }, 300);
  }

  return {
    searchbarOpen,
    opacity,
    openSearchbar,
    closeSearchbar,
  };
};

export default useSearchbarState;
