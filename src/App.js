import React, { Component } from 'react';
import './App.css';
import Passbook from './components/passbook/passbook';
import Home from './components/home/home';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import MyBottomNavigation from './components/bottomNavigation';

import { getWithdrawals } from './local';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store = configureStore();

class App extends Component {

    render() {
        return (
            <MuiThemeProvider>
                <Provider store={store}>
                    <Router>
                        <div className="App" style={{ minHeight: window.innerHeight }}>
                            <div style={{ flex: 1, display: 'flex', width: '100%' }}>

                                <Route exact path="/" component={Passbook} />
                                <Route path="/home" component={Home} />

                            </div>
                        </div>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
