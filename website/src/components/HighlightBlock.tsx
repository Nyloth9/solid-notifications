import { Show } from "solid-js";

interface Props {
  children: string;
  type?: "info" | "warning";
}

export default function HighlightBlock(props: Props) {
  const infoColors =
    "border-emerald-500/20 bg-emerald-50/50 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/5 dark:text-emerald-200 dark:[--tw-prose-links-hover:var(--color-emerald-300)] dark:[--tw-prose-links:var(--color-white)]";
  const warningColors =
    "border-yellow-500/20 bg-yellow-50/50 text-yellow-900 dark:border-yellow-500/30 dark:bg-yellow-500/5 dark:text-yellow-200 dark:[--tw-prose-links-hover:var(--color-yellow-300)] dark:[--tw-prose-links:var(--color-white)]";

  return (
    <div
      class={`my-6 flex gap-2.5 rounded-2xl border p-4 text-sm/6 ${props.type === "warning" ? warningColors : infoColors}`}
    >
      <Show when={props.type === "info"}>
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          class="mt-1 h-4 w-4 flex-none fill-emerald-500 stroke-white dark:fill-emerald-200/20 dark:stroke-emerald-200"
        >
          <circle cx="8" cy="8" r="8" stroke-width="0" />
          <path
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M6.75 7.75h1.5v3.5"
          />
          <circle cx="8" cy="4" r=".5" fill="none" />
        </svg>
      </Show>

      <Show when={props.type === "warning"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
          class="mt-1 h-4 w-4 flex-none fill-yellow-500 stroke-white dark:fill-yellow-200/20 dark:stroke-yellow-200"
        >
          <circle cx="8" cy="8" r="8" stroke-width="0" />
          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0z" />
        </svg>
      </Show>

      <div class="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {props.children}
      </div>
    </div>
  );
}
