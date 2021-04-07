import React, { useState, useEffect } from 'react';
import {Row, Col, Typography} from 'antd';
const { Title, Text } = Typography;
const HorizontalJobCard = (props) => {
    return (
        <Row gutter={16}>
            <Col span={3}>
                <img
                    alt="example"
                    src={props.logoUrl}
                    style={{ width: "100%" }}
                />
            </Col>
            <Col span={10}>
                <Title level={5}>Nhân viên kinh doanh online</Title>
                <Text>Công ty FPT</Text>
            </Col>
            <Col span={4}>
                <i className="fas fa-dollar-sign"></i>&nbsp;
                11-21 triệu
            </Col>
            <Col span={5}>
                <i className="fas fa-map-marker-alt"></i>&nbsp;
                Phú thọ, Vĩnh Phúc
            </Col>
        </Row>
    )
}

export default HorizontalJobCard