import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "@fontsource/inter";
import "./app.css";
import { ThemeProvider } from "./components/theme";
import Layout from "./components/Layout";

export default function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Router
          root={(props) => {
            return (
              <div class="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8">
                <main class="w-full flex-auto text-left">
                  <div class="prose dark:prose-invert [html_:where(&>*)]:mx-auto [html_:where(&>*)]:max-w-2xl [html_:where(&>*)]:lg:mx-[calc(50%-min(50%,theme(maxWidth.lg)))] [html_:where(&>*)]:lg:max-w-3xl">
                    <article class="pb-10 pt-10">
                      <Suspense>{props.children}</Suspense>
                    </article>
                  </div>
                </main>
              </div>
            );
          }}
        >
          <FileRoutes />
        </Router>
      </Layout>
    </ThemeProvider>
  );
}
