import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const OutlinedButton = styled(Button)({
    height: 48,
    padding: '0 30px',
    fontFamily: 'Montserrat, sans-serif',
    textTransform: 'none',
    borderRadius: 50,
    borderColor: '#1DE9B6',
    color: '#1DE9B6',
    lineHeight: '125%',
    variant: 'outlined',
    '&:hover': {
        background: '#000A47',
    },
    '&:active': {
        background: '#000A47',
    },
    '&:focus': {
        background: '#000A47',
    },
});

export default OutlinedButton;
