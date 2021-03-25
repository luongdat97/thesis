import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import RecruiterVisit from '../../components/RecruiterVisit'
import MainLayout from '../../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function HomePage() {
    return (
            <MainLayout>
                <RecruiterVisit></RecruiterVisit>
            </MainLayout>
    )
}

export default HomePage