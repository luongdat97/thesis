import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import JobManager from '../../components/Recruiter/JobManager'
import MainLayout from '../../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function HomePage() {
    return (
        <MainLayout>
            <JobManager></JobManager>
        </MainLayout>
    )
}

export default HomePage