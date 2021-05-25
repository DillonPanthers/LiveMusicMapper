import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  shadows: ['none'],
  typography: {
    h1: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      color: 'white',
    },
    h4: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      color: 'white',
    },
    body: {
      fontFamily: 'Roboto, sans-serif',
    },
  },
  palette: {
    primary: {
      main: '#1DE9B6',
    },
    secondary: {
      main: '#5F285A',
    },
    background: {
      default: '#000A47',
    },
  },
  overrides: {
    MuiButton: {
      text: {
        color: 'white',
        height: 48,
        padding: '0 30px',
        fontFamily: 'Montserrat, sans-serif',
        textTransform: 'none',
      },
    },
  },
});

export default theme;
