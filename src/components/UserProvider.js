import React, { useState } from "react";

import UserContext from '../context/UserContext';

const UserProvider = (props) => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [postsUpdate, setPostsUpdate] = useState([]);
    const [comments, setComments] = useState([]);
    const [orderBy, setOrderBy] = useState('id');
    const [orderDir, setOrderDir] = useState('asc');
    const [currentUser, setCurrentUser] = useState({
        id:         '1',
        email:      'Sincere@april.biz',
        name :      'Leanne Graham',
        phone:      '1-770-736-8031 x56442',
        Username:   'Bret'
    });
    
    return (
        <UserContext.Provider
            value={{
                loading, 
                setLoading,
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