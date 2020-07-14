import React, { useReducer, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';

import UserContext from '../../context/UserContext';

function FormAddComment(props) {
    const { comments, setComments, currentUser } = useContext(UserContext);
    let idComment = comments.length+1;
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
    const handleChange = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setComment({ [name]: newValue });
    }
    const handleSubmit = async () => {
        comment.id = idComment;
        comment.email = email;
        let newComment = [...comments];
        newComment.push(comment)
        setComments(newComment);
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
                    <input className="form-control" type="input" value={idComment} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">POST ID</label>
                    <input className="form-control" type="input" value={comment.postId} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Name</label>
                    <input type="input" className="form-control" name="name" onChange={handleChange} defaultValue={comment.name} placeholder="Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Email</label>
                    <input type="input" className="form-control" name="body" readOnly defaultValue={email} placeholder="Email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Body</label>
                    <input type="input" className="form-control" name="body" onChange={handleChange} defaultValue={comment.body} placeholder="Body" />
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