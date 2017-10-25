//@flow
import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import registerServiceWorker from "./javascript/registerServiceWorker";

import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const MuiApp = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);
ReactDOM.render(<MuiApp />, document.getElementById("root"));

registerServiceWorker();
