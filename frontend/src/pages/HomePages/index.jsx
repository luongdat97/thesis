import React from 'react';
import Routes from './Routes'
import {
    BrowserRouter,
    Switch,
    useRouteMatch
} from "react-router-dom";

import MainLayout from '../../containers/MainLayout'

function HomePages() {
    let { path, url } = useRouteMatch();

    return (
        <div className="App">
            <MainLayout url={url} path={path}>
                <Routes path={path} />
            </MainLayout>

        </div>
    );
}

export default HomePages;