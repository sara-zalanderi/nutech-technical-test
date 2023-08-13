import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import "semantic-ui-css/semantic.min.css";
import configureStore from "./redux/store";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <App />
    </Provider>
  </React.StrictMode>
);
