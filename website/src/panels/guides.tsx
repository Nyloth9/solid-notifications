import { useToast } from "solid-notifications";

export function KeyboardShortcutExample() {
  const { notify } = useToast();

  return (
    <div>
      <button
        class="inline-flex justify-center gap-0.5 overflow-hidden rounded-full px-3 py-0.5 text-sm font-medium text-slate-700 ring-1 ring-inset ring-slate-900/20 hover:bg-slate-900/2.5 hover:text-slate-900 active:bg-slate-900/5 dark:bg-white/5 dark:text-slate-50 dark:ring-white/10 dark:hover:bg-white/10 dark:hover:text-white"
        onClick={() => {
          const { progressControls } = notify(
            <div>
              <div>Try pressing Alt + T to focus this toast</div>
              <div class="flex flex-wrap gap-2">
                <button
                  class="mt-2 rounded-sm bg-transparent text-xs text-slate-600 underline underline-offset-2 hover:text-slate-900 active:translate-y-px dark:text-slate-300 dark:hover:text-white"
                  onClick={() => progressControls.pause()}
                >
                  Pause timer
                </button>
                <button
                  class="mt-2 rounded-sm bg-transparent text-xs text-slate-600 underline underline-offset-2 hover:text-slate-900 active:translate-y-px dark:text-slate-300 dark:hover:text-white"
                  onClick={() => progressControls.play()}
                >
                  Play timer
                </button>
                <button
                  class="mt-2 rounded-sm bg-transparent text-xs text-slate-600 underline underline-offset-2 hover:text-slate-900 active:translate-y-px dark:text-slate-300 dark:hover:text-white"
                  onClick={() => progressControls.reset()}
                >
                  Reset timer
                </button>
              </div>
            </div>,
            {
              toasterId: "toaster-1",
              duration: 10000,
            },
          );
        }}
      >
        Show Toast
      </button>
    </div>
  );
}
