import React from "react";
import ReactDOM from "react-dom/client";
import App from "./entry/App.tsx";
import "./index.css";
import { AppContextProvider } from "./utils/context/context.tsx";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContextProvider>
  </React.StrictMode>
);
