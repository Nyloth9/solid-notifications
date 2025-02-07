export default function Hero() {
  return (
    <div class="-my-8">
      <div class="hidden w-full max-w-4xl items-center pb-6 md:flex">
        <div>
          <h1 class="block pb-1 text-5xl font-bold text-emerald-600 dark:text-emerald-500">
            Solid Notifications
          </h1>
          <h2 class="block text-2xl font-bold">
            A <span class="text-blue-600 dark:text-blue-500">SolidJS</span>{" "}
            toast Notification Library
          </h2>
        </div>
        <img src="/Tiny.png" alt="Hero" class="ml-auto mr-0 h-72 w-auto" />
      </div>

      <div class="flex w-full max-w-4xl flex-col-reverse pb-14 md:hidden">
        <div>
          <h1 class="block text-4xl font-bold text-emerald-600 dark:text-emerald-500">
            Solid Notifications
          </h1>
          <h2 class="block text-xl font-bold">
            A <span class="text-blue-600 dark:text-blue-500">SolidJS</span>{" "}
            toast Notification Library
          </h2>
        </div>
        <img
          src="/Tiny.png"
          alt="Hero"
          class="mx-auto mb-2 mt-0 h-56 w-auto shrink-0"
        />
      </div>
    </div>
  );
}
