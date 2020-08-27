import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import MobilePage from "./pages/mobile.tsx";
import MobileDetect from "mobile-detect";

const md = new MobileDetect(window.navigator.userAgent);

const root = document.getElementById("app");

if (md.mobile()) {
  ReactDOM.render(<MobilePage />, root);
} else {
  ReactDOM.render(<App />, root);
}
