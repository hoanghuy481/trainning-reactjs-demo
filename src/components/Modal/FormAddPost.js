import React, { useReducer, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';

import UserContext from '../../context/UserContext';

function FormAddPost(props) {
    const { posts, setPosts, currentUser, setDetailPost } = useContext(UserContext);
    let postId = posts.length + 1;

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
        if (post.body === '' || post.title === '') {
            alert('Vui lòng điền đầy đủ thông tin')
        } else {
            post.id = postId;
            let newPost = [...posts];
            newPost.push(post);
            setPosts(newPost);
            alert('Thêm comment thành công');
            props.onHide();
            await fetch('https://jsonplaceholder.typicode.com/posts/', {
                method: 'POST',
                body: JSON.stringify({ post }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json())
                .then(json => setDetailPost(json.post))
        }
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
                    Add Post
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">ID</label>
                    <input className="form-control" type="input" value={postId} readOnly />
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

export default FormAddPost;