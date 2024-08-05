import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./style/adminStyle.css";
import "./style/teacherStyle.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
