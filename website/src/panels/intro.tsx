import { Toaster, useToast } from "~/notifications";

function Toasters() {
  return (
    <div>
      <Toaster toasterId="toaster-1" />
      <Toaster toasterId="toaster-2" limit={3} />
      <Toaster toasterId="toaster-3" positionY="bottom" />
      <Toaster toasterId="toaster-4" positionY="bottom" positionX="center" />
      <Toaster toasterId="toaster-5" positionY="top" positionX="left" />
    </div>
  );
}

function CoreFeatures(props: { feature: string }) {
  const { notify, getQueue, dismiss } = useToast();

  if (props.feature === "intro-button")
    return (
      <button
        type="button"
        onClick={() => {
          resetToasters(["toaster-1"], dismiss);
          notify("🚀 New toast ready to serve!", {
            toasterId: "toaster-1",
          });
        }}
        class="not-prose inline-flex items-center justify-center gap-1.5 overflow-hidden rounded bg-blue-500 px-3 py-1.5 text-sm font-medium text-white shadow-flat transition-colors hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800"
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
        Create a Toast
      </button>
    );

  if (props.feature === "queue-showcase")
    return (
      <div class="not-prose -mt-2 mb-6 pl-3">
        <button
          onClick={() => {
            resetToasters(["toaster-2"], dismiss);
            notify("Create more than three toasts to see the effect.", {
              toasterId: "toaster-2",
            });
          }}
          class="inline-flex justify-center gap-0.5 overflow-hidden rounded-full px-3 py-0.5 text-sm font-medium text-slate-700 ring-1 ring-inset ring-slate-900/20 hover:bg-slate-900/2.5 hover:text-slate-900 active:bg-slate-900/5 dark:bg-white/5 dark:text-slate-50 dark:ring-white/10 dark:hover:bg-white/10 dark:hover:text-white"
        >
          Try it out
        </button>
        <p class="ml-3 inline text-emerald-500">
          Queued Toasts: {getQueue("toaster-2").length}
        </p>
      </div>
    );

  if (props.feature === "progress-showcase")
    return (
      <div class="not-prose -mt-2 mb-6 pl-3">
        <button
          onClick={() => {
            resetToasters(["toaster-3"], dismiss);
            notify(
              (t) => {
                return (
                  <>
                    <div class="not-prose relative overflow-hidden rounded-md bg-white px-4 py-2 text-xs shadow-stripe dark:bg-slate-800 dark:shadow-dark">
                      Hook into the progress() signal to update the progress bar
                      width or other properties.
                      <p class="text-xs font-medium text-emerald-600 dark:text-emerald-200">
                        Current progress:{" "}
                        {Math.round(t.progressManager.progress())}
                      </p>
                      <div
                        class="absolute left-0 top-0 h-full bg-blue-600/10"
                        style={{
                          width: `${t.progressManager.progress()}%`,
                        }}
                      />
                    </div>
                    <button
                      onClick={() => t.dismiss()}
                      class="absolute -right-1 -top-1 h-4 w-4 rounded-full border border-slate-200 bg-white hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
                    >
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="100%"
                        height="100%"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2.5"
                          d="m7 7l10 10M7 17L17 7"
                        />
                      </svg>
                    </button>
                  </>
                );
              },
              {
                toasterId: "toaster-3",
              },
            );
          }}
          class="inline-flex justify-center gap-0.5 overflow-hidden rounded-full px-3 py-0.5 text-sm font-medium text-slate-700 ring-1 ring-inset ring-slate-900/20 hover:bg-slate-900/2.5 hover:text-slate-900 active:bg-slate-900/5 dark:bg-white/5 dark:text-slate-50 dark:ring-white/10 dark:hover:bg-white/10 dark:hover:text-white"
        >
          Custom progress bar
        </button>
      </div>
    );

  if (props.feature === "multiple-toasters-showcase")
    return (
      <div class="not-prose -mt-2 mb-6 flex gap-1.5 pl-3">
        <button
          onClick={() => {
            resetToasters(["toaster-4", "toaster-5"], dismiss);
            notify("🎉 Bottom-center toaster activated!", {
              toasterId: "toaster-4",
            });
          }}
          class="inline-flex justify-center gap-0.5 overflow-hidden rounded-full px-3 py-0.5 text-sm font-medium text-slate-700 ring-1 ring-inset ring-slate-900/20 hover:bg-slate-900/2.5 hover:text-slate-900 active:bg-slate-900/5 dark:bg-white/5 dark:text-slate-50 dark:ring-white/10 dark:hover:bg-white/10 dark:hover:text-white"
        >
          Create bottom center
        </button>

        <button
          onClick={() => {
            resetToasters(["toaster-4", "toaster-5"], dismiss);
            notify("✨ Top-left toaster activated!", {
              toasterId: "toaster-5",
              theme: "dark",
              style: {
                background: `linear-gradient(
                  120deg,
                  #1e3a8a, 
                  #111827,  
                  #4b5563   
                )`,
                "background-size": `300% 300%`,
                animation: `dark-gradient-animation 5s ease infinite`,
              },
            });
          }}
          class="inline-flex justify-center gap-0.5 overflow-hidden rounded-full px-3 py-0.5 text-sm font-medium text-slate-700 ring-1 ring-inset ring-slate-900/20 hover:bg-slate-900/2.5 hover:text-slate-900 active:bg-slate-900/5 dark:bg-white/5 dark:text-slate-50 dark:ring-white/10 dark:hover:bg-white/10 dark:hover:text-white"
        >
          Create top left
        </button>
      </div>
    );

  return <div class="text-red-600">Feature not found</div>;
}

export { Toasters, CoreFeatures };

const resetToasters = (excludeToasterIds: string[], dismiss: any) => {
  if (typeof document === "undefined") return;

  const allToasters = document.querySelectorAll(".sn-toaster");
  allToasters.forEach((toaster) => {
    if (!excludeToasterIds.includes(toaster.id)) {
      dismiss({ toasterId: toaster.id });
    }
  });
};
