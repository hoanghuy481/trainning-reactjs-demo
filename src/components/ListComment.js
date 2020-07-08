import React from 'react';
import { Link } from "react-router-dom";

function ListComment(props) {
    let post = props.post;

    return (
        <tbody>
            <tr>
                <th>{post.id}</th>
                <th>{post.userId}</th>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>
                    <Link to={`post-details/${post.id}`}>
                        Details
                    </Link>
                </td>
            </tr>
        </tbody>
    );
}

export default ListComment;

