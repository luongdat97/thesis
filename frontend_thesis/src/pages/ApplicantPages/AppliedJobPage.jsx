import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import AppliedJob from '../../components/AppliedJob'
import MainLayout from '../../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function HomePage() {
    return (
            <MainLayout>
                <AppliedJob></AppliedJob>
            </MainLayout>
    )
}

export default HomePage