import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

function ListPosts(props) {
    let post = props.post;
    const [user, setUser] = useState({});
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = () =>{
            setLoading(true);
            axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
                .then(res => {
                    setUser(res.data);
                })
            setLoading(false);
        }
        const fetchComments = () =>{
            setLoading(true);
            axios.get(`https://jsonplaceholder.typicode.com/posts/${post.userId}/comments`)
                .then(res => {
                    setComments(res.data);
                })
            setLoading(false);
        }
        fetchUser();
        fetchComments();
    }, [post.userId]);

    let total = null;
    let username = null;
    
    if(loading){
        username = <td>Loading...</td>
        total = <td>Loading...</td>
    } else{
        username= <td>{user.name}</td>
        total =  <td>{comments.length}</td>
    }

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
                    <button  className="btn btn-danger" type="button">Delete</button>
                </td>
            </tr>
        </tbody>
    );
}

export default ListPosts;

