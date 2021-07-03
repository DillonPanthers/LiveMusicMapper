import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ContainedButton = styled(Button)({
    color: 'black',
    background: '#1DE9B6',
    '&:hover': {
        background: '#5F285A',
        color: 'white',
    },
    '&:active': {
        background: '#5F285A',
        color: 'white',
    },
    '&:focus': {
        background: '#5F285A',
        color: 'white',
    },
    borderRadius: 50,
    lineHeight: '125%',
    textAlign: 'center',
});

export default ContainedButton;
