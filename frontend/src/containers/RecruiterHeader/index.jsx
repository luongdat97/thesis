import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import {useAuth} from '../../components/authenticate'
import Notification from './Notification'
const { Title } = Typography;

const { Header } = Layout;

export default function MainHeader(props) {
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState("1")
    useEffect(() => {
        const pathname = location.pathname
        if (pathname.startsWith("/recruiter/job-manager")) {
            setSelectedKey("1")
        } else if (pathname.startsWith("/recruiter/candidate-search")) {
            setSelectedKey("2")
        } else if (pathname.startsWith("/recruiter/candidate-manage")) {
            setSelectedKey("3")
        } else if (pathname.startsWith("/recruiter/profile")) {
            setSelectedKey("5")
        } else if (pathname.startsWith("/recruiter/company-info")) {
            setSelectedKey("6")
        } else if (pathname.startsWith("/recruiter/change-pass")) {
            setSelectedKey("7")
        }
    }, [location.pathname])
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
    
            <Menu theme="dark" style={{ width: 530 }} mode="horizontal" selectedKeys={[selectedKey]} overflowedIndicator={<i className="fas fa-bars"></i>}	>
                <Menu.Item key="1"><Link to={`/recruiter/job-manager`}>Tin tuyển dụng</Link></Menu.Item>
                <Menu.Item key="2"><Link to={`/recruiter/candidate-search`}>Tìm ứng viên</Link></Menu.Item>
                <Menu.Item key="3"><Link to={`/recruiter/candidate-manage`}>Quản lý ứng viên</Link></Menu.Item>
                
                <Menu.SubMenu key="4" icon={<SettingOutlined />} title="Tài khoản">
                        <Menu.Item key="5"><Link to={`/recruiter/profile`}></Link>Thông tin cá nhân</Menu.Item>
                        <Menu.Item key="6"><Link to={`/recruiter/company-info`}></Link>Thông tin công ty</Menu.Item>
                        <Menu.Item key="7"><Link to={`/recruiter/change-pass`}></Link>Đổi mật khẩu</Menu.Item>
                        <Menu.Item key="8" className="border-top" onClick={() => auth.signout(() => history.push("/"))}><i className="fas fa-sign-out-alt text-white"></i> Đăng xuất</Menu.Item>
                </Menu.SubMenu>
            </Menu>
            <div className="position-relative">
                <Notification />
            </div>
            
        </Header>
    )
}