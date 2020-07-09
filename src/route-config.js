import React from 'react';

import ListPostPage from './pages/ListPostPage';
import DetailPostPages from './pages/DetailPostPages';
import DetailUserPages from './pages/DetailUserPages';

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
    },
    {
        path: "/post-details/:id",
        exact: true,
        main: ({ match }) => <DetailPostPages match={match} />
    },
    {
        path: "/user-details/:id",
        exact: true,
        main: ({ match }) => <DetailUserPages match={match} />
    }
];

export default routes;