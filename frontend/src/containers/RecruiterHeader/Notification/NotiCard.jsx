import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography, Divider } from 'antd';
import { Link } from 'react-router-dom'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../../components/authenticate'
import notificationApi from '../../../api/notificationApi'
import jobApi from '../../../api/jobApi'
const { Title } = Typography;

const { Header } = Layout;

export default function NotiCard(props) {
    const [cookies] = useCookies(['user'])
    const [source, setSource] = useState({})
    const user_id = cookies.user.id
    const noti = props.data
    useEffect(async () => {
        let sourceData = props.data
        if (sourceData.sourceType === "job" || sourceData.sourceType === "appliedJob") {
            let source = await jobApi.getJobById(sourceData.source_id)
            setSource(source.data)
            console.log(source)
        }
    }, [])

    const setNotiRead = async (id) => {
        await notificationApi.editNotification({ id, read: true })
        props.fetchNotification()
    }

    const delNoti = async (id) => {
        await notificationApi.delNotification(id)
        props.fetchNotification()
    }

    return (
        <div className="d-flex border-bottom mb-3 pb-1" style={{ cursor: "pointer" }} onClick={() => setNotiRead(noti.id)}>

            <><i class="far fa-envelope" style={{ fontSize: "1.5em" }}></i><br></br></>

            {/* {noti.read &&
                <i class="far fa-envelope-open" style={{ fontSize: "1.5em" }}></i>
            } */}
            <div className="ml-3">
                {props.data.sourceType === "job" &&
                    <>Tin tuyển dụng <a>{source.title}</a> của bạn đã {source.state == 1 ? "được xác thực" : "bị từ chối"} <br></br></>
                }
                {props.data.sourceType === "appliedJob" &&
                    <>Bạn có đơn ứng tuyển mới tới tin <a>{source.title}</a> <br></br></>
                }
                <span style={{ color: "#555", fontSize: "0.85em" }}>2 ngày trước</span>
            </div>
            {!noti.read &&
                <i class="fas fa-circle" style={{ fontSize: "1em", color: "#1890ff" }}></i>
            }
            <i class="far fa-trash-alt ml-1" onClick={() => delNoti(noti.id)}></i>
        </div>
    )

}
