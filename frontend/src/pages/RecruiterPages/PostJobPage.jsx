import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import PostJob from '../../components/Recruiter/PostJob'
import MainLayout from '../../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function HomePage() {
    return (
        <MainLayout>
            <PostJob></PostJob>
        </MainLayout>
    )
}

export default HomePage