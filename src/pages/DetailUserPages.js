import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isEmpty as _isEmpty } from 'lodash';

import DetailUser from '../components/DetailUser';

function DetailUserPages(props) {
    const id = props.match.params.id;
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
            setUser(res.data);
            setLoading(false);
        };
        fetchPost();

    }, [id]);

    let xDetailUser = null;

    if (loading) {
        xDetailUser = <h1>Loading...</h1>
    } else if (!_isEmpty(user)) {
        xDetailUser = <DetailUser user={user} />
    }

    return (
        <div>
            <h1>Chi tiết User</h1>
            {xDetailUser}
        </div>
    );
}

export default DetailUserPages;