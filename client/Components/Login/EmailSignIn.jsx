import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button, TextField, makeStyles } from '@material-ui/core';

import { GlobalState } from '../../contexts/Store';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    text: {
        marginBottom: '8%',
        backgroundColor: 'rgba(228,228,228,0.25)',
    },
    button: {
        height: 48,
        padding: '0 30px',
        fontFamily: 'Montserrat, sans-serif',
        textTransform: 'none',
        borderRadius: 50,
        borderColor: '#1DE9B6',
        color: '#1DE9B6',
        width: '100%',
        lineHeight: '125%',
    },
}));

const EmailSignIn = () => {
    const classes = useStyles();

    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { auth } = useContext(GlobalState);
    const [user, setUser] = auth;

    const onSubmit = async (ev) => {
        ev.preventDefault();
        let response = await axios.post('/api/auth', { email, password });
        const { token } = response.data;
        window.localStorage.setItem('token', token);
        loadAuthUser();
    };

    // TODO: This can be dry
    const loadAuthUser = async () => {
        const token = window.localStorage.getItem('token');
        if (token) {
            const response = await axios.get('/api/auth', {
                headers: {
                    authorization: token,
                },
            });
            const userData = response.data;
            if (userData.id) {
                setUser(userData);
                history.push('/dashboard');
            }
        }
    };

    return (
        <form className={classes.root}>
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
            <Button
                variant="outlined"
                className={classes.button}
                onClick={onSubmit}
            >
                CONTINUE WITH EMAIL
            </Button>
        </form>
    );
};

export default EmailSignIn;
