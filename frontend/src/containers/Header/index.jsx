import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import SearchBar from './SearchBar';
const { Title } = Typography;
const { Search } = Input;
const { Header } = Layout;

export default function MainHeader(props) {
    const location = useLocation();
    const url = props.url
    const [selectedKey, setSelectedKey] = useState("2")
    useEffect(() => {
        const pathname = location.pathname
        if (pathname.startsWith("/job-search")) {
            setSelectedKey("2")
        } else if (pathname.startsWith("/job-search-it")) {
            setSelectedKey("3")
        } else if (pathname.startsWith("/cv-template")) {
            setSelectedKey("4")
        } else if (pathname.startsWith("/register")) {
            setSelectedKey("5")
        } else if (pathname.startsWith("/login")) {
            setSelectedKey("6")
        } else if (pathname.startsWith("/recruiter-intro")) {
            setSelectedKey("7")
        }
    }, [location.pathname])
    return (
        <Header className="d-flex" style={{ position: 'fixed', zIndex: 1, width: '100%', padding: '0 100px' }}>
            <div className="logo d-flex align-items-center">
                <img className="mr-2" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style={{ width: 50, height: 50 }} />
                <Title level={3} className="text-white">Việc làm</Title>
            </div>
            <div className="d-flex align-items-center mr-auto">
                <SearchBar />
            </div>
            <Menu theme="dark" style={{ width: 584 }} mode="horizontal" selectedKeys={[selectedKey]} overflowedIndicator={<i className="fas fa-bars"></i>}	>
                <Menu.SubMenu key="1" title="Việc làm">
                    <Menu.Item key="2"><Link to={`/job-search`}>Tất cả việc làm</Link></Menu.Item>
                    <Menu.Item key="3"><Link to={`/job-search-it`}>Việc làm IT</Link></Menu.Item>
                </Menu.SubMenu>

                <Menu.Item key="4"><Link to={`/cv-template`}>Mẫu CV</Link></Menu.Item>
                <Menu.Item key="5"><Link to={`/register`}>Đăng ký</Link></Menu.Item>
                <Menu.Item key="6"><Link to={`/login`}>Đăng nhập</Link></Menu.Item>
                <Menu.Item key="7"><Link to={`/recruiter-intro`}>Nhà tuyển dụng</Link></Menu.Item>
            </Menu>
        </Header>
    )
}