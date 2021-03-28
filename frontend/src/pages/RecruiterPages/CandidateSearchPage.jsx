import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import CandidateSearch from '../../components/Recruiter/CandidateSearch'
import MainLayout from '../../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function HomePage() {
    return (
        <MainLayout>
            <CandidateSearch></CandidateSearch>
        </MainLayout>
    )
}

export default HomePage