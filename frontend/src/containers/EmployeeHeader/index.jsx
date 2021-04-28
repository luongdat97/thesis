import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import { Link } from 'react-router-dom'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
const { Title } = Typography;

const { Header } = Layout;

export default function MainHeader(props) {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const history = useHistory();
    const logout = () => {
        console.log("logout.....")
        removeCookie("user",{ path: '/' })
        history.push("/")
    }
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
            <Menu theme="dark" style={{ width: 530 }} mode="horizontal" defaultSelectedKeys={['1']} overflowedIndicator={<i className="fas fa-bars"></i>}	>
                <Menu.Item key="1"><Link to={`/employee/verify-job`}>Xác thực tin</Link></Menu.Item>
                <Menu.Item key="2"><Link to={`/employee/verify-company`}>Xác thực công ty</Link></Menu.Item>
                
                <Menu.SubMenu key="4" icon={<SettingOutlined />} title="Tài khoản">
                        <Menu.Item key="5"><Link to={`/recruiter/saved-job`}></Link>Thông tin cá nhân</Menu.Item>
                        <Menu.Item key="6"><Link to={`/recruiter/company-info`}></Link>Thông tin công ty</Menu.Item>
                        <Menu.Item key="10" className="border-top"  onClick={logout}><i className="fas fa-sign-out-alt text-white"></i> Đăng xuất</Menu.Item>
                </Menu.SubMenu>
            </Menu>
            <div><span className="text-white mr-3">Chào, Luân</span></div>
            <div><span><i className="fas fa-bell text-white"></i></span></div>
            
        </Header>
    )
}