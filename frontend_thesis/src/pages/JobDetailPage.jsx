import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import JobDetail from '../components/JobDetail'
import MainLayout from '../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function JobDetailPage() {
    return (
            <MainLayout>
                <JobDetail />
            </MainLayout>
    )
}

export default JobDetailPage