import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography, Card, Avatar } from 'antd';
import { Link } from 'react-router-dom'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const { Title } = Typography;

const { Header } = Layout;

export default function MainHeader(props) {
    const url = props.url
    return (
        <Card style={{ minHeight: 700, height: "100%" }}>
            <div className="p-4 border-bottom">
                <Avatar size="large" style={{ width: "100%", height: "auto" }} src={"https://static.topcv.vn/company_logos/fpt-software-5f7b5509924a3.jpg"} />
            </div>
            <Link to={`${url}/post-job`}>
                <div className="text-dark d-flex align-items-center border-bottom" style={{height: 35}}>Đăng tin tuyển dụng</div>
            </Link>
            <Link to={`${url}/job-manager`}>
                <div className="text-dark d-flex align-items-center border-bottom" style={{height: 35}}>Quản lý tin tuyển dụng</div>
            </Link>
            <Link to={`${url}/candidate-search`}>
                <div className="text-dark d-flex align-items-center border-bottom" style={{height: 35}}>Tìm ứng viên</div>
            </Link>
            <Link to={`${url}/search-campaign`}>
                <div className="text-dark d-flex align-items-center border-bottom" style={{height: 35}}>Tạo chiến dịch tìm kiếm</div>
            </Link>
            <Link to={`${url}/candidate-manage`}>
                <div className="text-dark d-flex align-items-center border-bottom" style={{height: 35}}>Quản lý ứng viên</div>
            </Link>
            <Link to={`${url}/schedule`}>
                <div className="text-dark d-flex align-items-center border-bottom" style={{height: 35}}>Lịch hẹn ứng viên</div>
            </Link>
            <Link to={`${url}/company-info`}>
                <div className="text-dark d-flex align-items-center border-bottom" style={{height: 35}}>Thông tin công ty</div>
            </Link>
        </Card>
    )
}