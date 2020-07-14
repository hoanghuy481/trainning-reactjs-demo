import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { isEmpty as _isEmpty } from 'lodash';
import { Button } from 'react-bootstrap';

import FormEditPost from '../components/Modal/FormEditPost';
import UserContext from '../context/UserContext';

function ListPosts(props) {
    let item = props.post;
    const { posts, setPosts, setPostsUpdate } = useContext(UserContext);
    const [user, setUser] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const index = posts.map(post => { return post.id; }).indexOf(item.id)// tìm vị trí của post trong mảng

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            let resUser = await axios.get(`https://jsonplaceholder.typicode.com/users/${item.userId}`);
            setUser(resUser.data);
            let resComments = await axios.get(`https://jsonplaceholder.typicode.com/posts/${item.userId}/comments`);
            setComments(resComments.data);
            setLoading(false);
            const newPosts = posts.map(post => ({ ...post, total: resComments.data.length }))
            setPostsUpdate(newPosts);
        };
        fetch();
    }, [item.userId, setPosts, posts, setPostsUpdate]);

    const handleDelete = async () => {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${item.id}`)
        const a1 = posts.slice(0, index);// xoá các phần tử trước tính từ phần tử ta chọn
        const a2 = posts.slice(index + 1, posts.length); //xoá các phần tử sau tính từ phần tử ta chọn
        const new_arr = a1.concat(a2); // gộp các phần tử đã xoá
        setPosts(new_arr);
    };

    let total = null;
    let username = null;

    if (loading) {
        username = <td>Loading...</td>
        total = <td>Loading...</td>
    } else if (!_isEmpty(comments, user)) {
        username = <td>{user.name}</td>
        total = <td>{comments.length}</td>
    }

    return (
        <tbody>
            <tr>
                <th>{item.id}</th>
                <th>
                    <Link to={`post-details/${item.id}`}>
                        {item.title}
                    </Link>
                </th>
                <td>10/01/1998</td>
                {username}
                {total}
                <td>
                    <Button variant="warning" onClick={() => setModalShow(true)}>
                        Edit
                    </Button>
                    <FormEditPost show={modalShow} onHide={() => setModalShow(false)} index={index} item={item} />
                    <button onClick={handleDelete} className="btn btn-danger" type="button">Delete</button>
                </td>
            </tr>

        </tbody>
    );
}

export default ListPosts;

