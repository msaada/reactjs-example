import 'babel-polyfill';
import orangeA700 from '@material-ui/core/colors/orange';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import App from './components/App';
import registerServiceWorker from './javascript/registerServiceWorker';

ReactGA.initialize('UA-111415811-1');

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 9,
  },
  palette: {
    primary: orangeA700,
    secondary: orangeA700,
  },
  status: {
    danger: 'orange',
  },
});
const MuiApp = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  );
};
// $FlowFixMe
ReactDOM.render(<MuiApp />, document.getElementById('root'));

registerServiceWorker();
