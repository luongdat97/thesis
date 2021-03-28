import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import VerifyCompany from '../../components/Employee/VerifyCompany'
import MainLayout from '../../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function HomePage() {
    return (
            <MainLayout>
                <VerifyCompany></VerifyCompany>
            </MainLayout>
    )
}

export default HomePage