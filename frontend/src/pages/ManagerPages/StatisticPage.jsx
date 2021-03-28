import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import Statistic from '../../components/Manager/Statistic'
import MainLayout from '../../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function HomePage() {
    return (
            <MainLayout>
                <Statistic></Statistic>
            </MainLayout>
    )
}

export default HomePage