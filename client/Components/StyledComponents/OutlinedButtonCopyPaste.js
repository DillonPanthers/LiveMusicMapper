import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const OutlinedButtonCopyPaste = styled(Button)({
    height: 48,
    padding: '0 30px',
    fontFamily: 'Montserrat, sans-serif',
    textTransform: 'none',
    borderRadius: 50,
    borderColor: '#1DB954',
    color: '#1DB954',
    lineHeight: '125%',
    variant: 'outlined',
    '&:hover': {
        background: '#3C3C3B',
    },
    '&:active': {
        background: '#3C3C3B',
    },
    '&:focus': {
        background: '#3C3C3B',
    },
});

export default OutlinedButtonCopyPaste;
