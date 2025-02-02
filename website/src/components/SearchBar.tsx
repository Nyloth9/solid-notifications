import {
  createEffect,
  createSignal,
  For,
  on,
  onCleanup,
  onMount,
  Show,
} from "solid-js";
import Fuse from "fuse.js";
import fuseIndex from "../search/fuse-index.json";
import searchData from "../search/search-data.json";
import useSearchbarState from "~/store/app-store";

function initializeSearch() {
  const fuseOptions = {
    keys: ["heading", "content", "page"],
    includeScore: true,
    threshold: 0.4,
  };

  const index = Fuse.parseIndex(fuseIndex);
  const fuse = new Fuse(searchData, fuseOptions, index);

  return fuse;
}

interface SearchBarProps {
  state: ReturnType<typeof useSearchbarState>;
}

export default function SearchBar(props: SearchBarProps) {
  const fuse = initializeSearch();
  const [query, setQuery] = createSignal("");
  const [debouncedQuery, setDebouncedQuery] = createSignal("");
  const [results, setResults] = createSignal<any[]>([]);

  /*   onMount(() => {
    setTimeout(() => {
      state.openSearchbar();
    }, 1000);
  }); */

  createEffect(
    on(
      () => query(),
      () => {
        const timer = setTimeout(() => {
          setDebouncedQuery(query());
        }, 300); // 300ms debounce delay

        onCleanup(() => clearTimeout(timer)); // Cleanup timer on re-run
      },
    ),
  );

  createEffect(() => {
    const searchTerm = debouncedQuery().trim();

    if (!fuse || searchTerm === "") {
      setResults([]);
      return;
    }

    const searchResults = fuse.search(searchTerm);
    console.log("search results: ", searchResults);
    setResults(searchResults);
  });

  return (
    <Show when={props.state.searchbarOpen()}>
      <div class="fixed inset-0 z-50 block">
        <div
          class={`backdrop-blur-xs fixed inset-0 bg-slate-400/20 transition-all duration-300 ease-out dark:bg-black/40 ${props.state.opacity()}`}
        />

        <div
          onClick={(event) => {
            const isInteractable = event.target === event.currentTarget;

            if (isInteractable) {
              props.state.closeSearchbar();
            }
          }}
          class={`fixed inset-0 overflow-y-auto px-4 py-4 transition-all duration-300 sm:px-6 sm:py-20 md:py-32 lg:px-8 lg:py-[15vh] ${props.state.opacity()}`}
        >
          <div
            class={`mx-auto transform-gpu overflow-hidden rounded-lg bg-slate-50 shadow-xl ring-1 ring-slate-900/7.5 duration-300 dark:bg-slate-900 dark:ring-slate-800 sm:max-w-xl ${props.state.searchbarOpen() ? "scale-100 opacity-100 ease-out" : "scale-95 opacity-0 ease-in"}`}
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
                    class={`[&amp;::-webkit-search-cancel-button]:hidden [&amp;::-webkit-search-decoration]:hidden [&amp;::-webkit-search-results-button]:hidden [&amp;::-webkit-search-results-decoration]:hidden flex-auto appearance-none bg-transparent pl-10 pr-4 text-slate-900 outline-none placeholder:text-slate-500 focus:w-full focus:flex-none dark:text-white sm:text-sm ${props.state.opacity()} `}
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
                    value={query()}
                    onInput={(e) => setQuery(e.target.value)}
                  />
                </div>
                <div class="scrollbar-sm lg:scrollbar-md max-h-96 overflow-y-auto border-t border-slate-200 bg-white empty:hidden dark:border-slate-100/5 dark:bg-white/2.5">
                  <ul role="listbox">
                    <For each={results()}>
                      {(result) => (
                        <li
                          class="group block cursor-pointer px-4 py-3 hover:bg-slate-50 focus:bg-slate-100 focus:outline-none dark:hover:bg-slate-800/50 dark:focus:bg-slate-800/50 dark:group-aria-selected:bg-slate-800/50"
                          role="option"
                        >
                          <a
                            href={result.item.url}
                            onClick={() => props.state.closeSearchbar()}
                          >
                            <div class="text-sm font-medium text-slate-900 group-aria-selected:text-emerald-500 dark:text-white">
                              <span class="flex flex-col">
                                <mark class="bg-transparent text-emerald-500 underline">
                                  {result.item.heading}
                                </mark>

                                <span class="line-clamp-3 text-xs">
                                  {result.item.content}
                                </span>
                              </span>
                            </div>
                            <div
                              id=":r2k:-hierarchy"
                              aria-hidden="true"
                              class="mt-1 truncate whitespace-nowrap text-2xs text-slate-500"
                            >
                              <span>
                                <span class="">{result.item.page}</span>
                              </span>
                            </div>
                          </a>
                        </li>
                      )}
                    </For>
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
}
