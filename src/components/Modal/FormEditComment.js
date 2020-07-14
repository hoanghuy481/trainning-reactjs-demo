import React, { useReducer, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';

import UserContext from '../../context/UserContext';

function FormEditComment(props) {
    let { item, index, postId } = props;
    const { comments, setComments, currentUser} = useContext(UserContext);
    const [comment, setComment] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            postId: '',
            id: '',
            name: item.name,
            body: item.body,
            email: '',
        }
    );
    const handleChange = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setComment({ [name]: newValue });
    }
    const handleSubmit = async () => {
        comment.postId = postId;
        comment.id = item.id;
        comment.email = currentUser.email;
        let newComments = [...comments];
        newComments[index] = comment
        setComments(newComments)
        console.log(comments);
        
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
                    Edit Comment
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">ID</label>
                    <input className="form-control" type="input" value={item.id} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Name</label>
                    <input type="input" className="form-control" name="name" onChange={handleChange} defaultValue={item.name} placeholder="Title" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Body</label>
                    <input type="input" className="form-control" name="body" onChange={handleChange} defaultValue={item.body} placeholder="Body" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Email</label>
                    <input className="form-control" type="input" readOnly defaultValue={currentUser.email} />
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

export default FormEditComment;