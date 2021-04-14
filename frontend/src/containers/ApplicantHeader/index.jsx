import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import { Link } from 'react-router-dom'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const { Title } = Typography;

const { Header } = Layout;

export default function MainHeader(props) {
    const url = props.url
    return (
        <Header className="d-flex" style={{ position: 'fixed', zIndex: 1, width: '100%', padding: '0 100px' }}>
            <div className="logo d-flex align-items-center">
                <img className="mr-2" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style={{ width: 50, height: 50 }} />
                <Title level={3} className="text-white">Việc làm</Title>
            </div>
            <div className="d-flex align-items-center mr-auto">
                <Input style={{ width: 300, height: 50, borderRadius: 25 }} placeholder="Nhập việc làm bạn muốn tìm..." prefix={<i className="fas fa-search"></i>} />
            </div>
            <Menu theme="dark" style={{ width: 330 }} mode="horizontal" defaultSelectedKeys={['1']} overflowedIndicator={<i className="fas fa-bars"></i>}	>
                <Menu.Item key="1"><Link to={`/applicant/job-search`}>Việc làm</Link></Menu.Item>
                <Menu.Item key="3"><Link to={`/applicant/cv-template`}>Mẫu CV</Link></Menu.Item>
                <Menu.SubMenu key="4" icon={<SettingOutlined />} title="Tài khoản">
                        <Menu.Item key="5"><Link to={`/applicant/individual/saved-job`}></Link>Việc làm đã lưu</Menu.Item>
                        <Menu.Item key="6"><Link to={`/applicant/individual/applied-job`}></Link>Việc ứng tuyển</Menu.Item>
                        <Menu.Item key="7"><Link to={`/applicant/individual/suitable-job`}></Link>Việc làm phù hợp</Menu.Item>
                        <Menu.Item key="8"><Link to={`/applicant/individual/setting-job`}></Link>Cài đặt gợi ý</Menu.Item>
                        <Menu.Item key="9"><Link to={`/applicant/individual/recruiter-visit`}></Link>Nhà tuyển dụng xem hồ sơ</Menu.Item>
                        <Menu.Item key="10" className="border-top"><i class="fas fa-sign-out-alt text-white"></i> Đăng xuất</Menu.Item>
                </Menu.SubMenu>
            </Menu>
            <div><span className="text-white mr-3">Chào, Đạt</span></div>
            <div><span><i className="fas fa-bell text-white"></i></span></div>
            
        </Header>
    )
}