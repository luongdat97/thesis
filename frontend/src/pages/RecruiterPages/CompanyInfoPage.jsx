import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import CompanyInfo from '../../components/Recruiter/CompanyInfo'
import MainLayout from '../../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function HomePage() {
    return (
        <MainLayout>
            <CompanyInfo></CompanyInfo>
        </MainLayout>
    )
}

export default HomePage