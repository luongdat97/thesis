import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import {Link} from 'react-router-dom'
const {Title} = Typography;

const { Header} = Layout;

export default function MainHeader(props) {
    const url = props.url
    return (
        <Header className="d-flex" style={{ position: 'fixed', zIndex: 1, width: '100%', padding: '0 100px' }}>
            <div className="logo d-flex align-items-center">
                <img className="mr-2" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style={{width: 50, height: 50}}/>
                <Title level={3} className="text-white">Việc làm</Title>
            </div>
            <div className="d-flex align-items-center mr-auto">
                <Input style={{ width: 300, height: 50, borderRadius: 25 }} placeholder="Nhập việc làm bạn muốn tìm..." prefix={<i className="fas fa-search"></i>} />
            </div>
            <Menu theme="dark" style={{ width: 684 }} mode="horizontal" defaultSelectedKeys={['1']} overflowedIndicator={<i className="fas fa-bars"></i>}	>
                <Menu.Item key="1"><Link to={`/job-search`}>Việc làm</Link></Menu.Item>
                {/* <Menu.Item key="2"><Link to={`/candidate-search`}>Ứng viên</Link></Menu.Item> */}
                <Menu.Item key="3"><Link to={`/cv-template`}>Mẫu CV</Link></Menu.Item>
                <Menu.Item key="4">Công ty</Menu.Item>
                <Menu.Item key="5"><Link to={`/register`}>Đăng ký</Link></Menu.Item>
                <Menu.Item key="6"><Link to={`/login`}>Đăng nhập</Link></Menu.Item>
                <Menu.Item key="7"><Link to={`/recruiter-intro`}>Nhà tuyển dụng</Link></Menu.Item>
            </Menu>
        </Header>
    )
}