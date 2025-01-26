import "@fontsource/inter";
import "./app.css";

import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { ThemeProvider } from "./util/theme";
import Layout from "./components/Layout";
import { MetaProvider, Link } from "@solidjs/meta";

export default function App() {
  return (
    <MetaProvider>
      <ThemeProvider>
        <Link rel="icon" href="/favicon.svg" />
        <Link rel="mask-icon" href="/favicon.svg" color="#3b82f6" />
        <Router
          root={(props) => (
            <Layout>
              <Suspense>{props.children}</Suspense>
            </Layout>
          )}
        >
          <FileRoutes />
        </Router>
      </ThemeProvider>
    </MetaProvider>
  );
}
