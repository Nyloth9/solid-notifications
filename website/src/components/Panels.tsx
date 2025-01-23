import { Toaster, useToast } from "~/notifications";

function IntroPanels() {
  const { notify } = useToast();

  const queueManagement = (
    <div class="-mt-2 mb-6 pl-3 not-prose">
      <Toaster toasterId="toaster-2" limit={1} />
      <button
        onClick={() => {
          notify("This is a toast message!", { toasterId: "toaster-2" });
        }}
        class="inline-flex justify-center gap-0.5 overflow-hidden rounded-full px-3 py-0.5 text-sm font-medium text-slate-700 ring-1 ring-inset ring-slate-900/20 transition hover:bg-slate-900/2.5 hover:text-slate-900 dark:text-slate-400 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-white"
      >
        Create Toast
      </button>
      <p class="ml-3 inline text-emerald-500">Queued Toasts: 0</p>
    </div>
  );

  return {
    queueManagement,
  };
}

export default IntroPanels;
