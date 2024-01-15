import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import { queryClient } from "./queryClient";
import { persistor, store } from "@/redux/store";
import { router } from "./router";

import "@fontsource-variable/inter";
import "./assets/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} contextSharing>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
