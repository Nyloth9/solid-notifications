// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => {
      return (
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta
              name="description"
              content="Reactive, customizable toast notifications for SolidJS."
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
            />
            <link rel="manifest" href="/site.webmanifest" />
            <meta
              name="google-site-verification"
              content="9CtUlNXg8Hqy_5fXQOR__oRnvuK2C8ztwdPOu-ATgig"
            />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      );
    }}
  />
));
