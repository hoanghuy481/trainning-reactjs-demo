import React, { useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import UserContext from '../context/UserContext';

function DetailPost() {

    const { user, setUser, detailPost } = useContext(UserContext);
    let post = detailPost;
    useEffect(() => {
        const fetchData = async () => {
            if (post.userId !== undefined) {
                const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
                setUser(res.data);
            }
        };
        fetchData();
    }, [post.userId, setUser]);

    return (
        <div className="form-group row">
            <label className="col-sm-2 col-form-label">Created By</label>
            <div className="col-sm-10">
            <Link to={`../user-details/${user.id}`}>
                {user.name}
            </Link>
            </div>
        </div>
    );
}

export default DetailPost;