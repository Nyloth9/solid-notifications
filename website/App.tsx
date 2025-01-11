import { createRoot, createSignal, onMount, type Component } from "solid-js";
import { useToast } from "../src/core/Context";

const App: Component = () => {
  const [randomText, setRandomText] = createSignal(
    "This is the first render...",
  );

  const { notify, update, dismiss, remove, getQueue, clearQueue } =
    useToast("toaster-2");

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
          {/*   <span class="mr-2 font-bold text-red-600">{getQueue().length}</span> */}
          Toasts in the queue
        </h2>
        <div class="flex gap-4">
          <button
            class="mt-4 rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 active:bg-blue-800"
            onClick={() => {
              const { id, progressControls } = notify(
                createRoot(() => (
                  <>
                    <div>🍞 Moon Toast, Toast Notification! 🌟</div>
                    <div class="block italic text-purple-600">
                      {randomText()}
                    </div>
                    <div class="flex gap-1">
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
                  </>
                )),
                {
                  duration: 5000,
                  exitCallback: (reason) => console.log(reason),
                },
              );

              /*       setTimeout(() => {
                update({
                  body: (
                    <>
                      Updated body text
                      <div class="flex gap-1">
                        <button
                          class="mt-2 rounded-sm bg-white px-2 py-1 text-xs text-gray-800 hover:bg-gray-100 active:bg-gray-200"
                          onClick={() => timer.pause()}
                        >
                          Pause timer
                        </button>
                        <button
                          class="mt-2 rounded-sm bg-white px-2 py-1 text-xs text-gray-800 hover:bg-gray-100 active:bg-gray-200"
                          onClick={() => timer.play()}
                        >
                          Play timer
                        </button>
                        <button
                          class="mt-2 rounded-sm bg-white px-2 py-1 text-xs text-gray-800 hover:bg-gray-100 active:bg-gray-200"
                          onClick={() => timer.reset()}
                        >
                          Reset timer
                        </button>
                      </div>
                    </>
                  ),
                  duration: 2000,
                  id,
                });
              }, 2000); */
            }}
          >
            Create Toast Top Right
          </button>

          <button
            class="mt-4 rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 active:bg-blue-800"
            /*  onClick={() => clearQueue()} */
          >
            Clear queue
          </button>
        </div>

        <button
          class="mt-4 rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 active:bg-blue-800"
          onClick={() => {
            const { id, progressControls } = notify(
              <>
                <div>🍞 Moon Toast, Toast Notification! 🌟</div>
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
              { toasterId: "toaster-3" },
            );
          }}
        >
          Create Toast Top Right
        </button>
      </div>
    </div>
  );
};

export default App;
