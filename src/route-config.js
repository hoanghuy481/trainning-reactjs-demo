import React from 'react';

import PostsListPage from './pages/PostsListPage';

const routes = [
    {
        path: "/post",
        exact: true,
        main: () => <PostsListPage />
    },
    {
        path: "/",
        exact: true,
        main: () => <PostsListPage />
    }
];

export default routes;