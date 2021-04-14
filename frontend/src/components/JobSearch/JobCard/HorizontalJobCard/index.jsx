import React, { useState, useEffect } from 'react';
import { Row, Col, Typography } from 'antd';
const { Title, Text } = Typography;
const HorizontalJobCard = (props) => {
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
                <Title level={5} className="m-0">Nhân viên kinh doanh online</Title>
                <Text>Công ty FPT</Text>
                <br />
                Khu vực:
                Vĩnh Phúc
            </Col>
            <Col span={6}>
                <i className="fas fa-dollar-sign"></i>&nbsp;Lương:
                11-21 triệu
            </Col>
            <Col span={6}>
                <i class="far fa-clock"></i>&nbsp;Hạn nộp:
                21/12/2021
            </Col>
        </Row>
    )
}

export default HorizontalJobCard