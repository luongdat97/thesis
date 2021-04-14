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
import RecruiterSider from '../../containers/RecruiterSider'
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];
function HomePages() {
    let { path, url } = useRouteMatch();

    return (
        <div className="App">
            <ApplicantLayout url={url}>
                <Row gutter={30}>
                    <Col span={6}>
                        <RecruiterSider path={path} url={url}></RecruiterSider>
                    </Col>
                    <Col span={18}>
                        <Routes path={path} />
                    </Col>
                </Row>

            </ApplicantLayout>

        </div>
    );
}

export default HomePages;