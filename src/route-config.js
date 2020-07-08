import React from 'react';
import ListPostPage from './pages/ListPostPage';

const routes = [
    {
        path: "/post",
        exact: true,
        main: () => <ListPostPage />
    },
    {
        path: "/",
        exact: true,
        main: () => <ListPostPage />
    }
];

export default routes;