import React, { useState, useEffect } from 'react';
import StyleList from './index.style'
import { Layout, Menu, Input, Typography } from 'antd';
import Header from '../ApplicantHeader'
import Footer from '../Footer'
const {Title} = Typography;

const { Content } = Layout;

function MainLayout(props) {
    const url = props.url
    return (
        <StyleList>
            <Layout>
                <Header url={url}/>
                <Content className="site-layout" style={{marginTop: 64 }}>
                    <div className="bootstrap-container site-layout-background" style={{minHeight: 645 }}>
                        {props.children}
                    </div>
                </Content>
                <Footer></Footer>
            </Layout>
        </StyleList>
    )
}

export default MainLayout