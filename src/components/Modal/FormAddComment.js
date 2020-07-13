import React, { useReducer, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';

import UserContext from '../../context/UserContext';

function FormAddComment(props) {
    const { posts, setPosts, currentUser } = useContext(UserContext);
    let idPost = posts.length+1
    const [post, setPost] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            id: '',
            userId: currentUser.id,
            title: '',
            body: '',
        }
    );
    const handleChange = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setPost({ [name]: newValue });
    }
    const handleSubmit = async () => {
        post.id = idPost;
        let newPost = [...posts];
        newPost.push(post)
        console.log('newPost', newPost);
        setPosts(newPost);
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
                    <input className="form-control" type="input" value={idPost} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Title</label>
                    <input type="input" className="form-control" name="title" onChange={handleChange} defaultValue={post.title} placeholder="Title" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Body</label>
                    <input type="input" className="form-control" name="body" onChange={handleChange} defaultValue={post.body} placeholder="Body" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Created By</label>
                    <input className="form-control" type="input" defaultValue={currentUser.Username} readOnly />
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