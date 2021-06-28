import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { TextField, makeStyles } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';

import { GlobalState } from '../../contexts/Store';

import OutlinedButton from '../StyledComponents/OutlinedButton';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '24rem',
    },
    text: {
        marginBottom: '8%',
        backgroundColor: 'rgba(228,228,228,0.25)',
    },
    errorContainer: {
        display: 'flex',
        marginBottom: '8%',
    },
    errorMsg: {
        justifyContent: 'center',
        border: '2px solid red',
        backgroundColor: 'white',
        alignItems: 'align-start',
        width: '85%',
    },
    error: {
        color: 'red',
        margin: '0.5rem',
        lineHeight: '1.15',
    },
    icon: {
        color: 'white',
        alignSelf: 'center',
    },
    iconContainer: {
        backgroundColor: 'red',
        display: 'flex',
        padding: '0.5rem',
        width: '4rem',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
}));

// TODO: Figure out how to force some one to sign in with spotify if they already connected their account
const EmailSignIn = () => {
    const classes = useStyles();

    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const { auth, getUserData } = useContext(GlobalState);

    const onSubmit = async (ev) => {
        try {
            ev.preventDefault();
            const { data } = await axios.post('/api/auth', { email, password });
            const { token } = data;
            window.localStorage.setItem('token', token);
            getUserData();
            if (token) {
                history.push('/map');
            }
        } catch (error) {
            setErrorMsg(error.response.data.error);
            console.log(error);
        }
    };

    return (
        <form className={classes.root}>
            {errorMsg !== '' ? (
                <div className={classes.errorContainer}>
                    <div className={classes.iconContainer}>
                        <WarningIcon className={classes.icon} />
                    </div>
                    <div className={classes.errorMsg}>
                        <p className={classes.error}>{errorMsg}</p>
                    </div>
                </div>
            ) : (
                <></>
            )}
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

export default EmailSignIn;
