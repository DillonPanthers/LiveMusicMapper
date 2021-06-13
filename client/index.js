import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './muiTheme';

import Store from './contexts/Store';

import Main from './Components/Main';

import { SocketProvider } from './contexts/SocketContext';

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Store>
            <SocketProvider>
                <Main />
            </SocketProvider>
        </Store>
    </MuiThemeProvider>,
    document.getElementById('root')
);
