import { ToastContent, ToastOptions, useToast } from "~/notifications";

interface Props {
  children: string;
  toastBody?: ToastContent;
  toastOptions?: ToastOptions;
}

export default function Button(props: Props) {
  const { notify } = useToast();

  return (
    <button
      type="button"
      onClick={() =>
        notify(
          props.toastBody || "This is a toast message!",
          props.toastOptions,
        )
      }
      class="inline-flex items-center justify-center gap-1.5 overflow-hidden rounded bg-blue-500 px-3 py-1.5 text-sm font-medium text-white shadow-flat transition-colors hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
      >
        <g fill="none">
          <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
          <path
            fill="currentColor"
            d="M12 2a7 7 0 0 0-7 7v3.528a1 1 0 0 1-.105.447l-1.717 3.433A1.1 1.1 0 0 0 4.162 18h15.676a1.1 1.1 0 0 0 .984-1.592l-1.716-3.433a1 1 0 0 1-.106-.447V9a7 7 0 0 0-7-7m0 19a3 3 0 0 1-2.83-2h5.66A3 3 0 0 1 12 21"
          />
        </g>
      </svg>
      {props.children}
    </button>
  );
}
