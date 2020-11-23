import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { SnackbarProvider } from "notistack";
import WarningIcon from "@material-ui/icons/Warning";
import InfoIcon from "@material-ui/icons/Info";
import DoneIcon from "@material-ui/icons/Done";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

ReactDOM.render(
  <SnackbarProvider
    maxSnack={3}
    iconVariant={{
      success: <DoneIcon />,
      error: <HighlightOffIcon />,
      warning: <WarningIcon />,
      info: <InfoIcon />,
    }}
  >
    <App />
  </SnackbarProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
