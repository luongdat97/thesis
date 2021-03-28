import React, { useState, useEffect } from 'react';
import {Row, Col, Typography, Button} from 'antd';
const { Title, Text } = Typography;

const GeneralJobCard = (props) => {
    return (
        <Row gutter={16}>
            <Col span={4}>
                <img
                    alt="example"
                    src={props.logoUrl}
                    style={{ width: "100%" }}
                />
            </Col>
            <Col span={16}>
                <Title level={5}>Lê Ánh Tuyết</Title>
                Bộ phận tuyển dụng
                <Text strong type="secondary">Công ty FPT</Text>
            </Col>
            <Col span={4}>
                5 ngày trước
            </Col>
        </Row>
    )
}

export default GeneralJobCard