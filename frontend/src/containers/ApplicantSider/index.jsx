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
                <Avatar size="large" style={{ width: "100%", height: "auto" }} src={"https://timviec.com.vn/storage/avatars/528993/Jg5tKRGfcTs4kWZwDmC8WwKGVeqqzxngzlnyK7is.png"} />
            </div>
            <Link to={`${url}/manage-cv`}>
                <div className="text-dark d-flex align-items-center border-bottom" style={{height: 35}}>Quản lý CV</div>
            </Link>
            <Link to={`${url}/saved-job`}>
                <div className="text-dark d-flex align-items-center border-bottom" style={{height: 35}}>Công việc đã lưu</div>
            </Link>
            <Link to={`${url}/applied-job`}>
                <div className="text-dark d-flex align-items-center border-bottom" style={{height: 35}}>Công việc đã ứng tuyển</div>
            </Link>
            <Link to={`${url}/suitable-job`}>
                <div className="text-dark d-flex align-items-center border-bottom" style={{height: 35}}>Công việc phù hợp</div>
            </Link>
            <Link to={`${url}/setting-job`}>
                <div className="text-dark d-flex align-items-center border-bottom" style={{height: 35}}>Cài đặt gợi ý</div>
            </Link>
            <Link to={`${url}/recruiter-visit`}>
                <div className="text-dark d-flex align-items-center border-bottom" style={{height: 35}}>Nhà tuyển dụng đã xem hồ sơ</div>
            </Link>
        </Card>
    )
}