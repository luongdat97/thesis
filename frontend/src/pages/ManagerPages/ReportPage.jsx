import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import Report from '../../components/Manager/Report'
import MainLayout from '../../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function HomePage() {
    return (
            <MainLayout>
                <Report></Report>
            </MainLayout>
    )
}

export default HomePage