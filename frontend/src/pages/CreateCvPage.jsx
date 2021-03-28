import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import CreateCv from '../components/cv/CreateCv'
import MainLayout from '../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function HomePage() {
    return (
            <MainLayout>
                <CreateCv></CreateCv>
            </MainLayout>
    )
}

export default HomePage