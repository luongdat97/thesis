import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import Account from '../../components/Manager/Account'
import MainLayout from '../../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function HomePage() {
    return (
            <MainLayout>
                <Account></Account>
            </MainLayout>
    )
}

export default HomePage