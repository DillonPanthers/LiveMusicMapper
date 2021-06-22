import React, { useState } from 'react';
import {
    Avatar,
    Button,
    Typography,
    TextField,
    makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '0.75rem',
    },
    text: {
        margin: theme.spacing(1),
        backgroundColor: '#363073',
    },
    label: {
        padding: '0.75rem',
    },
    searchInput: {
        display: 'flex',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
    },
    people: {
        display: 'flex',
        alignItems: 'center',
        '& *': {
            margin: '0.5rem',
            color: 'white',
        },
    },
    link: {
        textDecoration: 'none',
        display: 'inline-block',
    },
    searchedUsers: {
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
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
        <div className={classes.root}>
            <form onSubmit={submitSearch}>
                <Typography
                    className={classes.label}
                    gutterBottom
                    variant="h6"
                    component="h2"
                >
                    Find User{' '}
                </Typography>
                <div className={classes.searchInput}>
                    <TextField
                        onChange={searchByName}
                        // label="Name"
                        variant="outlined"
                        value={name}
                        placeholder="search user here"
                        className={classes.text}
                        size="small"
                    />
                    <div className={classes.button}>
                        <Button variant="contained" type="submit">
                            Submit
                        </Button>
                    </div>
                </div>
            </form>
            <div className={classes.searchedUsers}>
                {Object.keys(searchList).length > 0
                    ? searchList.map((user) => (
                          <Link
                              className={classes.link}
                              key={user.id}
                              to={`/user/${user.id}`}
                          >
                              <div className={classes.people}>
                                  <Avatar src="profile_pic_placeholder.png">{`${user.firstName[0]}${user.lastName[0]}`}</Avatar>
                                  <Typography>{user.fullName}</Typography>
                              </div>
                          </Link>
                      ))
                    : message}
            </div>
        </div>
    );
};

export default Search;
