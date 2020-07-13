import React, { useState } from "react";

import UserContext from '../context/UserContext'

const UserProvider = (props) => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [postsUpdate, setPostsUpdate] = useState([]);
    const [comments, setComments] = useState([]);
    const [orderBy, setOrderBy] = useState('id');
    const [orderDir, setOrderDir] = useState('asc');
    const [postUpdate, setPostUpdate] = useState({});
    const [currentUser, setCurrentUser] = useState({
        id:         '1',
        Email:      'Sincere@april.biz',
        Name :      'Leanne Graham',
        Phone:      '1-770-736-8031 x56442',
        Username:   'Bret'
    });
    
    return (
        <UserContext.Provider
            value={{
                postUpdate,
                setPostUpdate,
                currentUser,
                setCurrentUser,
                user,
                setUser,
                posts,
                setPosts,
                comments,
                setComments,
                orderBy,
                setOrderBy,
                orderDir,
                setOrderDir,
                postsUpdate, 
                setPostsUpdate
            }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserProvider;