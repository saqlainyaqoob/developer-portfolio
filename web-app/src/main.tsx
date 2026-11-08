import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// @ts-ignore CSS is loaded by the bundler; TypeScript has no declaration for it.
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
