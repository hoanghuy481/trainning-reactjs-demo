import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ListPosts from '../components/ListPosts';
import Control from '../components/Control';
import Pagination from '../components/Pagination';

function ListPostPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(10);

    useEffect(() => {
        const fetchPost = () =>{
            setLoading(true);
            axios.get('https://jsonplaceholder.typicode.com/posts')
                .then(res => {
                    setPosts(res.data);
                })     
            setLoading(false);
        }
        fetchPost();
    }, []);
    
    const indexOfLastPost   = currentPage * postPerPage;
    const indexOfFirstPost  = indexOfLastPost - postPerPage;
    const currentPost       = posts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    
    let xhtmlPost = null;
    
    if(loading){
        return <h2>Loading...</h2>
    } else{
        if (currentPost.length > 0) {
            xhtmlPost = currentPost.map((post, i) => {
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
            <Control/>
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