import { JSX } from "solid-js";
import { useTheme } from "./theme";

interface Props {
  children: JSX.Element;
}

export default function Layout(props: Props) {
  const { setTheme } = useTheme();

  return (
    <div class="h-full lg:ml-72 xl:ml-80">
      <header class="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex">
        <div class="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-slate-900/10 lg:px-6 lg:pb-8 lg:pt-4 lg:dark:border-white/10 xl:w-80">
          <div class="hidden lg:flex">
            <a aria-label="Home" href="/" class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 14 14"
                class="fill-blue-500"
              >
                <g>
                  <path d="M9.5 4.5A2.5 2.5 0 0 0 7 2H2.5A2.5 2.5 0 0 0 1 6.5v5a1 1 0 0 0 1 1h5.5a1 1 0 0 0 1-1v-5a2.49 2.49 0 0 0 1-2" />
                  <path
                    fill-rule="evenodd"
                    d="M10.695 2.97a3.99 3.99 0 0 1-.226 3.525H13l.008-.001A2.49 2.49 0 0 0 14 4.5A2.5 2.5 0 0 0 11.5 2h-1.377c.235.294.428.62.572.97M13 7.743h-3V11.5a2.5 2.5 0 0 1-.209 1H12a1 1 0 0 0 1-1z"
                    clip-rule="evenodd"
                  />
                </g>
              </svg>

              <span class="-mb-1 font-bold dark:text-white">
                Solid Notifications
              </span>
            </a>
          </div>
          <div
            class="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 bg-white/[var(--bg-opacity-light)] px-4 backdrop-blur-sm transition dark:bg-slate-900/[var(--bg-opacity-dark)] dark:backdrop-blur sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80"
            style="--bg-opacity-light: 0.5; --bg-opacity-dark: 0.2;"
          >
            <div class="absolute inset-x-0 top-full h-px bg-slate-900/7.5 transition dark:bg-white/7.5"></div>
            <div class="hidden lg:block lg:max-w-xs lg:flex-auto">
              <button
                type="button"
                class="ui-not-focus-visible:outline-none hidden h-9 w-full items-center gap-2 rounded-full bg-white pl-2 pr-3 text-sm text-slate-500 ring-1 ring-slate-900/10 transition hover:ring-slate-900/20 dark:bg-white/5 dark:text-slate-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 lg:flex"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                  class="h-5 w-5 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"
                  ></path>
                </svg>
                Find something...
              </button>
            </div>
            <div class="flex items-center gap-5 lg:hidden">
              <button
                type="button"
                class="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-slate-900/5 dark:hover:bg-white/5"
                aria-label="Toggle navigation"
              >
                <svg
                  viewBox="0 0 10 9"
                  fill="none"
                  stroke-linecap="round"
                  aria-hidden="true"
                  class="w-2.5 stroke-slate-900 dark:stroke-white"
                >
                  <path d="M.5 1h9M.5 8h9M.5 4.5h9"></path>
                </svg>
              </button>
              <a aria-label="Home" href="/">
                <svg viewBox="0 0 99 24" aria-hidden="true" class="h-6">
                  <path
                    class="fill-emerald-400"
                    d="M16 8a5 5 0 0 0-5-5H5a5 5 0 0 0-5 5v13.927a1 1 0 0 0 1.623.782l3.684-2.93a4 4 0 0 1 2.49-.87H11a5 5 0 0 0 5-5V8Z"
                  ></path>
                  <path
                    class="fill-slate-900 dark:fill-white"
                    d="M26.538 18h2.654v-3.999h2.576c2.672 0 4.456-1.723 4.456-4.333V9.65c0-2.61-1.784-4.333-4.456-4.333h-5.23V18Zm4.58-10.582c1.52 0 2.416.8 2.416 2.241v.018c0 1.441-.896 2.25-2.417 2.25h-1.925V7.418h1.925ZM38.051 18h2.566v-5.414c0-1.371.923-2.206 2.382-2.206.396 0 .791.061 1.178.15V8.287a3.843 3.843 0 0 0-.958-.123c-1.257 0-2.136.615-2.443 1.661h-.159V8.323h-2.566V18Zm11.55.202c2.979 0 4.772-1.88 4.772-5.036v-.018c0-3.128-1.82-5.036-4.773-5.036-2.953 0-4.772 1.916-4.772 5.036v.018c0 3.146 1.793 5.036 4.772 5.036Zm0-2.013c-1.372 0-2.145-1.116-2.145-3.023v-.018c0-1.89.782-3.023 2.144-3.023 1.354 0 2.145 1.134 2.145 3.023v.018c0 1.907-.782 3.023-2.145 3.023Zm10.52 1.846c.492 0 .967-.053 1.283-.114v-1.907a6.057 6.057 0 0 1-.755.044c-.87 0-1.24-.387-1.24-1.257v-4.544h1.995V8.323H59.41V6.012h-2.592v2.311h-1.495v1.934h1.495v5.133c0 1.88.949 2.645 3.304 2.645Zm7.287.167c2.98 0 4.772-1.88 4.772-5.036v-.018c0-3.128-1.82-5.036-4.772-5.036-2.954 0-4.773 1.916-4.773 5.036v.018c0 3.146 1.793 5.036 4.773 5.036Zm0-2.013c-1.372 0-2.145-1.116-2.145-3.023v-.018c0-1.89.782-3.023 2.145-3.023 1.353 0 2.144 1.134 2.144 3.023v.018c0 1.907-.782 3.023-2.144 3.023Zm10.767 2.013c2.522 0 4.034-1.353 4.297-3.463l.01-.053h-2.374l-.017.036c-.229.966-.853 1.467-1.908 1.467-1.37 0-2.135-1.08-2.135-3.04v-.018c0-1.934.755-3.006 2.135-3.006 1.099 0 1.74.615 1.908 1.556l.008.017h2.391v-.026c-.228-2.162-1.749-3.56-4.315-3.56-3.033 0-4.738 1.837-4.738 5.019v.017c0 3.217 1.714 5.054 4.738 5.054Zm10.257 0c2.98 0 4.772-1.88 4.772-5.036v-.018c0-3.128-1.82-5.036-4.772-5.036-2.953 0-4.773 1.916-4.773 5.036v.018c0 3.146 1.793 5.036 4.773 5.036Zm0-2.013c-1.371 0-2.145-1.116-2.145-3.023v-.018c0-1.89.782-3.023 2.145-3.023 1.353 0 2.144 1.134 2.144 3.023v.018c0 1.907-.782 3.023-2.144 3.023ZM95.025 18h2.566V4.623h-2.566V18Z"
                  ></path>
                </svg>
              </a>
            </div>
            <div class="flex items-center gap-5">
              <nav class="hidden md:block">
                <ul role="list" class="flex items-center gap-8">
                  <li>
                    <a
                      class="flex items-center gap-1 text-sm leading-5 text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      href="#"
                    >
                      <svg
                        height="22"
                        width="22"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                        />
                      </svg>
                      Github
                    </a>
                  </li>
                </ul>
              </nav>
              <div class="hidden md:block md:h-5 md:w-px md:bg-slate-900/10 md:dark:bg-white/15"></div>
              <div class="flex gap-4">
                <div class="contents lg:hidden">
                  <button
                    type="button"
                    class="ui-not-focus-visible:outline-none flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-slate-900/5 dark:hover:bg-white/5 lg:hidden"
                    aria-label="Find something..."
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                      class="h-5 w-5 stroke-slate-900 dark:stroke-white"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"
                      ></path>
                    </svg>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setTheme("dark");
                  }}
                  class="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-slate-900/5 dark:hover:bg-white/5"
                  aria-label="Switch to dark theme"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                    class="h-5 w-5 stroke-slate-900 dark:hidden"
                  >
                    <path d="M12.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"></path>
                    <path
                      stroke-linecap="round"
                      d="M10 5.5v-1M13.182 6.818l.707-.707M14.5 10h1M13.182 13.182l.707.707M10 15.5v-1M6.11 13.889l.708-.707M4.5 10h1M6.11 6.111l.708.707"
                    ></path>
                  </svg>
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                    class="hidden h-5 w-5 stroke-white dark:block"
                  >
                    <path d="M15.224 11.724a5.5 5.5 0 0 1-6.949-6.949 5.5 5.5 0 1 0 6.949 6.949Z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <nav class="hidden lg:mt-10 lg:block">
            <ul role="list">
              <li class="md:hidden">
                <a
                  class="block py-1 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  href="/"
                >
                  API
                </a>
              </li>
              <li class="md:hidden">
                <a
                  class="block py-1 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  href="#"
                >
                  Documentation
                </a>
              </li>
              <li class="md:hidden">
                <a
                  class="block py-1 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  href="#"
                >
                  Support
                </a>
              </li>
              <li class="relative mt-6 md:mt-0">
                <h2 class="text-xs font-semibold text-slate-900 dark:text-white">
                  Guides
                </h2>
                <div class="relative mt-3 pl-2">
                  <div
                    class="absolute inset-x-0 top-0 bg-slate-800/2.5 will-change-transform dark:bg-white/2.5"
                    style="height: 64px; top: 128px; border-radius: 8px; opacity: 1; transform: none; transform-origin: 50% 50% 0px;"
                  ></div>
                  <div
                    class="absolute inset-y-0 left-2 w-px bg-slate-900/10 dark:bg-white/5"
                    style="transform: none; transform-origin: 50% 50% 0px;"
                  ></div>
                  <div
                    class="absolute left-2 h-6 w-px bg-emerald-500"
                    style="top: 132px; opacity: 1; transform: none; transform-origin: 50% 50% 0px;"
                  ></div>
                  <ul role="list" class="border-l border-transparent">
                    <li class="relative">
                      <a
                        class="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        href="/"
                      >
                        <span class="truncate">Introduction</span>
                      </a>
                    </li>
                    <li
                      class="relative"
                      style="transform: none; transform-origin: 50% 50% 0px;"
                    >
                      <a
                        class="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        href="/quickstart"
                      >
                        <span class="truncate">Quickstart</span>
                      </a>
                    </li>
                    <li
                      class="relative"
                      style="transform: none; transform-origin: 50% 50% 0px;"
                    >
                      <a
                        class="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        href="/sdks"
                      >
                        <span class="truncate">SDKs</span>
                      </a>
                    </li>
                    <li
                      class="relative"
                      style="transform: none; transform-origin: 50% 50% 0px;"
                    >
                      <a
                        class="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        href="/authentication"
                      >
                        <span class="truncate">Authentication</span>
                      </a>
                    </li>
                    <li
                      class="relative"
                      style="transform: none; transform-origin: 50% 50% 0px;"
                    >
                      <a
                        class="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-slate-900 transition dark:text-white"
                        href="/pagination"
                        aria-current="page"
                      >
                        <span class="truncate">Pagination</span>
                      </a>
                      <ul role="list" style="opacity: 1;">
                        <li>
                          <a
                            class="flex justify-between gap-2 py-1 pl-7 pr-3 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                            href="/pagination#example-using-cursors"
                          >
                            <span class="truncate">Example using cursors</span>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li
                      class="relative"
                      style="transform: none; transform-origin: 50% 50% 0px;"
                    >
                      <a
                        class="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        href="/errors"
                      >
                        <span class="truncate">Errors</span>
                      </a>
                    </li>
                    <li
                      class="relative"
                      style="transform: none; transform-origin: 50% 50% 0px;"
                    >
                      <a
                        class="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        href="/webhooks"
                      >
                        <span class="truncate">Webhooks</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="relative mt-6">
                <h2
                  class="text-xs font-semibold text-slate-900 dark:text-white"
                  style="transform: none; transform-origin: 50% 50% 0px;"
                >
                  Resources
                </h2>
                <div class="relative mt-3 pl-2">
                  <div
                    class="absolute inset-y-0 left-2 w-px bg-slate-900/10 dark:bg-white/5"
                    style="transform: none; transform-origin: 50% 50% 0px;"
                  ></div>
                  <ul role="list" class="border-l border-transparent">
                    <li
                      class="relative"
                      style="transform: none; transform-origin: 50% 50% 0px;"
                    >
                      <a
                        class="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        href="/contacts"
                      >
                        <span class="truncate">Contacts</span>
                      </a>
                    </li>
                    <li
                      class="relative"
                      style="transform: none; transform-origin: 50% 50% 0px;"
                    >
                      <a
                        class="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        href="/conversations"
                      >
                        <span class="truncate">Conversations</span>
                      </a>
                    </li>
                    <li
                      class="relative"
                      style="transform: none; transform-origin: 50% 50% 0px;"
                    >
                      <a
                        class="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        href="/messages"
                      >
                        <span class="truncate">Messages</span>
                      </a>
                    </li>
                    <li
                      class="relative"
                      style="transform: none; transform-origin: 50% 50% 0px;"
                    >
                      <a
                        class="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        href="/groups"
                      >
                        <span class="truncate">Groups</span>
                      </a>
                    </li>
                    <li
                      class="relative"
                      style="transform: none; transform-origin: 50% 50% 0px;"
                    >
                      <a
                        class="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        href="/attachments"
                      >
                        <span class="truncate">Attachments</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {props.children}
    </div>
  );
}
