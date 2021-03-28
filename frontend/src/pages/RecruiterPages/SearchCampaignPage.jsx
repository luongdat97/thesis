import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import SearchCampaign from '../../components/Recruiter/SearchCampaign'
import MainLayout from '../../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function HomePage() {
    return (
        <MainLayout>
            <SearchCampaign></SearchCampaign>
        </MainLayout>
    )
}

export default HomePage