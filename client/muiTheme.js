import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    h2: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      color: '#FFFFFF',
      fontSize: '5rem',
      lineHeight: '1.15',
    },
    h4: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      color: '#FFFFFF',
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
    text: {
      primary: '#FFFFFF',
    },
  },
  overrides: {
    MuiButton: {
      text: {
        height: 48,
        padding: '0 30px',
        fontFamily: 'Montserrat, sans-serif',
        textTransform: 'none',
      },
    },
  },
});

export default theme;
