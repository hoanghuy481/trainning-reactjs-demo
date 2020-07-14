import React, { Component } from 'react';
import axios from 'axios';
import { filter, includes, isEmpty as _isEmpty, orderBy as funcOrderBy } from 'lodash';

import ListPosts from '../components/ListPosts';
import Control from '../components/Control';
import Pagination from '../components/Pagination';
import UserContext from '../context/UserContext';

class ListPostPage extends Component {
    static contextType = UserContext;
    constructor() {
        super()
        this.state = {
            postsOrigin: [],
            loading: false,
            currentPage: 1,
            postPerPage: 10,
            currentPost: ''
        }
    }
    fetchPost = async () => {
        const { setPosts, setLoading } = this.context;
        setLoading(true);
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
        this.setState({
            postsOrigin: res.data
        });
        setLoading(false);
        let data = this.state.postsOrigin
        setPosts(data)
    }
    componentDidMount() {
        this.fetchPost();
    }

    componentDidUpdate(){
        // const { setPosts, posts } = this.context;
        // if(posts !== posts){
        //     setPosts(posts)
        // }
        // console.log( 'post', posts);
       
    }

    render() { 
        const { posts, setPosts, setOrderBy, setOrderDir, loading, postsUpdate } = this.context;
        const { currentPage, postsOrigin, postPerPage } = this.state;
        const indexOfLastPost = currentPage * postPerPage;
        const indexOfFirstPost = indexOfLastPost - postPerPage;
        const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);//số lượng trang đã phân
        const paginate = pageNumber => this.setState({ currentPage: pageNumber });
        
        const sortByID = (orderBy, orderDir) => {
            setPosts(funcOrderBy(postsUpdate, [orderBy], [orderDir]));// sort Post khi Posts data đã được cập nhật thêm total comments
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
}

export default ListPostPage;