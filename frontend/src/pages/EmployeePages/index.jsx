import React from 'react';
import Routes from './Routes'
import { Layout, Menu, Input, Typography, Row, Col, Card, List } from 'antd';
import {
    BrowserRouter,
    Switch,
    useRouteMatch,
    Link
} from "react-router-dom";
import EmployeeLayout from '../../containers/EmployeeLayout'
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

function HomePages() {
    let { path, url } = useRouteMatch();

    return (
        <div className="App">
            <EmployeeLayout url={url}>
                <Routes path={path} />
            </EmployeeLayout>

        </div>
    );
}

export default HomePages;