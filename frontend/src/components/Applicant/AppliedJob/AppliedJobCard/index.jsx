import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Modal } from 'antd';
import Util from "../../../../helper/util"
import moment from "moment"
import { Link } from "react-router-dom"
const { Title, Text } = Typography;

function info(text) {
    Modal.info({
        title: 'Tin nhắn phản hồi',
        content: (
            <div style={{whiteSpace: "pre-line"}}>
                {text}
            </div>
        ),
        onOk() { },
    });
}

const GeneralJobCard = (props) => {
    
    let job = props.job
    return (
        <Row gutter={16} className="p-3 border" >
            <Col span={3}>
                <img
                    alt="example"
                    src={job.company?.logo.url}
                    style={{ width: "100%", maxHeight: 100, objectFit: "contain" }}
                />
            </Col>
            <Col span={9}>
                <Link to={`/applicant/job-detail/${job.id}`}><Title level={5}><a>{job.title}</a></Title></Link>
                <Text strong type="secondary">{job.company?.name}</Text>
                <Row>
                    <Col span={24}>
                        <i className="fas fa-dollar-sign"></i>&nbsp;
                        Lương: {Util.toSalaryString(job.salary)}
                    </Col>
                    <Col span={24}>
                        <i className="fas fa-map-marked-alt"></i>&nbsp;
                        Địa điểm: {job.workplace}
                    </Col>
                </Row>
            </Col>
            <Col span={6}>
                Hạn nộp đơn: {moment(job.endDate).format("DD/MM/YYYY")}
            </Col>
            <Col span={6}>
                Trạng thái: {!props.appliedJob.state ? "chờ phản hồi" : props.appliedJob.state == 1 ? "Đã chấp nhận đơn" : "Bị từ chối"}
                {props.appliedJob.state == 1 && <Button  onClick={() => info(props.appliedJob.message)} type="primary" className="mt-2"><i className="far fa-comment-dots" style={{ color: "inherit" }}></i>&nbsp; Xem phản hồi</Button>}
            </Col>
            {/* <Col span={4}>
                <Space direction="vertical">
                    <Button size="small"><i className="far fa-eye" style={{ color: "inherit" }}></i>&nbsp; Xem CV</Button>
                    <Button size="small"><i className="far fa-comment-dots" style={{ color: "inherit" }}></i>&nbsp; Nhắn tin</Button>
                </Space>
            </Col> */}
        </Row>
    )
}

export default GeneralJobCard