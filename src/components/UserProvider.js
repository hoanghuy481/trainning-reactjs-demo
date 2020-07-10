import React, { useState } from "react";

import UserContext from '../context/UserContext'

const UserProvider = (props) => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [orderBy, setOrderBy] = useState('id');
    const [orderDir, setOrderDir] = useState('asc');
    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                posts,
                setPosts,
                comments,
                setComments,
                orderBy,
                setOrderBy,
                orderDir,
                setOrderDir
            }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserProvider;