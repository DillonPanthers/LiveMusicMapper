import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { TextField, makeStyles } from '@material-ui/core';

import { GlobalState } from '../../contexts/Store';

import OutlinedButton from '../StyledComponents/OutlinedButton';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    text: {
        marginBottom: '5%',
        backgroundColor: 'rgba(228,228,228,0.25)',
    },
}));

// TODO: Figure out how to force some one to sign in with spotify if they already connected their account
const EmailSignUp = () => {
    const classes = useStyles();

    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const { auth, getUserData } = useContext(GlobalState);

    const onSubmit = async (ev) => {
        ev.preventDefault();
        await axios.post('/api/user', { firstName, lastName, email, password });
        let response = await axios.post('/api/auth', { email, password });
        const { token } = response.data;
        window.localStorage.setItem('token', token);
        getUserData();
        // NOTE: To save on Google Map API calls, changed redirect to '/' homepage temporarily.
        if (token) {
            //NOTE: Temporarily redirects to home to save google maps api calls, we can change it back to /dashboard later once we finish
            history.push('/');
        }
    };

    return (
        <form className={classes.root}>
            <TextField
                required
                id="filled-required"
                label="First Name"
                variant="filled"
                value={firstName}
                onChange={({ target }) => setFirstName(target.value)}
                className={classes.text}
            />
            <TextField
                required
                id="filled-required"
                label="Last Name"
                variant="filled"
                value={lastName}
                onChange={({ target }) => setLastName(target.value)}
                className={classes.text}
            />
            <TextField
                required
                id="filled-required"
                label="Email"
                variant="filled"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                className={classes.text}
            />
            <TextField
                required
                id="filled-required"
                label="Password"
                variant="filled"
                value={password}
                type="password"
                onChange={({ target }) => setPassword(target.value)}
                className={classes.text}
            />
            <OutlinedButton variant="outlined" onClick={onSubmit}>
                CONTINUE WITH EMAIL
            </OutlinedButton>
        </form>
    );
};

export default EmailSignUp;
