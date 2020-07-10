import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { isEmpty as _isEmpty } from 'lodash';
import UserContext from '../context/UserContext';

function ListPosts(props) {
    let post = props.post;
    const [user, setUser] = useState({});
    const { posts, setPosts } = useContext(UserContext);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            let resUser = await axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
            setUser(resUser.data);
            let resComments = await axios.get(`https://jsonplaceholder.typicode.com/posts/${post.userId}/comments`);
            setComments(resComments.data);
            setLoading(false);
            const newPosts = posts.map(post => ({ ...post, total: resComments.data.length }))
            setPosts(newPosts)

        };
        fetch();
    }, [post.userId, setPosts, posts]);

    let total = null;
    let username = null;

    if (loading) {
        username = <td>Loading...</td>
        total = <td>Loading...</td>
    } else if (!_isEmpty(comments, user)) {
        username = <td>{user.name}</td>
        total = <td>{comments.length}</td>
    }
    console.log(posts);
    return (
        <tbody>
            <tr>
                <th>{post.id}</th>
                <th>
                    <Link to={`post-details/${post.id}`}>
                        {post.title}
                    </Link>
                </th>
                <td>10/01/1998</td>
                {username}
                {total}
                <td>
                    <button className="btn btn-warning" type="button">Edit</button>
                    <button className="btn btn-danger" type="button">Delete</button>
                </td>
            </tr>
        </tbody>
    );
}

export default ListPosts;

