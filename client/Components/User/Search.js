import React, { useState } from 'react';
import { Container, Button } from '@material-ui/core';
import axios from 'axios';

const Search = () => {
    const [name, setName] = useState('');
    const [searchList, setSearchList] = useState({});

    const searchByName = (event) => {
        setName(event.target.value);
    };

    const submitSearch = async (event) => {
        event.preventDefault();
        const token = window.localStorage.getItem('token');
        const response = await axios.get('/api/user', {
            headers: {
                authorization: token,
            },
        });
        console.log(response.data);
        const filteredUsers = response.data.filter(
            (user) => user.firstName.toLowerCase() === name.toLowerCase()
        );
        setSearchList(filteredUsers);
        //on submit is getting the full string search
        //make a call axios call to the backend now to get the users that exist in the database and see if we can get a list of them
    };
    return (
        <Container>
            <form onSubmit={submitSearch}>
                <label>Search Users</label>
                <input onChange={searchByName} />
                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </form>
            {Object.keys(searchList).length > 0
                ? searchList.map((user) => user.fullName)
                : 'no users found'}
        </Container>
    );
};

export default Search;
