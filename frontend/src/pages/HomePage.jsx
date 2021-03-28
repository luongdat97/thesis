import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import Home from '../components/home/Home'
import MainLayout from '../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function HomePage() {
    return (
            <MainLayout>
                <Home></Home>
            </MainLayout>
    )
}

export default HomePage