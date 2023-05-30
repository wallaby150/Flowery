import React from "react";
import ReactDOM from "react-dom/client";
import router from "./routes/router";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
);
