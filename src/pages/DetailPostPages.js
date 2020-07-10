import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { filter, includes, isEmpty as _isEmpty, orderBy as funcOrderBy } from 'lodash';

import Control from '../components/Control';
import Pagination from '../components/Pagination';
import DetailPost from '../components/DetailPost';
import ListComment from '../components/ListComment';
import UserContext from '../context/UserContext';

function DetailPostPages(props) {

    const id = props.match.params.id;
    const { comments, setComments, setOrderBy, setOrderDir } = useContext(UserContext);
    const [post, setPost] = useState({});
    const [commentsOrigin, setCommentsOrigin] = useState([]);
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
            setCommentsOrigin(resComment.data);
            setLoading(false);
        };
        fetchPost();
    }, [id, setComments]);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPost = comments.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    let xDetailPost = null;
    let xComment = null;

    const sortByID = (orderBy, orderDir) => {
        setComments(funcOrderBy(comments, [orderBy], [orderDir]));
        setOrderBy(orderBy);
        setOrderDir(orderDir);
    };

    const onClickFilter = (value) => {
        if (value !== '') {
            let items = [];
            items = filter(comments, (item) => {
                return includes(item.name.toLowerCase(), value.toLowerCase());
            });
            setComments(items)
        } else {
            setComments(commentsOrigin);
        }
    }
    console.log(comments);

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
    } else if (!_isEmpty(currentPost, post)) {
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
            <Control onClickFilter={onClickFilter} sortByID={sortByID} />
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