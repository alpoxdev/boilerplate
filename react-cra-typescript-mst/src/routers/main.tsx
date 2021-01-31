import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { MainPostListPage, MainPostDetailPage } from 'pages/main';

const MainRouter = (): JSX.Element => {
    return (
        <Switch>
            <Route exact path="/" component={MainPostListPage} />
            <Route exact path="/:id" component={MainPostDetailPage} />
        </Switch>
    );
};

export default MainRouter;
