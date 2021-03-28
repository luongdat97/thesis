import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import SavedJob from '../../components/SavedJob'
import MainLayout from '../../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function HomePage() {
    return (
            <MainLayout>
                <SavedJob></SavedJob>
            </MainLayout>
    )
}

export default HomePage