import { useToast } from "solid-notifications";

export function KeyboardShortcutExample() {
  const { notify } = useToast();

  return (
    <div>
      <button
        class="inline-flex justify-center gap-0.5 overflow-hidden rounded-full px-3 py-0.5 text-sm font-medium text-slate-700 ring-1 ring-inset ring-slate-900/20 hover:bg-slate-900/2.5 hover:text-slate-900 active:bg-slate-900/5 dark:bg-white/5 dark:text-slate-50 dark:ring-white/10 dark:hover:bg-white/10 dark:hover:text-white"
        onClick={() =>
          notify("Try pressing Alt + T to focus this toast", {
            toasterId: "toaster-1",
          })
        }
      >
        Show Toast
      </button>
    </div>
  );
}
