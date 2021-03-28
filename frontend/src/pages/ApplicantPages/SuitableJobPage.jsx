import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import SuitableJob from '../../components/SuitableJob'
import MainLayout from '../../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function HomePage() {
    return (
            <MainLayout>
                <SuitableJob></SuitableJob>
            </MainLayout>
    )
}

export default HomePage