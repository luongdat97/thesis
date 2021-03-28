import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import ManagerCv from '../components/cv/ManageCv'
import MainLayout from '../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function HomePage() {
    return (
            <MainLayout>
                <ManagerCv></ManagerCv>
            </MainLayout>
    )
}

export default HomePage