import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import WorkHistory from '../../components/Manager/WorkHistory'
import MainLayout from '../../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function HomePage() {
    return (
            <MainLayout>
                <WorkHistory></WorkHistory>
            </MainLayout>
    )
}

export default HomePage