import React, { Component } from 'react';
import './App.css';
import Passbook from './components/passbook/passbook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

import MyBottomNavigation from './components/bottomNavigation';

const store = configureStore();

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <div className="App">
            <Passbook />
            <MyBottomNavigation />
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
