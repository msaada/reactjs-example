//@flow
import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import registerServiceWorker from "./javascript/registerServiceWorker";

import injectTapEventPlugin from "react-tap-event-plugin";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import orangeA700 from "material-ui/colors/orange";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// const theme = createMuiTheme({
//   palette: createPalette({
//     primary: "#ff7e17",
//     secondary: green
//   })
// });

// const theme = createMuiTheme();

const theme = createMuiTheme({
  palette: {
    primary: orangeA700,
    secondary: orangeA700
  },
  status: {
    danger: "orange"
  }
});
const MuiApp = () => (
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>
);
ReactDOM.render(<MuiApp />, document.getElementById("root"));

registerServiceWorker();
