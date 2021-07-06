import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Popconfirm } from 'antd';
import Util from "../../../../helper/util"
import moment from "moment"
import {Link} from "react-router-dom"
const { Title, Text } = Typography;

const GeneralJobCard = (props) => {
    const { job, deleteSavedJob } = props
    return (
        <Row gutter={16} className="border p-3">
            <Col span={3}>
                <img
                    alt="example"
                    src={job.company?.logo.url}
                    style={{ width: "100%" }}
                />
            </Col>
            <Col span={18}>
                <Link to={`/applicant/job-detail/${job.id}`}><Title level={5}><a>{job.title}</a></Title></Link>
                <Text strong type="secondary">{job.company?.name}</Text>
                <Row>
                    <Col span={8}>
                        <i className="fas fa-dollar-sign"></i>&nbsp;
                        Lương: {Util.toSalaryString(job.salary)}
                    </Col>
                    <Col span={8}>
                        <i className="fas fa-map-marked-alt"></i>&nbsp;
                        Địa điểm: {job.workplace}
                    </Col>
                    <Col span={8}>
                        <i className="far fa-clock"></i>&nbsp;
                        Hạn nộp: {moment(job.endDate).format("DD/MM/YYYY")}
                    </Col>
                </Row>
            </Col>
            <Col span={3}>
                <Popconfirm
                    title="Bạn có muốn bỏ lưu việc làm này?"
                    onConfirm={deleteSavedJob}
                    okText="Đồng ý"
                    cancelText="Thoát"
                >
                   <Button><i className="far fa-trash-alt" style={{ color: "inherit" }}></i>&nbsp;Xóa lời mời</Button>
                </Popconfirm>
                
            </Col>
        </Row>
    )
}

export default GeneralJobCard