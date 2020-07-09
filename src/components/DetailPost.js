import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import UserContext from '../context/UserContext';

function DetailPost(props) {
    let post = props.post;
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if(post.userId !== undefined){
                const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
                setUser(res.data);
                setLoading(false);
            }
        };
        fetchData();
    }, [post.userId, setUser]);

    let username = null;

    if (loading) {
        username = <p>Loading...</p>
    } else {
        username =
            <Link to={`../user-details/${user.id}`}>
                {user.name}
            </Link>
    }

    
    return (
        <div>
            <form>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">ID</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" defaultValue={post.id} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" defaultValue={post.title} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Body</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" defaultValue={post.body} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Created date</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" defaultValue="10/01/1998" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Created By</label>
                    <div className="col-sm-10">
                        {username}
                    </div>
                </div>


            </form>
        </div>
    );
}

export default DetailPost;