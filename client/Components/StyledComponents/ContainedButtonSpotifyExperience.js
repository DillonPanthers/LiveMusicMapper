import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ContainedButtonSpotifyExperience = styled(Button)({
    color: 'black',
    background: '#1DB954', // spotify green
    '&:hover': {
        background: '#3C3C3B',
        color: 'white',
    },
    '&:active': {
        background: '#3C3C3B',
        color: 'white',
    },
    '&:focus': {
        background: '#3C3C3B',
        color: 'white',
    },
    borderRadius: 50,
    lineHeight: '125%',
    textAlign: 'center',
});

export default ContainedButtonSpotifyExperience;
