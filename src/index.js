import React from 'react';
import ReactDOM from 'react-dom';

import './css/index.css';
import App from './App';
import Home from './Home'
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const config = {
  apiKey: "AIzaSyCVHvfzWzV5p2G8VkXW7k_3ALHLuS_m-WQ",
  authDomain: "ohmyart-ee13a.firebaseapp.com",
  databaseURL: "https://ohmyart-ee13a.firebaseio.com",
  storageBucket: "ohmyart-ee13a.appspot.com",
  messagingSenderId: "564094140683"
};

firebase.initializeApp(config);
const MuiApp = () => (
    <MuiThemeProvider>
      <App/>
    </MuiThemeProvider>
);
// const Main = () => (
//   <main>
//     <Switch>
//       <Route exact path='/' component={Home}/>
//       <Route path='/app' component={App}/>
//     </Switch>
//   </main>
// )
ReactDOM.render(
  <MuiApp/>, document.getElementById('root'));

registerServiceWorker();
