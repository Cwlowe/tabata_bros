import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//components
import Navbar from './components/navbar'
import App from './App';
import CircuitGenerator from './components/CreateWorkout'
import TabataGenerator from './components/TabataGeneratorPage'

//redux store
import store from './store'
import {Provider} from 'react-redux'
// routers
import { BrowserRouter as Router, Route} from 'react-router-dom';

//Material ui
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './UI_theme'
//utils
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
    <Navbar />
    <Router>
      <Route exact path="/" component={App}/>
      <Route path="/circuitGenerator" component={CircuitGenerator}/>
      <Route path="/tabataGenerator" component={TabataGenerator}/>
    </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
