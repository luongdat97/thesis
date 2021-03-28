import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import CandidateManage from '../../components/Recruiter/CandidateManage'
import MainLayout from '../../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function HomePage() {
    return (
        <MainLayout>
            <CandidateManage></CandidateManage>
        </MainLayout>
    )
}

export default HomePage