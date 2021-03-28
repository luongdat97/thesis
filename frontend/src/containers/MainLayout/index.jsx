import React, { useState, useEffect } from 'react';
import StyleList from './index.style'
import { Layout, Menu, Input, Typography } from 'antd';
import Header from '../Header'
const {Title} = Typography;

const { Content, Footer } = Layout;

function MainLayout({children}) {
    return (
        <StyleList>
            <Layout>
                <Header />
                <Content className="site-layout" style={{marginTop: 64 }}>
                    <div className="site-layout-background" style={{margin: "0px 100px" }}>
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </StyleList>
    )
}

export default MainLayout