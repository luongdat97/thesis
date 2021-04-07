import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import JobSearch from '../components/JobSearch'
import MainLayout from '../containers/MainLayout'
const {Title} = Typography;

const { Header, Content, Footer } = Layout;

function JobSearchPage() {
    return (
            <MainLayout>
                <JobSearch />
            </MainLayout>
    )
}

export default JobSearchPage