import React, { useEffect, useReducer, useContext } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import UserContext from '../../context/UserContext';

function FormEditPost(props) {
    let item = props.post;
    const { setPostUpdate } = useContext(UserContext);
    const [post, setPost] =useReducer(
		(state, newState) => ({...state, ...newState}),
		{
            id: item.id,
            body: item.body,
            title: item.title,
            userId: item.userId

    });
    
    useEffect(() =>{
        setPostUpdate(item)
    })
	
	const handleChange = evt => {
		const name = evt.target.name;
    	const newValue = evt.target.value;
        setPost({[name]: newValue});
    }
    const handleSubmit = async () => {
       // const res = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`);
       await setPostUpdate(post)
    }

    return (
        <div className="modal fade bd-example-modal-lg" id="editPost" tabIndex="-1" role="dialog" aria-labelledby="editPost" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Edit Post</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
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
                                <input className="form-control" type="input" readOnly />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" onClick={handleSubmit} className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormEditPost;