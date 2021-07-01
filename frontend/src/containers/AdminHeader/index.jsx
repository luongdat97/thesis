import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import { Link } from 'react-router-dom'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import {useAuth} from '../../components/authenticate'
const { Title } = Typography;

const { Header } = Layout;

export default function MainHeader(props) {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const history = useHistory();
    let auth = useAuth();
    const logout = () => {
        console.log("logout.....")
        removeCookie("user",{ path: '/' })
        history.push("/")
    }
    const url = props.url
    return (
        <Header className="d-flex" style={{ position: 'fixed', zIndex: 1, width: '100%', padding: '0 180px' }}>
            <div className="logo d-flex align-items-center mr-auto">
                <img className="mr-2" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style={{ width: 50, height: 50 }} />
                <Title level={3} className="text-white">Việc làm</Title>
            </div>
            <Menu theme="dark" style={{ width: 290 }} mode="horizontal" defaultSelectedKeys={['1']} overflowedIndicator={<i className="fas fa-bars"></i>}	>
                <Menu.Item key="1"><Link to={`/admin/account-manage`}>Quản lý</Link></Menu.Item>
                
                <Menu.SubMenu key="4" icon={<SettingOutlined />} title="Tài khoản">
                        <Menu.Item key="5"><Link to={`/admin/profile`}></Link>Thông tin cá nhân</Menu.Item>
                        <Menu.Item key="6"><Link to={`/admin/change-pass`}></Link>Đổi mật khẩu</Menu.Item>
                        <Menu.Item key="10" className="border-top"  onClick={() => auth.signout(() => history.push("/"))}><i className="fas fa-sign-out-alt text-white"></i> Đăng xuất</Menu.Item>
                </Menu.SubMenu>
            </Menu>
            
        </Header>
    )
}