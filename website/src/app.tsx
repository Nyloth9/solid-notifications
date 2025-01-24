import "./app.css";
import "@fontsource/inter";

import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { ThemeProvider } from "./util/theme";
import Layout from "./components/Layout";

export default function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Router root={(props) => <Suspense>{props.children}</Suspense>}>
          <FileRoutes />
        </Router>
      </Layout>
    </ThemeProvider>
  );
}
