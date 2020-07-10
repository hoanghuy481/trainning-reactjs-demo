import React from 'react';
import { Link } from "react-router-dom";

function DetailComment(props) {
    let comment = props.comment;

    return (
        <div>
            <form>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">ID</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" defaultValue={comment.id} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Post ID</label>
                    <div className="col-sm-10">
                        <Link to={`../post-details/${comment.postId}`}>
                            {comment.postId}
                        </Link>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" defaultValue={comment.name} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" defaultValue={comment.email} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Body</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" defaultValue={comment.body} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default DetailComment;