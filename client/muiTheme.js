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
        h3: {
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 'bold',
            color: '#FFFFFF',
        },
        h4: {
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 'bold',
            color: '#FFFFFF',
        },
        h5: {
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 'bold',
            color: '#FFFFFF',
        },
        h6: {
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 'bold',
            color: '#FFFFFF',
            lineHeight: '1.15',
        },
        caption: {
            fontSize: '0.75rem',
        },
    },
    palette: {
        primary: {
            main: '#1DE9B6', // teal
        },
        secondary: {
            main: '#5F285A', // purple
        },
        accent: {
            main: '#FF5000', // orange
        },
        background: {
            default: '#000A47', //
            light: '#382B71', // light purple background
        },
        text: {
            primary: '#FFFFFF', // white
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
