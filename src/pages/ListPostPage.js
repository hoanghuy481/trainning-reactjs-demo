import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { filter, includes, isEmpty as _isEmpty, orderBy as funcOrderBy } from 'lodash';

import ListPosts from '../components/ListPosts';
import Control from '../components/Control';
import Pagination from '../components/Pagination';
import UserContext from '../context/UserContext';

function ListPostPage() {
    const { posts, setPosts, setOrderBy, setOrderDir } = useContext(UserContext);
    const [postsOrigin, setPostOrigin] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(10);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(res.data);
            setPostOrigin(res.data);
            setLoading(false);
        }
        fetchPost();
    }, [setPosts]);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const sortByID = (orderBy, orderDir) => {
        setPosts(funcOrderBy(posts, [orderBy], [orderDir]));
        setOrderBy(orderBy);
        setOrderDir(orderDir);
    };

    const onClickFilter = (value) => {
        if (value !== '') {
            let items = [];
            items = filter(posts, (item) => {
                return includes(item.title.toLowerCase(), value.toLowerCase());
            });
            setPosts(items)
        } else {
            setPosts(postsOrigin);
        }
    }

    let xhtmlPost = null;

    if (loading) {
        return <h2>Loading...</h2>
    } else if (!_isEmpty(posts)) {
        if (currentPost.length > 0) {
            xhtmlPost = currentPost
                .map((post, i) => {
                    return (
                        <ListPosts key={i} index={i} post={post} />
                    );
                });
        }
    }

    return (
        <div>
            <div className="page-header">
                <h1>Danh sách Post</h1>
            </div>
            <Control onClickFilter={onClickFilter} sortByID={sortByID} />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Title</th>
                        <th scope="col">Created Date</th>
                        <th scope="col">Created By</th>
                        <th scope="col">Total Comments</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                {xhtmlPost}
            </table>
            <Pagination
                postPerPost={postPerPage}
                totalPost={posts.length}
                paginate={paginate}
            />
        </div>
    );
}

export default ListPostPage;