import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Pagination from '../components/Pagination';
import DetailPost from '../components/DetailPost';
import ListComment from '../components/ListComment';

function DetailPostPages(props) {

    const id = props.match.params.id;
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(10);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            const resPost = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
            setPost(resPost.data);
            const resComment = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
            setComments(resComment.data);
            setLoading(false);
        };
        fetchPost();
    }, [id]);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPost = comments.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    let xDetailPost = null;
    let xComment = null;

    if (loading) {
        xDetailPost = <h1>Loading...</h1>
        xComment = 
        <tbody>
            <tr>
                <th>
                    <h1>Loading...</h1>
                </th>
            </tr>
        </tbody>
    } else {
        xDetailPost = <DetailPost post={post} />
        if (currentPost.length > 0) {
            xComment = comments.map((comment, i) => {
                return (
                    <ListComment key={i} index={i} comment={comment} />
                );
            });
        }
    }

    return (
        <div>
            <h1>Chi tiết Post</h1>
            {xDetailPost}
            <h1>Danh sách Comment</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Created By</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                {xComment}
            </table>
            <Pagination
                postPerPost={postPerPage}
                totalPost={comments.length}
                paginate={paginate}
            />
        </div>

    );
}

export default DetailPostPages;