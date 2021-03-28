import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import SettingJob from '../../components/SettingJob'
import MainLayout from '../../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function HomePage() {
    return (
            <MainLayout>
                <SettingJob></SettingJob>
            </MainLayout>
    )
}

export default HomePage