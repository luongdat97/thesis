import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import CvTemplate from '../../components/Employee/CvTemplate'
import MainLayout from '../../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function HomePage() {
    return (
            <MainLayout>
                <CvTemplate></CvTemplate>
            </MainLayout>
    )
}

export default HomePage