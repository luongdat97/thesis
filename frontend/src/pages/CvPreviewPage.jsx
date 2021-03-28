import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import CvPreview from '../components/cv/CvPreview'
import MainLayout from '../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function HomePage() {
    return (
                <CvPreview></CvPreview>
    )
}

export default HomePage