import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import VerifyJob from '../../components/Employee/VerifyJob'
import MainLayout from '../../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function HomePage() {
    return (
            <MainLayout>
                <VerifyJob></VerifyJob>
            </MainLayout>
    )
}

export default HomePage