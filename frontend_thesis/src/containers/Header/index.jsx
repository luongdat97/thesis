import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
const {Title} = Typography;

const { Header} = Layout;

export default function MainHeader() {
    return (
        <Header className="d-flex" style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor: '#fff', padding: '0 100px' }}>
            <div className="logo d-flex align-items-center">
                <img className="mr-2" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style={{width: 50, height: 50}}/>
                <Title level={3}>Việc làm</Title>
            </div>
            <div class="d-flex align-items-center mr-auto">
                <Input style={{ width: 300, height: 50, borderRadius: 25 }} placeholder="Nhập việc làm bạn muốn tìm..." prefix={<i class="fas fa-search"></i>} />
            </div>
            <Menu style={{ width: 564 }} mode="horizontal" defaultSelectedKeys={['2']} overflowedIndicator={<i class="fas fa-bars"></i>}	>
                <Menu.Item key="1">Việc làm</Menu.Item>
                <Menu.Item key="2">Ứng viên</Menu.Item>
                <Menu.Item key="3">Mẫu CV</Menu.Item>
                <Menu.Item key="4">Công ty</Menu.Item>
                <Menu.Item key="5">Đăng ký</Menu.Item>
                <Menu.Item key="6">Đăng nhập</Menu.Item>
            </Menu>
        </Header>
    )
}