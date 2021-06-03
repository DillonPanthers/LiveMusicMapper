import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { GlobalState } from '../../contexts/Store';

const EmailSignIn = () => {
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

    const loadAuthUser = async () => {
        const token = window.localStorage.getItem('token');
        if (token) {
            const response = await axios.get('/api/auth', {
                headers: {
                    authorization: token,
                },
            });
            const userData = response.data;

            // const concerts = await axios.get(
            //     `/api/users/${response.data.id}/concerts`,
            //     {
            //         headers: {
            //             authorization: token,
            //         },
            //     }
            // );
            if (userData.id) {
                setUser(userData);
                console.log('called from loadAuthUser', user);
                // return <Redirect to="/dashboard" />;
                history.push('/dashboard');
            }
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                name="username"
                placeholder="Email"
            />
            <br />
            <input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                name="password"
                placeholder="Password"
                type="password"
            />
            <br />
            <button>Continue with Email</button>
        </form>
    );
};

export default EmailSignIn;
