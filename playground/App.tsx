import {
  Accessor,
  createRoot,
  createSignal,
  onMount,
  Setter,
  type Component,
} from "solid-js";
import { useToast } from "../src/core/Context";

interface Props {
  theme: Accessor<string>;
  setTheme: Setter<string>;
}

const App: Component<Props> = (props: Props) => {
  const [randomText, setRandomText] = createSignal("Hello World!");
  const { notify, update, dismiss, remove, promise, getQueue, clearQueue } =
    useToast("toaster-1");

  const { dismiss: globalDismiss } = useToast();

  onMount(() => {
    const interval = setInterval(() => {
      setRandomText(
        Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15),
      );
    }, 1000);

    return () => clearInterval(interval);
  });

  function someAsyncFunction(shouldFail = false): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          reject("Something went wrong!");
        } else {
          resolve("Done");
        }
      }, 4000);
    });
  }

  return (
    <div>
      <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold text-black dark:text-white">
          SolidJS Toast Notification
        </h1>
        <h2 class="mt-2 text-lg font-medium text-gray-700 dark:text-gray-300">
          <span class="mr-2 font-bold text-red-600">{getQueue().length}</span>
          Toasts in the queue
        </h2>
        <div class="flex flex-wrap gap-4">
          <button
            class="mt-4 rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 active:bg-blue-800"
            onClick={() => {
              const { id, progressControls } = notify(
                createRoot(() => (
                  <div>
                    <div>{`Solid Notifications, new toast created!`}</div>
                  </div>
                )),
                {
                  exitCallback: (reason) =>
                    console.log("Dissmised by user? ", reason),

                  duration: 10000,
                  type: "success",
                  progressBarStyle: ({ type }) => {
                    switch (type) {
                      case "success":
                        return { "background-color": "red" };
                      case "error":
                        return { "background-color": "red" };
                      case "warning":
                        return { "background-color": "purple" };
                      case "info":
                        return { "background-color": "blue" };
                      case "loading":
                        return { "background-color": "#374151" };
                      default:
                        return { "background-color": "gray" };
                    }
                  },
                },
              );

              setTimeout(() => {
                update({ id, type: "warning" });
              }, 2000);

              setTimeout(() => {
                update({
                  id,
                  type: "error",
                  content:
                    "Error! Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                });
              }, 4000);

              setTimeout(() => {
                update({ id, type: "info", content: <div>Info!</div> });
              }, 6000);

              setTimeout(() => {
                update({
                  id,
                  type: "loading",
                  wrapperClass: "sn-toast-wrapper",
                });
              }, 8000);
            }}
          >
            Create Toast Top Right
          </button>

          <button
            onClick={() => notify()}
            class="mt-4 rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 active:bg-blue-800"
          >
            Create default toast
          </button>

          <button
            class="mt-4 rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 active:bg-blue-800"
            onClick={() => clearQueue()}
          >
            Clear queue
          </button>
        </div>

        <div class="flex flex-wrap gap-4">
          <button
            class="mt-4 rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 active:bg-blue-800"
            onClick={() => {
              const { id, progressControls } = notify(
                <div>
                  <div>{`🍞 New toast ready to serve! 🌟`}</div>
                  <div class="flex gap-1">
                    <button
                      class="mt-2 rounded-sm bg-white px-2 py-1 text-xs text-gray-800 hover:bg-gray-100 active:bg-gray-200"
                      onClick={() => progressControls.pause()}
                    >
                      Pause timer
                    </button>
                    <button
                      class="mt-2 rounded-sm bg-white px-2 py-1 text-xs text-gray-800 hover:bg-gray-100 active:bg-gray-200"
                      onClick={() => progressControls.play()}
                    >
                      Play timer
                    </button>
                    <button
                      class="mt-2 rounded-sm bg-white px-2 py-1 text-xs text-gray-800 hover:bg-gray-100 active:bg-gray-200"
                      onClick={() => progressControls.reset()}
                    >
                      Reset timer
                    </button>
                  </div>
                </div>,
                { toasterId: "toaster-2" },
              );

              /*        setTimeout(() => {
                globalDismiss({ id, toasterId: "toaster-2" });
              }, 2000); */
            }}
          >
            Create Toast Bottom Right
          </button>

          <button
            class="mt-4 rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 active:bg-blue-800"
            onClick={() => {
              const { id, progressControls } = notify(
                <div>
                  <div>{`🍞 New toast ready to serve! 🌟`}</div>
                  <div class="flex gap-1">
                    <button
                      class="mt-2 rounded-sm bg-white px-2 py-1 text-xs text-gray-800 hover:bg-gray-100 active:bg-gray-200"
                      onClick={() => progressControls.pause()}
                    >
                      Pause timer
                    </button>
                    <button
                      class="mt-2 rounded-sm bg-white px-2 py-1 text-xs text-gray-800 hover:bg-gray-100 active:bg-gray-200"
                      onClick={() => progressControls.play()}
                    >
                      Play timer
                    </button>
                    <button
                      class="mt-2 rounded-sm bg-white px-2 py-1 text-xs text-gray-800 hover:bg-gray-100 active:bg-gray-200"
                      onClick={() => progressControls.reset()}
                    >
                      Reset timer
                    </button>
                  </div>
                </div>,
                { toasterId: "toaster-4" },
              );
            }}
          >
            Create Toast Top Left
          </button>

          <button
            class="mt-4 rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 active:bg-blue-800"
            onClick={() => {
              const { id, progressControls } = notify(
                <div>
                  <div>{`🍞 New toast ready to serve! 🌟`}</div>
                  <div class="flex gap-1">
                    <button
                      class="mt-2 rounded-sm bg-white px-2 py-1 text-xs text-gray-800 hover:bg-gray-100 active:bg-gray-200"
                      onClick={() => progressControls.pause()}
                    >
                      Pause timer
                    </button>
                    <button
                      class="mt-2 rounded-sm bg-white px-2 py-1 text-xs text-gray-800 hover:bg-gray-100 active:bg-gray-200"
                      onClick={() => progressControls.play()}
                    >
                      Play timer
                    </button>
                    <button
                      class="mt-2 rounded-sm bg-white px-2 py-1 text-xs text-gray-800 hover:bg-gray-100 active:bg-gray-200"
                      onClick={() => progressControls.reset()}
                    >
                      Reset timer
                    </button>
                  </div>
                </div>,
                { toasterId: "toaster-5" },
              );
            }}
          >
            Create Toast Top Center
          </button>

          <button
            class="mt-4 rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 active:bg-blue-800"
            onClick={() => {
              const { id, progressControls } = notify(
                <div>
                  <div>{`🍞 New toast ready to serve! 🌟`}</div>
                  <div class="flex gap-1">
                    <button
                      class="mt-2 rounded-sm bg-white px-2 py-1 text-xs text-gray-800 hover:bg-gray-100 active:bg-gray-200"
                      onClick={() => progressControls.pause()}
                    >
                      Pause timer
                    </button>
                    <button
                      class="mt-2 rounded-sm bg-white px-2 py-1 text-xs text-gray-800 hover:bg-gray-100 active:bg-gray-200"
                      onClick={() => progressControls.play()}
                    >
                      Play timer
                    </button>
                    <button
                      class="mt-2 rounded-sm bg-white px-2 py-1 text-xs text-gray-800 hover:bg-gray-100 active:bg-gray-200"
                      onClick={() => progressControls.reset()}
                    >
                      Reset timer
                    </button>
                  </div>
                </div>,
                { toasterId: "toaster-6", duration: false },
              );
            }}
          >
            Create Toast Bottom Center
          </button>

          <button
            class="mt-4 rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 active:bg-blue-800"
            onClick={() => {
              notify(
                (t) => {
                  return createRoot(() => (
                    <div class={t.isPaused ? "bg-red-200" : "bg-green-200"}>
                      <div>🍞 New toast ready to serve! 🌟</div>
                      <p>ID: {t.toastConfig.id}</p>
                      <p>Offset: {t.offset}</p>
                      <p>Progress: {t.progressManager.progress()} %</p>
                      <p>{t.state}</p>
                    </div>
                  ));
                },
                { duration: 10000 },
              );
            }}
          >
            Create Custom Toast
          </button>
        </div>
        <div class="flex gap-4">
          <button
            class="mt-4 rounded bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700 active:bg-red-800"
            onClick={() => {
              dismiss({ keepQueued: true });
            }}
          >
            Dismiss on toaster-1
          </button>

          <button
            class="mt-4 rounded bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700 active:bg-red-800"
            onClick={() => {
              globalDismiss({ keepQueued: true });
            }}
          >
            Dismiss global
          </button>
        </div>
        <button
          class="mt-4 rounded bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-700 active:bg-indigo-800"
          onClick={() => {
            const x = promise(
              someAsyncFunction(true),
              {
                pending: "Pending...",
                success: (data) => `Success! ${data}`,
                error: (error) => `Error! ${error}`,
              },
              {
                theme: "light",
              },
            );

            console.log(x);
          }}
        >
          Promise
        </button>
      </div>

      <div class="container mx-auto -mt-4 px-4">
        <button
          class="mt-4 rounded bg-slate-700 px-4 py-2 font-bold text-white hover:bg-slate-800 active:bg-slate-900"
          onClick={() =>
            props.setTheme(props.theme() === "light" ? "dark" : "light")
          }
        >
          Change theme
        </button>
        <span class="ml-2 text-gray-700 dark:text-gray-300">
          Current theme:{" "}
          <span class="font-medium uppercase">{props.theme()}</span>
        </span>
      </div>
    </div>
  );
};

export default App;
