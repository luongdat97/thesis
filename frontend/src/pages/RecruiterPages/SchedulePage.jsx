import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import Schedule from '../../components/Recruiter/Schedule'
import MainLayout from '../../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function HomePage() {
    return (
        <MainLayout>
            <Schedule></Schedule>
        </MainLayout>
    )
}

export default HomePage