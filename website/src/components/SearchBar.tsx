import { createSignal, onMount, Show } from "solid-js";

export default function SearchBar() {
  const [isOpen, setIsOpen] = createSignal(false);

  onMount(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 1000);
  });

  return (
    <div
      class="fixed inset-0 z-50 hidden lg:block"
      id="headlessui-dialog-:r2:"
      role="dialog"
      tabindex="-1"
      aria-modal="true"
      data-headlessui-state="open"
      data-open=""
    >
      <div
        class={`backdrop-blur-xs fixed inset-0 bg-slate-400/60 transition-all duration-300 ease-out dark:bg-black/70 ${
          isOpen() ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
        data-headlessui-state="open"
        data-open=""
        style=""
      />

      <div class="fixed inset-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-20 md:py-32 lg:px-8 lg:py-[15vh]">
        <div
          class="data-closed:scale-95 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in mx-auto transform-gpu overflow-hidden rounded-lg bg-slate-50 shadow-xl ring-1 ring-slate-900/7.5 dark:bg-slate-900 dark:ring-slate-800 sm:max-w-xl"
          id="headlessui-dialog-panel-:r9:"
          data-headlessui-state="open"
          data-open=""
          style=""
        >
          <div
            role="combobox"
            aria-expanded="false"
            aria-haspopup="listbox"
            aria-labelledby=":r0:-label"
          >
            <form action="" role="search">
              <div class="group relative flex h-12">
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                  class="pointer-events-none absolute left-3 top-0 h-full w-5 stroke-slate-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"
                  ></path>
                </svg>
                <input
                  data-autofocus="true"
                  class="[&amp;::-webkit-search-cancel-button]:hidden [&amp;::-webkit-search-decoration]:hidden [&amp;::-webkit-search-results-button]:hidden [&amp;::-webkit-search-results-decoration]:hidden flex-auto appearance-none bg-transparent pl-10 pr-4 text-slate-900 outline-none placeholder:text-slate-500 focus:w-full focus:flex-none dark:text-white sm:text-sm"
                  aria-autocomplete="both"
                  aria-labelledby=":r0:-label"
                  id=":r0:-input"
                  autocomplete="off"
                  autocorrect="off"
                  autocapitalize="off"
                  enterkeyhint="search"
                  spell-check="false"
                  placeholder="Find something..."
                  maxlength="512"
                  type="search"
                  value=""
                />
              </div>
              <div class="border-t border-slate-200 bg-white empty:hidden dark:border-slate-100/5 dark:bg-white/2.5"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
