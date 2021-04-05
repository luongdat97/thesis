import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import EditJob from '../../components/Recruiter/EditJob'
import MainLayout from '../../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function HomePage() {
    return (
        <MainLayout>
            <EditJob></EditJob>
        </MainLayout>
    )
}

export default HomePage