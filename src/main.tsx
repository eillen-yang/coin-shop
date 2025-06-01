import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
("react-router-dom");
import { router } from "./routes/route.tsx";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
