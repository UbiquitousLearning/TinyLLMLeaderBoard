import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createHashRouter, RouterProvider } from "react-router-dom";
import { NewApp } from "./App_new.tsx";
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/slm",
    element: <NewApp />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
