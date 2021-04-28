import React from 'react';
import Routes from './Routes'
import { Layout, Menu, Input, Typography, Row, Col, Card, List } from 'antd';
import {
    BrowserRouter,
    Switch,
    useRouteMatch,
    Link
} from "react-router-dom";
import ApplicantLayout from '../../containers/ApplicantLayout'
import ApplicantSider from '../../containers/ApplicantSider'
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

function HomePages() {
    let { path, url } = useRouteMatch();

    return (
        <div className="App">
            <ApplicantLayout url={url}>
                <Routes path={path} />
            </ApplicantLayout>

        </div>
    );
}

export default HomePages;