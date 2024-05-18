import React from "react";
import { createRoot } from "react-dom/client";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./theme";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

createRoot(document.getElementById("root")).render(
  <MuiThemeProvider theme={theme}>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </MuiThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
