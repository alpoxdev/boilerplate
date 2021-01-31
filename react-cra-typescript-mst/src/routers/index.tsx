import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Provider } from 'mobx-react';
import store from 'stores';

import MainRouter from 'routers/main';

const RootRouter = (): JSX.Element => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={MainRouter} />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
};

export default RootRouter;
