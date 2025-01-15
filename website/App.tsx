import { createRoot, createSignal, onMount, type Component } from "solid-js";
import { useToast } from "../src/core/Context";

const App: Component = () => {
  const [randomText, setRandomText] = createSignal(
    "This is the first render...",
  );

  const { notify, update, dismiss, remove, getQueue, clearQueue } =
    useToast("toaster-1");

  const { dismiss: globalDismiss } = useToast();

  /*   onMount(() => {
    const interval = setInterval(() => {
      setRandomText(`Random text: ${Math.random().toString(36).substring(7)}`);
    }, 2000);

    return () => clearInterval(interval);
  }); */

  return (
    <div>
      <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold">SolidJS Toast Notification</h1>
        <h2 class="mt-2 text-lg font-medium">
          <span class="mr-2 font-bold text-red-600">{getQueue().length}</span>
          Toasts in the queue
        </h2>
        <div class="flex gap-4">
          <button
            class="mt-4 rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 active:bg-blue-800"
            onClick={() => {
              const { id, progressControls } = notify(
                createRoot(() => (
                  <div>
                    <div>{`Solid Notifications, new toast created!`}</div>
                    {/*   <div class="block italic text-purple-600">
                      {randomText()}
                    </div> */}
                    <div class="-mx-2 flex gap-1">
                      <button
                        class={
                          "mt-2 rounded-sm bg-white px-2 py-1 text-xs text-gray-800 hover:bg-gray-100 active:bg-gray-200"
                        }
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
                  </div>
                )),
                {
                  exitCallback: (reason) =>
                    console.log("Dissmised by user? ", reason),
                  type: "info",
                },
              );

          /*     setTimeout(() => {
                update({ id, type: "warning" });
              }, 3000);

              setTimeout(() => {
                update({ id, type: "error" });
              }, 6000); */
              /*
              setTimeout(() => {
                update({ id, type: "warning" });
              }, 9000);

              setTimeout(() => {
                update({ id, type: "info" });
              }, 12000); */

              /*    setTimeout(() => {
                update({
                  body: (
                    <>
                      Updated body text
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
                    </>
                  ),
                  duration: 3000,
                  id,
                });
              }, 2000); */
            }}
          >
            Create Toast Top Right
          </button>

          <button
            class="mt-4 rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 active:bg-blue-800"
            onClick={() => clearQueue()}
          >
            Clear queue
          </button>
        </div>

        <div class="flex gap-4">
          <button
            class="mt-4 rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 active:bg-blue-800"
            onClick={() => {
              const { id, progressControls } = notify(
                <>
                  <div>{`🍞 Moon Toast, Toast Notification! 🌟`}</div>
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
                </>,
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
              notify(
                (t) => {
                  return createRoot(() => (
                    <div class={t.isPaused ? "bg-red-200" : "bg-green-200"}>
                      <div>🍞 Moon Toast, Toast Regret! 🌟</div>
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
      </div>
    </div>
  );
};

export default App;
