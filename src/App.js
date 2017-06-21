import React, { Component } from 'react';
import './App.css';
import Passbook from './components/passbook/passbook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import MyBottomNavigation from './components/bottomNavigation';

const store = configureStore();

class App extends Component {

    render() {
        return (
            <MuiThemeProvider>
                <Provider store={store}>
                    <div className="App" style={{ minHeight: window.innerHeight }}>
                        <Toolbar className="Toolbar" style={{ justifyContent: 'center', backgroundColor: 'transparent' }}>
                            <ToolbarTitle text="通帳" />
                        </Toolbar>
                        <div style={{ flex: 1, display: 'flex', width: '100%' }}>
                            <Passbook />
                        </div>
                        
                    </div>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
