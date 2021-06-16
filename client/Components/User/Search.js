import React, { useState } from 'react';
import {
    Container,
    Button,
    Typography,
    TextField,
    makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    text: {
        margin: theme.spacing(1),
        backgroundColor: '#363073',
    },
}));

const Search = () => {
    const [name, setName] = useState('');
    const [searchList, setSearchList] = useState({});
    const [message, setMessage] = useState('');

    const classes = useStyles();

    const searchByName = (event) => {
        setName(event.target.value);
    };

    const submitSearch = async (event) => {
        event.preventDefault();
        const token = window.localStorage.getItem('token');
        const response = await axios.get('/api/user/search', {
            headers: {
                authorization: token,
            },
            params: { name },
        });

        const filteredUsers = response.data;
        setSearchList(filteredUsers);
        setName('');
        if (filteredUsers.length === 0) {
            setMessage('No Users Found');
        } else {
            setMessage('');
        }
    };
    return (
        <Container>
            <form onSubmit={submitSearch}>
                <label>Find User </label>
                <TextField
                    onChange={searchByName}
                    label="Name"
                    variant="filled"
                    value={name}
                    placeholder="enter name here"
                    className={classes.text}
                    size="small"
                />
                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </form>
            {Object.keys(searchList).length > 0
                ? searchList.map((user) => (
                      <Link key={user.id} to={`/user/${user.id}`}>
                          <Typography>{user.fullName}</Typography>
                      </Link>
                  ))
                : message}
        </Container>
    );
};

export default Search;
