import React, { useState, useEffect } from 'react';
import { Row, Col, Typography } from 'antd';
import moment from 'moment'
const { Title, Text } = Typography;
const HorizontalJobCard = (props) => {
    let job = props.job
    return (
        <Row gutter={16} className='border-bottom pb-2'>
            <Col span={2}>
                <img
                    alt="example"
                    src={props.logoUrl}
                    style={{ width: "100%" }}
                />
            </Col>
            <Col span={10}>
                <Title level={5} className="m-0">{job.title}</Title>
                <Text>Công ty FPT</Text>
                <br />
                Khu vực: {job.workplace}
            </Col>
            <Col span={6}>
                <i className="fas fa-dollar-sign"></i>&nbsp;Lương:
                {job.salary.from} - {job.salary.to} triệu
            </Col>
            <Col span={6}>
                <i className="far fa-clock"></i>&nbsp;Hạn nộp {moment(job.endDate).format("DD/MM/YYYY")}
            </Col>
        </Row>
    )
}

export default HorizontalJobCard