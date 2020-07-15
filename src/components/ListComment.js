import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Button } from 'react-bootstrap';

import FormEditComment from '../components/Modal/FormEditComment';
import UserContext from '../context/UserContext';

function ListComment(props) {
    let { comment, index, postId } = props;
    const { comments, setComments } = useContext(UserContext);
    const [modalShow, setModalShow] = useState(false);

    const handleDelete = async () => {
        const index = comments.map(comment => { return comment.id; }).indexOf(comment.id)// tìm vị trí của post trong mảng
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${comment.id}`)
        const a1 = comments.slice(0, index);// xoá các phần tử trước tính từ phần tử đã chọn
        const a2 = comments.slice(index + 1, comments.length); //xoá các phần tử sau tính từ phần tử đã chọn
        const new_arr = a1.concat(a2); // gộp các phần tử đã xoá
        setComments(new_arr);
    };

    return (
        <tbody>
            <tr>
                <th>{comment.id}</th>
                <th>
                    <Link to={`../comment-details/${comment.id}`}>
                        {comment.name}
                    </Link>
                </th>
                <td>
                    {comment.body}
                </td>
                <td>
                    {comment.email}
                </td>
                <td>
                    <Button variant="warning" onClick={() => setModalShow(true)}>
                        Edit
                    </Button>
                    <FormEditComment show={modalShow} onHide={() => setModalShow(false)} postId={postId} index={index} item={comment} />
                    <button onClick={handleDelete} className="btn btn-danger" type="button">Delete</button>
                </td>
            </tr>
        </tbody>
    );
}

export default ListComment;

