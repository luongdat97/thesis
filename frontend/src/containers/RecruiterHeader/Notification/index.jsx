import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography, Divider, Badge } from 'antd';
import { Link } from 'react-router-dom'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../../components/authenticate'
import notificationApi from '../../../api/notificationApi'
import NotiCard from "./NotiCard"
const { Title } = Typography;

const { Header } = Layout;

export default function Notification(props) {
    const [cookies] = useCookies(['user'])
    const [notiList, setNotiList] = useState([])
    const [show, setShow] = useState(false)
    const user_id = cookies.user.id
    useEffect(() => {
        fetchNotification()
    }, [])
    const fetchNotification = async () => {
        console.log(cookies.user)
        let notiList = await notificationApi.getNotificationList({ user_id })
        console.log(notiList)
        setNotiList(notiList.data)
    }


    return (
        <>
            <span onClick={() => setShow(!show)} style={{ cursor: "pointer", fontSize: "1.5em" }}>
                <Badge count={notiList.filter(item => !item.read).length} size="small" offset={[5, -3]}>
                    <i className="fas fa-bell text-white"></i>
                </Badge>

            </span>
            <div className="position-absolute bg-white p-3" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", maxHeight: 600, width: 300, right: -100, zIndex: 10000, top: 50, lineHeight: "initial", borderRadius: 10, display: show ? "block" : "none" }} >
                <Title level={3}>Thông báo</Title>
                {notiList.map(item => (
                    <NotiCard data={item} key={item.id} fetchNotification={fetchNotification} />
                ))}
            </div>
        </>

    )

}