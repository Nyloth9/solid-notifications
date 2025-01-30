import { Toaster, useToast } from "this-is-a-test-package-987";

function Toasters() {
  return (
    <div>
      <Toaster toasterId="toaster-1" />
      <Toaster toasterId="toaster-2" limit={3} />
      <Toaster
        toasterId="toaster-3"
        positionY="bottom"
        offsetX={24}
        offsetY={24}
        gutter={16}
      />
      <Toaster toasterId="toaster-4" positionY="bottom" positionX="center" />
      <Toaster toasterId="toaster-5" positionY="top" positionX="left" />
      <Toaster toasterId="toaster-6" reverseToastOrder />
      <Toaster toasterId="toaster-7" positionX="center" />
    </div>
  );
}

function CoreFeatures(props: { feature: string }) {
  const { notify, update, promise, getQueue, dismiss } = useToast();

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
        Create a Toast
      </button>
    );

  if (props.feature === "queue-showcase")
    return (
      <div class="-mt-2 mb-6 flex-wrap pl-3">
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
      <div class="-mt-2 mb-6 pl-3">
        <button
          onClick={() => {
            resetToasters(["toaster-3"], dismiss);
            notify(
              (t) => {
                return (
                  <>
                    <div class="relative overflow-hidden rounded-md bg-white px-4 py-2 text-sm shadow-stripe dark:bg-slate-800 dark:shadow-dark">
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
      <div class="-mt-2 mb-6 flex flex-wrap gap-1.5 pl-3">
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

  if (props.feature === "customizability-showcase") {
    return (
      <div class="-mt-2 mb-6 flex flex-wrap gap-1.5 pl-3">
        <button
          onClick={() => {
            resetToasters(["toaster-6"], dismiss);
            notify(
              (t) => (
                <div
                  id="toast-notification"
                  class="w-[334px] rounded-lg bg-white p-4 pt-2 text-slate-900 shadow-stripe dark:bg-slate-800 dark:text-slate-300"
                  role="alert"
                >
                  <div class="mb-2 flex items-center">
                    <span class="mb-1 text-sm font-semibold text-slate-900 dark:text-white">
                      New notification
                    </span>
                    <button
                      type="button"
                      onClick={() => t.dismiss()}
                      class="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-900 focus:ring-2 focus:ring-slate-300 dark:bg-slate-800 dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-white"
                      data-dismiss-target="#toast-notification"
                      aria-label="Close"
                    >
                      <span class="sr-only">Close</span>
                      <svg
                        class="h-3 w-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                    </button>
                  </div>
                  <div class="flex items-center">
                    <div class="relative inline-block shrink-0">
                      <img
                        class="h-12 w-12 rounded-full"
                        src="https://s3.eu-central-1.amazonaws.com/www.warsawjs.com/static/images/people/ryan-chenkie.jpg"
                        alt="Ryan Chenkie image"
                      />
                      <span class="absolute bottom-0 right-0 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600">
                        <svg
                          class="h-3 w-3 text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 18"
                          fill="currentColor"
                        >
                          <path
                            d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z"
                            fill="currentColor"
                          />
                          <path
                            d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z"
                            fill="currentColor"
                          />
                        </svg>
                        <span class="sr-only">Message icon</span>
                      </span>
                    </div>
                    <div class="ms-3 text-sm font-normal">
                      <div class="text-sm font-semibold text-slate-900 dark:text-white">
                        Ryan Chenkie
                      </div>
                      <div class="text-sm font-normal">
                        commented on your photo
                      </div>
                      <span class="text-xs font-medium text-blue-600 dark:text-blue-500">
                        a few seconds ago
                      </span>
                    </div>
                  </div>
                  <div class="mb-0.5 mt-2 w-full rounded-full bg-slate-200 dark:bg-slate-900">
                    <div
                      class="h-1 w-full rounded-full bg-blue-500 dark:bg-slate-100"
                      data-role="progress"
                      style={{
                        width: `${100 - t.progressManager.progress()}%`,
                      }}
                    />
                  </div>

                  <button class="mt-3 rounded bg-blue-600 px-2 py-0.5 text-xs text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                    View comment
                    <span class="sr-only">View comment</span>
                  </button>
                </div>
              ),
              { toasterId: "toaster-6" },
            );
          }}
          class="inline-flex justify-center gap-0.5 overflow-hidden rounded-full px-3 py-0.5 text-sm font-medium text-slate-700 ring-1 ring-inset ring-slate-900/20 hover:bg-slate-900/2.5 hover:text-slate-900 active:bg-slate-900/5 dark:bg-white/5 dark:text-slate-50 dark:ring-white/10 dark:hover:bg-white/10 dark:hover:text-white"
        >
          Create custom
        </button>
        <button
          onClick={() => {
            resetToasters(["toaster-6"], dismiss);
            const { id } = notify(
              "Supports default, loading, success, error, warning and info types.",
              {
                toasterId: "toaster-6",
                type: "success",
              },
            );

            setTimeout(() => {
              update({ id, type: "error", toasterId: "toaster-6" });
            }, 2000);

            setTimeout(() => {
              update({ id, type: "warning", toasterId: "toaster-6" });
            }, 4000);

            setTimeout(() => {
              update({ id, type: "info", toasterId: "toaster-6" });
            }, 6000);

            setTimeout(() => {
              update({ id, type: "loading", toasterId: "toaster-6" });
            }, 8000);
          }}
          class="inline-flex justify-center gap-0.5 overflow-hidden rounded-full px-3 py-0.5 text-sm font-medium text-slate-700 ring-1 ring-inset ring-slate-900/20 hover:bg-slate-900/2.5 hover:text-slate-900 active:bg-slate-900/5 dark:bg-white/5 dark:text-slate-50 dark:ring-white/10 dark:hover:bg-white/10 dark:hover:text-white"
        >
          Toast types
        </button>

        <button
          onClick={() => {
            resetToasters(["toaster-6"], dismiss);
            const succeedOrFail = new Promise<void>((resolve, reject) => {
              setTimeout(() => {
                Math.random() > 0.5 ? resolve() : reject();
              }, 2000);
            });

            promise(
              succeedOrFail,
              {
                pending: "Processing your request...",
                success: "Request completed successfully!",
                error: "Request failed. Please try again.",
              },
              { toasterId: "toaster-6" },
            );
          }}
          class="inline-flex justify-center gap-0.5 overflow-hidden rounded-full px-3 py-0.5 text-sm font-medium text-slate-700 ring-1 ring-inset ring-slate-900/20 hover:bg-slate-900/2.5 hover:text-slate-900 active:bg-slate-900/5 dark:bg-white/5 dark:text-slate-50 dark:ring-white/10 dark:hover:bg-white/10 dark:hover:text-white"
        >
          Toast promise
        </button>
      </div>
    );
  }

  if (props.feature === "interaction-showcase")
    return (
      <div class="-mt-2 mb-6 flex-wrap pl-3">
        <button
          onClick={() => {
            resetToasters(["toaster-1"], dismiss);
            notify(
              <div class="px-2">
                <div class="mb-3 flex flex-col gap-2">
                  <p>Click the toast body to dismiss it.</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400">
                    If the click target is an interactive element, the toast
                    will not be dismissed.
                  </p>
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  aria-label="Email"
                  class="mb-2 block w-full rounded bg-slate-50 px-3 py-1 text-sm text-slate-900 outline outline-1 -outline-offset-1 outline-slate-400 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-[#182135] dark:text-white dark:outline-slate-500 dark:placeholder:text-slate-400 dark:focus:outline-indigo-700 sm:text-sm/6"
                  placeholder="you@example.com"
                />
              </div>,
              {
                toasterId: "toaster-1",
                dismissOnClick: true,
              },
            );
          }}
          class="inline-flex justify-center gap-0.5 overflow-hidden rounded-full px-3 py-0.5 text-sm font-medium text-slate-700 ring-1 ring-inset ring-slate-900/20 hover:bg-slate-900/2.5 hover:text-slate-900 active:bg-slate-900/5 dark:bg-white/5 dark:text-slate-50 dark:ring-white/10 dark:hover:bg-white/10 dark:hover:text-white"
        >
          Try it out
        </button>
      </div>
    );

  if (props.feature === "timer-showcase")
    return (
      <div class="-mt-2 mb-6 flex-wrap pl-3">
        <button
          onClick={() => {
            resetToasters(["toaster-7"], dismiss);
            const { progressControls } = notify(
              <div>
                <div>
                  Easy to use timer controls to manage the duration of the
                  toast.
                </div>

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
                toasterId: "toaster-7",
                pauseOnHover: false,
                duration: 10000,
                progressBarStyle: { "background-color": "#059669" },
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    class="-mt-1 text-emerald-600"
                  >
                    <path
                      fill="currentColor"
                      d="M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10C6.47 22 2 17.5 2 12A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7z"
                    />
                  </svg>
                ),
              },
            );
          }}
          class="inline-flex justify-center gap-0.5 overflow-hidden rounded-full px-3 py-0.5 text-sm font-medium text-slate-700 ring-1 ring-inset ring-slate-900/20 hover:bg-slate-900/2.5 hover:text-slate-900 active:bg-slate-900/5 dark:bg-white/5 dark:text-slate-50 dark:ring-white/10 dark:hover:bg-white/10 dark:hover:text-white"
        >
          Timer management
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
