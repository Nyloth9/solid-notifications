export default function Hero() {
  return (
    <div class="-mt-8">
      <div class="w-full max-w-4xl items-center pb-6">
        <img src="/2.jpg" alt="Hero" class="w-fučč ml-auto" />
        <div class="py-8">
          <h1 class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14"
              class="h-8 w-8 fill-blue-500 lg:h-11 lg:w-11"
            >
              <g>
                <path d="M9.5 4.5A2.5 2.5 0 0 0 7 2H2.5A2.5 2.5 0 0 0 1 6.5v5a1 1 0 0 0 1 1h5.5a1 1 0 0 0 1-1v-5a2.49 2.49 0 0 0 1-2" />
                <path
                  fill-rule="evenodd"
                  d="M10.695 2.97a3.99 3.99 0 0 1-.226 3.525H13l.008-.001A2.49 2.49 0 0 0 14 4.5A2.5 2.5 0 0 0 11.5 2h-1.377c.235.294.428.62.572.97M13 7.743h-3V11.5a2.5 2.5 0 0 1-.209 1H12a1 1 0 0 0 1-1z"
                  clip-rule="evenodd"
                />
              </g>
            </svg>

            <span class="-mb-1 text-2xl font-bold text-slate-900 dark:text-white lg:text-4xl">
              Solid Notifications
            </span>
          </h1>

          <h2 class="block text-lg font-medium text-slate-800 dark:text-slate-300">
            A <span class="font-bold text-emerald-600">SolidJS</span> toast
            Notification Library
          </h2>
        </div>
      </div>
    </div>
  );
}
