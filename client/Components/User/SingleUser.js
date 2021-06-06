import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

function SingleUser(props) {
    const [user, setUser] = useState({});

    useEffect(() => {
        const getUser = async () => {
            const { id } = props.match.params;
            const user = await axios.get(`/api/user/${id}`);
            setUser(user.data);
        };

        getUser();
    }, [props.match.params]);

    return <div>Hello There</div>;
}

export default SingleUser;
