import React, { useRef, useState, useEffect } from 'react';
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

function useOutsideAlerter(ref, callback) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                //alert("You clicked outside of me!");
                if (callback) callback()
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export default function Notification(props) {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => setShow(false));
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
            <span onClick={() => setShow(!show)} style={{ cursor: "pointer", fontSize: "1.7em" }}>
                <Badge count={notiList.filter(item => !item.read).length} size="small" offset={[5, -3]}>
                
                    {!show && <i className="fas fa-bell" style={{ fontSize: "1.7em" }}></i>}
                    {show && <i className="fas fa-bell text-primary" style={{ fontSize: "1.7em" }}></i>}
                </Badge>

            </span>
            <div ref={wrapperRef} className="position-absolute bg-white pb-3" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", width: 300, right: -100, zIndex: 10000, top: 50, lineHeight: "initial", borderRadius: 10, display: show ? "block" : "none" }} >
                <Title level={3} className="m-3">Thông báo</Title>
                <div className="px-3" style={{ maxHeight: 500, overflow: "auto" }}>
                    {notiList.map(item => (
                        <NotiCard data={item} key={item.id} fetchNotification={fetchNotification} />
                    ))}
                </div>
            </div>
        </>

    )

}