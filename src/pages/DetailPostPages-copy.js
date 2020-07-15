import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { filter, includes, isEmpty as _isEmpty, orderBy as funcOrderBy } from 'lodash';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

import FormEditPost from '../components/Modal/FormEditPost';
import ControlComment from '../components/ControlComment';
import Pagination from '../components/Pagination';
import DetailPost from '../components/DetailPost';
import ListComment from '../components/ListComment';
import UserContext from '../context/UserContext';

function DetailPostPages(props) {

    const id = props.match.params.id;
    const { comments, setComments, setOrderBy, setOrderDir, detailPost, setDetailPost, user, setUser } = useContext(UserContext);
    const [commentsOrigin, setCommentsOrigin] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(10);
    const [modalShow, setModalShow] = useState(false);
    
    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            const resPost = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
            setDetailPost(resPost.data);
            const resComment = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
            setComments(resComment.data);
            setCommentsOrigin(resComment.data);
            if (!_isEmpty(detailPost)) {
                const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${detailPost.userId}`);
                setUser(res.data);
            }
            setLoading(false);
        };
        fetchPost();
    }, [id, setDetailPost,setUser, setComments]);
    console.log(user);
    
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPost = comments.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    let xComment = null;

    const sortByID = (orderBy, orderDir) => {
        setComments(funcOrderBy(comments, [orderBy], [orderDir]));
        setOrderBy(orderBy);
        setOrderDir(orderDir);
    };

    const onClickFilter = (value) => {
        if (value !== '') {
            let items = [];
            items = filter(comments, (item) => {
                return includes(item.name.toLowerCase(), value.toLowerCase());
            });
            setComments(items)
        } else {
            setComments(commentsOrigin);
        }
    }

    const handleDelete = async () => {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${detailPost.id}`)
    };
    let username = null;

    if (loading) {
        username = <p>Loading...</p>
    } else if (!_isEmpty(user)) {
        username =
            <Link to={`../user-details/${user.id}`}>
                {user.name}
            </Link>
    }

    if (loading) {
        xComment =
            <tbody>
                <tr>
                    <th>
                        <h1>Loading...</h1>
                    </th>
                </tr>
            </tbody>
    } else if (!_isEmpty(currentPost, detailPost)) {
        if (currentPost.length > 0) {
            xComment = currentPost.map((comment, i) => {
                return (
                    <ListComment postId={id} key={i} index={i} comment={comment} />
                );
            });
        }
    }

    return (
        <div>
            <h1>Chi tiết Post</h1>
            <form>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">ID</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" defaultValue={detailPost.id} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" defaultValue={detailPost.title} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Body</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" defaultValue={detailPost.body} />
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
                <div className="form-group row">
                    <div className="col-sm-10">
                        <Button variant="warning" onClick={() => setModalShow(true)}>
                            Edit
                    </Button>
                        <FormEditPost username ={user.name} show={modalShow} onHide={() => setModalShow(false)} item={detailPost} />
                        <button onClick={handleDelete} className="btn btn-danger" type="button">Delete</button>
                    </div>
                </div>
            </form>
            <h1>Danh sách Comment</h1>
            <ControlComment postId={id} onClickFilter={onClickFilter} sortByID={sortByID} />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Body</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                {xComment}
            </table>
            <Pagination
                postPerPost={postPerPage}
                totalPost={comments.length}
                paginate={paginate}
            />
        </div>

    );
}

export default DetailPostPages;