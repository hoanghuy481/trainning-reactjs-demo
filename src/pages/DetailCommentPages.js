import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

import FormEditComment from '../components/Modal/FormEditComment';
import UserContext from '../context/UserContext';

function DetailCommentPages(props) {
    const [modalShow, setModalShow] = useState(false);
    const id = props.match.params.id;
    const { detailComment, setDetailComment } = useContext(UserContext);

    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/comments/${id}`);
            setDetailComment(res.data);
        };
        fetchPost();
    }, [id, setDetailComment]);

    const handleDelete = async () => {
        fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
            method: 'DELETE',
        }).then(response => response.json())
        .then(json => setDetailComment(json.comment))
    };

    return (
        <div>
            <h1>Chi tiết Comment</h1>
            <form>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">ID</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" defaultValue={detailComment.id} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Post ID</label>
                    <div className="col-sm-10">
                        <Link to={`../post-details/${detailComment.postId}`}>
                            {detailComment.postId}
                        </Link>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" defaultValue={detailComment.name} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" defaultValue={detailComment.email} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Body</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" defaultValue={detailComment.body} />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10">
                        <Button variant="warning" onClick={() => setModalShow(true)}>
                            Edit
                        </Button>
                        <FormEditComment show={modalShow} onHide={() => setModalShow(false)} postId={detailComment.postId} item={detailComment} />
                        <button onClick={handleDelete} className="btn btn-danger" type="button">Delete</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default DetailCommentPages;