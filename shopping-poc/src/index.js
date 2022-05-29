import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./assets/styles/style.scss";

import App from "./App";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.patch["Access-Control-Allow-Methods"] = "*";

axios.interceptors.request.use(
  (reqConfig) => {
    const reqConfiglocal = reqConfig;
    const token = localStorage.getItem("token");
    if (token) {
      reqConfiglocal.headers.Authorization = `${token}`;
    }

    return reqConfiglocal;
  },
  (error) => {
    console.log(error, "global_error");
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
