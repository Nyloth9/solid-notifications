import type { APIEvent } from "@solidjs/start/server";

export async function GET({ request }: APIEvent) {
  const baseUrl = "https://solid-notifications.vercel.app";

  const pages = [
    "",
    "introduction",
    "core-features",
    "quickstart",
    "installation",
    "usage",
    "components",
    "components/toast-provider",
    "components/toaster",
    "components/toast",
    "components/props",
    "components/toaster-config",
    "components/toast-config",
    "components/other-config",
    "actions",
    "actions/use-toast",
    "actions/notify",
    "actions/update",
    "actions/dismiss",
    "actions/remove",
    "actions/promise",
    "actions/get-queue",
    "actions/clear-queue",
    "guides",
    "guides/styling",
    "guides/custom-toast",
    "guides/custom-progress-bar",
    "guides/show-queue",
    "guides/track-dismissal-reasons",
    "guides/promise-api",
    "guides/pause-timer-on-window-blur",
    "guides/no-toasts-when-window-not-focused",
    "guides/drag-to-dismiss",
    "guides/custom-dismiss-button",
    "guides/play-pause-notification-timer",
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map(
            (page) => `
            <url>
                <loc>${baseUrl}/${page}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <priority>${page === "" ? "1.0" : "0.8"}</priority>
            </url>
            `,
          )
          .join("")}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
