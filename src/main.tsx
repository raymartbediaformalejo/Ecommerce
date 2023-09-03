import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import AllContextProviders from "./contexts/index.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AllContextProviders>
        <App />
      </AllContextProviders>
    </Provider>
  </React.StrictMode>
);
