import React, { useState, useEffect } from 'react';
import StyleList from './index.style'
import { Layout, Menu, Input, Typography } from 'antd';
import Header from '../Header'
const {Title} = Typography;

const { Content, Footer } = Layout;

function MainLayout(props) {
    const url = props.url
    return (
        <StyleList>
            <Layout>
                <Header url={url}/>
                <Content className="site-layout" style={{marginTop: 64 }}>
                    <div className="bootstrap-container site-layout-background">
                        {props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </StyleList>
    )
}

export default MainLayout