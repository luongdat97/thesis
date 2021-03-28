import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import AddCompany from '../../components/Recruiter/AddCompany'
import MainLayout from '../../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function HomePage() {
    return (
        <MainLayout>
            <AddCompany></AddCompany>
        </MainLayout>
    )
}

export default HomePage