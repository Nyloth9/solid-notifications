import { JSX } from "solid-js";
import { useTheme } from "../util/theme";
import { ToastProvider } from "this-is-a-test-package-987";

interface Props {
  children: JSX.Element;
}

export default function Layout(props: Props) {
  const { setTheme, getTheme } = useTheme();

  return (
    <ToastProvider theme={getTheme()} wrapperClass="sn-toast-wrapper not-prose">
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
              class="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 bg-white/90 px-4 backdrop-blur-sm transition dark:bg-slate-900/80 dark:backdrop-blur sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80"
              style="--bg-opacity-light: 0.5; --bg-opacity-dark: 0.2;"
            >
              <div class="absolute inset-x-0 top-full h-px bg-slate-900/7.5 transition dark:bg-white/7.5" />
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
              <div class="flex items-center gap-4 lg:hidden">
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
                    <path d="M.5 1h9M.5 8h9M.5 4.5h9" />
                  </svg>
                </button>
                <a aria-label="Home" href="/" class="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 14 14"
                    class="-mt-0.5 fill-blue-500"
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

                  <span class="text-sm font-bold dark:text-white">
                    Solid Notifications
                  </span>
                </a>
              </div>
              <div class="flex items-center gap-5">
                <nav class="hidden md:block">
                  <ul role="list" class="flex items-center gap-8">
                    <li>
                      <a
                        class="flex items-center gap-1 text-sm leading-5 text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        href="https://github.com/Nyloth9/solid-notifications"
                        target="_blank"
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
                <div class="hidden md:block md:h-5 md:w-px md:bg-slate-900/10 md:dark:bg-white/15" />
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
                      const activeTheme = getTheme();
                      setTheme(activeTheme === "dark" ? "light" : "dark");
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
                      <path d="M12.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
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
                      <path d="M15.224 11.724a5.5 5.5 0 0 1-6.949-6.949 5.5 5.5 0 1 0 6.949 6.949Z" />
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
                    Introduction
                  </h2>
                  <div class="relative mt-3 pl-2">
                    <div
                      class="absolute inset-x-0 top-0 bg-slate-800/2.5 will-change-transform dark:bg-white/2.5"
                      style="height: 64px; top: 128px; border-radius: 8px; opacity: 1; transform: none; transform-origin: 50% 50% 0px;"
                    />
                    <div
                      class="absolute inset-y-0 left-2 w-px bg-slate-900/10 dark:bg-white/5"
                      style="transform: none; transform-origin: 50% 50% 0px;"
                    />
                    <div
                      class="absolute left-2 h-6 w-px bg-emerald-500"
                      style="top: 132px; opacity: 1; transform: none; transform-origin: 50% 50% 0px;"
                    />
                    <ul role="list" class="border-l border-transparent">
                      <li class="relative">
                        <a
                          class="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                          href="/#core-features"
                        >
                          <span class="truncate">Core features</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li class="relative mt-6">
                  <h2 class="text-xs font-semibold text-slate-900 dark:text-white">
                    Guides
                  </h2>
                  <div class="relative mt-3 pl-2">
                    <div
                      class="absolute inset-x-0 top-0 bg-slate-800/2.5 will-change-transform dark:bg-white/2.5"
                      style="height: 64px; top: 128px; border-radius: 8px; opacity: 1; transform: none; transform-origin: 50% 50% 0px;"
                    />
                    <div
                      class="absolute inset-y-0 left-2 w-px bg-slate-900/10 dark:bg-white/5"
                      style="transform: none; transform-origin: 50% 50% 0px;"
                    />
                    <div
                      class="absolute left-2 h-6 w-px bg-emerald-500"
                      style="top: 132px; opacity: 1; transform: none; transform-origin: 50% 50% 0px;"
                    />
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
                              <span class="truncate">
                                Example using cursors
                              </span>
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
                    />
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
        <div class="scrollbar-md relative flex h-full max-h-screen flex-col overflow-y-auto px-4 pt-14 sm:px-6 lg:px-8">
          <main class="w-full flex-auto text-left">
            <div class="prose dark:prose-invert [html_:where(&>*)]:mx-auto [html_:where(&>*)]:max-w-2xl [html_:where(&>*)]:lg:mx-[calc(50%-min(50%,theme(maxWidth.lg)))] [html_:where(&>*)]:lg:max-w-3xl">
              <article class="pb-10 pt-14">{props.children}</article>
            </div>
          </main>
          <footer class="mx-auto w-full max-w-2xl space-y-10 pb-16 lg:max-w-5xl">
            <div class="flex">
              <div class="ml-auto flex flex-col items-end gap-3">
                <a
                  class="inline-flex justify-center gap-0.5 overflow-hidden rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-900 transition hover:bg-slate-200 dark:bg-slate-800/40 dark:text-slate-400 dark:ring-1 dark:ring-inset dark:ring-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                  aria-label="Next: Quickstart"
                  href="/quickstart"
                >
                  Next
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                    class="-mr-1 mt-0.5 h-5 w-5"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"
                    ></path>
                  </svg>
                </a>
                <a
                  tabindex="-1"
                  aria-hidden="true"
                  class="text-base font-semibold text-slate-900 transition hover:text-slate-600 dark:text-white dark:hover:text-slate-300"
                  href="/quickstart"
                >
                  Quickstart
                </a>
              </div>
            </div>
            <div class="flex items-center justify-between gap-5 border-t border-slate-900/5 pt-8 dark:border-white/5">
              <p class="text-xs text-slate-600 dark:text-slate-400">
                © Copyright {new Date().getFullYear()} Solid Notifications
              </p>
              <a
                class="group"
                href="https://github.com/nyloth9"
                aria-label="GitHub"
                target="_blank"
              >
                <span class="sr-only">GitHub</span>
                <svg
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  class="h-5 w-5 fill-slate-700 transition group-hover:fill-slate-900 dark:fill-slate-500 dark:group-hover:fill-slate-400"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10 1.667c-4.605 0-8.334 3.823-8.334 8.544 0 3.78 2.385 6.974 5.698 8.106.417.075.573-.182.573-.406 0-.203-.011-.875-.011-1.592-2.093.397-2.635-.522-2.802-1.002-.094-.246-.5-1.005-.854-1.207-.291-.16-.708-.556-.01-.567.656-.01 1.124.62 1.281.876.75 1.292 1.948.93 2.427.705.073-.555.291-.93.531-1.143-1.854-.213-3.791-.95-3.791-4.218 0-.929.322-1.698.854-2.296-.083-.214-.375-1.09.083-2.265 0 0 .698-.224 2.292.876a7.576 7.576 0 0 1 2.083-.288c.709 0 1.417.096 2.084.288 1.593-1.11 2.291-.875 2.291-.875.459 1.174.167 2.05.084 2.263.53.599.854 1.357.854 2.297 0 3.278-1.948 4.005-3.802 4.219.302.266.563.78.563 1.58 0 1.143-.011 2.061-.011 2.35 0 .224.156.491.573.405a8.365 8.365 0 0 0 4.11-3.116 8.707 8.707 0 0 0 1.567-4.99c0-4.721-3.73-8.545-8.334-8.545Z"
                  ></path>
                </svg>
              </a>
            </div>
          </footer>
        </div>
      </div>
    </ToastProvider>
  );
}
