// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => {
      return (
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta name="description" content="Reactive, customizable toast notifications for SolidJS." />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta
              name="google-site-verification"
              content="9CtUlNXg8Hqy_5fXQOR__oRnvuK2C8ztwdPOu-ATgig"
            />
            <link rel="icon" href="/favicon.ico" />
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
