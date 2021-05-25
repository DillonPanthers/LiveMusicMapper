import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './muiTheme';

import Main from './Components/Main';

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Main />
  </MuiThemeProvider>,
  document.getElementById('root')
);
