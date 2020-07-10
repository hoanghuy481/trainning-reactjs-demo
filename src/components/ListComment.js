import React, { useContext } from 'react';
import { Link } from "react-router-dom";

import UserContext from '../context/UserContext';

function ListComment(props) {
    let { comment, index } = props;
    const { user } = useContext(UserContext);

    return (
        <tbody>
            <tr>
                <th>{index + 1}</th>
                <th>{comment.id}</th>
                <th>
                    <Link to={`../comment-details/${comment.id}`}>
                        {comment.name}
                    </Link>
                </th>
                <td>10/01/1998</td>
                <th>
                    <Link to={`../user-details/${user.id}`}>
                        {user.name}
                    </Link>

                </th>
                <td>
                    <button className="btn btn-warning" type="button">Edit</button>
                    <button className="btn btn-danger" type="button">Delete</button>
                </td>
            </tr>
        </tbody>
    );
}

export default ListComment;

