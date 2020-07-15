import React, { useReducer, useContext, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

import UserContext from '../../context/UserContext';

function FormAddComment(props) {
    const { comments, setComments, currentUser, setDetailComment } = useContext(UserContext);
    let email = currentUser.email;
    const [comment, setComment] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            postId: props.postId,
            id: '',
            body: '',
            name: '',
            email: '',
        }
    );
    
    useEffect(() => {
        const fetchPost = async () => {
            const resCommments = await axios.get(`https://jsonplaceholder.typicode.com/comments/`);
            comment.id = resCommments.data.length+1;
        };
        fetchPost();
    }, [comment.id]);

    const handleChange = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setComment({ [name]: newValue });
    }
    const handleSubmit = async () => {
        if (comment.body === '' && comment.name === '') {
            alert('Vui lòng điền đầy đủ thông tin')
        } else {
            comment.email = email;
            let newComment = [...comments];
            newComment.push(comment)
            await setComments(newComment);
            alert('Thêm comment thành công');
            props.onHide();
            await fetch('https://jsonplaceholder.typicode.com/comments/', {
                method: 'POST',
                body: JSON.stringify({ comment }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json())
                .then(json => setDetailComment(json.comment))
            await clearComment();
        }
    }
    const clearComment = () => {
        comment.body = '';
        comment.name = '';
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Comment
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">ID</label>
                    <input className="form-control" type="input" value={comment.id} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">POST ID</label>
                    <input className="form-control" type="input" value={comment.postId} readOnly />
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Email</label>
                    <input type="input" className="form-control" name="body" readOnly defaultValue={email} placeholder="Email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Body</label>
                    <input type="input" className="form-control" name="body" onChange={handleChange} defaultValue={comment.body} placeholder="Body" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Name</label>
                    <input type="input" className="form-control" name="name" onChange={handleChange} defaultValue={comment.name} placeholder="Name" />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default FormAddComment;