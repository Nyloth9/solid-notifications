import { onMount } from "solid-js";
import { useToast } from "../../src/core/Context";

export default function Showcase() {
  const { notify } = useToast("toaster-3");
  const { notify: notifyLeft } = useToast("toaster-4");

  const interval = 12000;

  const showNotifications = () => {
    notify(
      <div>
        <span class="font-semibold text-green-600">Success!</span> Your file has
        been uploaded.
      </div>,
      {
        type: "success",
      },
    );

    notify(
      () => {
        return (
          <div class="flex items-center gap-3 border border-blue-300 bg-blue-50 p-4 shadow-lg">
            <div>
              <span class="font-semibold">Heads up!</span> You have a new
              message.
            </div>
            <div>
              <button
                onClick={() => {
                  alert("Message clicked!");
                }}
                class="btn btn-sm btn-blue"
              >
                Read
              </button>
            </div>
          </div>
        );
      },
      {
        type: "info",
      },
    );

    notify(
      () => (
        <div class="animate-slide-in rounded border border-green-500 bg-gray-900 p-3 font-mono text-sm text-green-400 shadow-md">
          ✅ [INFO] File uploaded successfully.
        </div>
      ),
      { type: "info" },
    );

    notify(
      () => (
        <div class="relative max-w-xs rounded-lg border border-gray-300 bg-white p-3 shadow-md">
          <span class="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 text-xs text-white">
            New
          </span>
          <div class="text-sm text-gray-800">
            You have a new message from Ryan.
          </div>
        </div>
      ),
      { type: "info" },
    );

    notify(
      () => (
        <div class="animate-fade-in flex items-center gap-3 rounded-lg border-l-4 border-yellow-500 bg-gray-900 p-4 text-white shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="h-6 w-6 text-yellow-400"
          >
            <path
              fill="currentColor"
              d="M7 21v-2h4v-3.1q-1.225-.275-2.187-1.037T7.4 12.95q-1.875-.225-3.137-1.637T3 8V7q0-.825.588-1.412T5 5h2V3h10v2h2q.825 0 1.413.588T21 7v1q0 1.9-1.263 3.313T16.6 12.95q-.45 1.15-1.412 1.913T13 15.9V19h4v2zm0-10.2V7H5v1q0 .95.55 1.713T7 10.8m10 0q.9-.325 1.45-1.088T19 8V7h-2z"
            />
          </svg>
          <div>
            <div class="font-semibold">Achievement Unlocked!</div>
            <div class="text-sm text-gray-300">"Master of Toasters"</div>
          </div>
        </div>
      ),
      { type: "success" },
    );

    notify(() => (
      <div class="relative animate-pulse rounded-lg border border-purple-400 bg-purple-900 p-4 text-white shadow-lg">
        <span class="absolute -right-2 -top-2 rounded-full bg-purple-500 px-2 text-xs text-white">
          +10 XP
        </span>
        <div class="font-semibold">Enchantment Applied!</div>
        <div class="text-sm text-purple-200">You have activated Dark Mode.</div>
      </div>
    ));

    notify((t) => (
      <div
        id="toast-notification"
        class="shadow-stripe w-[334px] rounded-lg bg-white p-4 pt-2 text-slate-900 dark:bg-slate-800 dark:text-slate-300"
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
            <div class="text-sm font-normal">commented on your photo</div>
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
    ));

    notifyLeft(
      <div>
        <div class="font-semibold">Notification</div>
        <div class="text-sm text-gray-300">You have a new friend request.</div>
      </div>,

      { type: "info", theme: "dark" },
    );

    notifyLeft(() => (
      <div class="flex items-center gap-4 rounded-lg border border-gray-300 bg-white p-4 text-gray-900 shadow-lg">
        <div class="h-14 w-14 shrink-0 overflow-hidden rounded-full">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User"
            class="h-full w-full object-cover"
          />
        </div>
        <div>
          <div class="font-semibold">John Doe</div>
          <div class="text-sm">
            You have a new message! Please check your inbox.
          </div>
        </div>
      </div>
    ));

    notifyLeft(
      () => (
        <div class="flex items-center justify-between gap-2 rounded-md border border-blue-400 bg-blue-100 p-4 text-blue-800 shadow-md">
          <div>
            <div class="font-semibold">New Message</div>
            <div class="text-sm">New message from John.</div>
          </div>
          <button class="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600">
            Open
          </button>
        </div>
      ),
      { type: "info" },
    );

    notifyLeft(
      () => (
        <div class="flex items-center gap-3 rounded-lg border border-gray-700 bg-gradient-to-r from-blue-600 via-indigo-800 to-gray-900 p-4 text-white shadow-lg">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white bg-opacity-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64z"
              />
            </svg>
          </div>
          <div>
            <div class="text-base font-semibold">New Notification</div>
            <div class="text-sm text-gray-300">
              You have a system update available.
            </div>
          </div>
        </div>
      ),
      { type: "info" },
    );

    notifyLeft(() => (
      <div class="flex items-center gap-3 rounded-md border border-red-400 bg-red-100 p-4 text-red-800 shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          class="h-6 w-6 text-red-600"
        >
          <path
            fill="currentColor"
            d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07M11.4 10l2.83-2.83l-1.41-1.41L10 8.59L7.17 5.76L5.76 7.17L8.59 10l-2.83 2.83l1.41 1.41L10 11.41l2.83 2.83l1.41-1.41L11.41 10z"
          />
        </svg>
        <div>
          <div class="font-semibold">Error</div>
          <div class="text-sm">
            Oops! Something went wrong. Please try again.
          </div>
        </div>
      </div>
    ));

    notifyLeft(
      <div>
        <div class="font-semibold">Notification</div>
        <div class="text-sm">You have a new message in your inbox.</div>
      </div>,
      { type: "info" },
    );
  };

  onMount(() => {
    setTimeout(showNotifications, 1000);
    setInterval(showNotifications, interval);
  });

  return <div></div>;
}
