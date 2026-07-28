import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>

  <AuthProvider>

    <App />

    <ToastContainer
      position="top-right"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      pauseOnFocusLoss={false}
      limit={3}
      theme="colored"
      toastStyle={{
        borderRadius: "14px",
        fontSize: "14px",
        fontWeight: 500,
        boxShadow:
          "0 10px 25px rgba(0,0,0,0.12)",
      }}
    />

  </AuthProvider>

    </BrowserRouter>
  </StrictMode>
);