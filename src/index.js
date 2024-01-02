import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AllDataContext } from "./store/data-context";

import "./assets/scss/style.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <React.StrictMode>
    <AllDataContext.Provider>
    <div className="app">
      <App />
    </div>
    </AllDataContext.Provider>
  </React.StrictMode>
);

reportWebVitals();
