import React, { useState, useEffect } from 'react';
import StyleList from './index.style'
import { Layout, Menu, Input, Typography } from 'antd';
import Header from '../Header'
import Footer from '../Footer'
const {Title} = Typography;

const { Content } = Layout;

function MainLayout(props) {
    const url = props.url
    return (
        <StyleList>
            <Layout>
                <Header url={url}/>
                <Content className="site-layout" style={{marginTop: 64, minHeight: 645 }}>
                    <div className="bootstrap-container site-layout-background">
                        {props.children}
                    </div>
                </Content>
                <Footer></Footer>
            </Layout>
        </StyleList>
    )
}

export default MainLayout