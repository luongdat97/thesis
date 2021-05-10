import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Divider, Card } from 'antd';
import moment from 'moment'
import util from '../../../../helper/util'
const { Title, Text } = Typography;
const HorizontalJobCard = (props) => {
    let job = props.job
    return (
        <>
            <div className="d-flex text-dark">

                <img
                    alt="example"
                    src={job.company.logo? job.company.logo.url : 'https://res.cloudinary.com/project0407/image/upload/v1619883654/project/NO_IMG_600x600-1_iskkty.png'}
                    style={{ width: 70, height: 70, objectFit: 'contain' }}
                />

                <Row gutter={16} className='border-bottom pb-2' className="w-100 ml-3">

                    <Col span={10}>
                        <Title level={5} className="m-0">{job.title}</Title>
                        <Text>{job.company.name}</Text>
                        <br />
                Khu vực: {job.workplace}
                    </Col>
                    <Col span={8}>
                        <i className="fas fa-dollar-sign"></i>&nbsp;Lương: {util.toSalaryString(job.salary)}
                    </Col>
                    <Col span={6}>
                        <i className="far fa-clock"></i>&nbsp;Hạn nộp {moment(job.endDate).format("DD/MM/YYYY")}
                    </Col>
                </Row>

            </div>
            <Divider className="my-1 mt-2"></Divider>
        </>
    )
}

export default HorizontalJobCard