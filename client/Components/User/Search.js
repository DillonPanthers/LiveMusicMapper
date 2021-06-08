import React, { useState } from 'react';
import { Container, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
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
        //NOTE: if you want users to populate on the page as the user is typing then we can change functionality similar to that
        //NOTE: Maybe we should have a search bar that has a dropdown of some users that show up as we start typing the names of users in
    };
    return (
        <Container>
            <form onSubmit={submitSearch}>
                <label>Find User </label>
                <input onChange={searchByName} placeholder="enter name here" />
                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </form>
            {Object.keys(searchList).length > 0
                ? searchList.map((user) => (
                      <Link key={user.id} to={`/user/${user.id}`}>
                          {user.fullName}
                      </Link>
                  ))
                : 'no users found'}
        </Container>
    );
};

export default Search;
