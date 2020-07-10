import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isEmpty as _isEmpty } from 'lodash';

import DetailComment from '../components/DetailComment';

function DetailCommentPages(props) {
    const id = props.match.params.id;
    const [comment, setComment] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            const res = await axios.get(`https://jsonplaceholder.typicode.com/comments/${id}`);
            setComment(res.data);
            setLoading(false);
        };
        fetchPost();

    }, [id]);

    let xDetaiComment = null;

    if (loading) {
        xDetaiComment = <h1>Loading...</h1>
    } else if (!_isEmpty(comment)) {
        xDetaiComment = <DetailComment comment={comment} />
    }

    return (
        <div>
            <h1>Chi tiết Comment</h1>
            {xDetaiComment}
        </div>
    );
}

export default DetailCommentPages;