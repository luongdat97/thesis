import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import ViewCandidates from '../../components/Recruiter/ViewCandidates'
import MainLayout from '../../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function HomePage() {
    return (
        <MainLayout>
            <ViewCandidates></ViewCandidates>
        </MainLayout>
    )
}

export default HomePage