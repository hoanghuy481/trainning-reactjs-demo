import React, { useReducer, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';

import UserContext from '../../context/UserContext';

function FormEditPost(props) {
    let { item, index } = props;
    const { posts, setPosts, detailPost, setDetailPost } = useContext(UserContext);
    const [post, setPost] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            userId: item.userId,
            id: '',
            title: item.title,
            body: item.body,
        }
    );
    const handleChange = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setPost({ [name]: newValue });
    }
    const handleSubmit = async () => {
        post.id = item.id;
        const newPosts = [...posts];
        newPosts[index] = post;
        setPosts(newPosts);
        await fetch(`https://jsonplaceholder.typicode.com/posts/${item.id}`, {
            method: 'PUT',
            body: JSON.stringify({ post }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => setDetailPost(json.post))
            console.log(detailPost);
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
                    Edit Post
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">ID</label>
                    <input className="form-control" type="input" value={item.id} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Title</label>
                    <input type="input" className="form-control" name="title" onChange={handleChange} defaultValue={item.title} placeholder="Title" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Body</label>
                    <input type="input" className="form-control" name="body" onChange={handleChange} defaultValue={item.body} placeholder="Body" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Created By</label>
                    <input className="form-control" defaultValue={props.username} type="input" readOnly />
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

export default FormEditPost;