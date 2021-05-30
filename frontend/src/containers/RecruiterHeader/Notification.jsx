import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography, Divider } from 'antd';
import { Link } from 'react-router-dom'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../components/authenticate'
const { Title } = Typography;

const { Header } = Layout;

export default function Notification(props) {

    return (
        <div className="position-absolute bg-white p-3" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", maxHeight: 600, width: 300, right: -100, zIndex: 10000, top: 50, lineHeight: "initial", borderRadius: 10 }} >
            <Title level={3}>Thông báo</Title>
            <div className="d-flex border-bottom mb-3 pb-1">
                <i class="far fa-envelope" style={{ fontSize: "1.5em" }}></i><br></br>
                <div className="ml-3">
                    Tin tuyển dụng <a>Tuyển dụng fullstack</a> của bạn đã được xác thực <br></br>
                    <span style={{ color: "#555", fontSize: "0.85em" }}>2 ngày trước</span>
                </div>
                <i class="fas fa-circle" style={{ fontSize: "1em", color: "#1890ff" }}></i>
            </div>

            <div className="d-flex border-bottom mb-3 pb-1">
                <i class="far fa-envelope" style={{ fontSize: "1.5em" }}></i><br></br>
                <div className="ml-3">
                    Tin tuyển dụng <a>Tuyển dụng fullstack</a> của bạn đã được xác thực <br></br>
                    <span style={{ color: "#555", fontSize: "0.85em" }}>2 ngày trước</span>
                </div>
                <i class="fas fa-circle" style={{ fontSize: "1em", color: "#1890ff" }}></i>
            </div>

            <div className="d-flex border-bottom mb-3 pb-1">
                <i class="far fa-envelope-open" style={{ fontSize: "1.5em" }}></i>
                <div className="ml-3">
                    Tin tuyển dụng <a>Tuyển dụng fullstack</a> của bạn đã được xác thực <br></br>
                    <span style={{ color: "#555", fontSize: "0.85em" }}>2 ngày trước</span>
                </div>
            </div>

        </div>
    )

}