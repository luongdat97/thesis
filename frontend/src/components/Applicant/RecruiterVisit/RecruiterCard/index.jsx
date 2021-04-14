import React, { useState, useEffect } from 'react';
import {Row, Col, Typography, Button, Space} from 'antd';
const { Title, Text } = Typography;

const GeneralJobCard = (props) => {
    return (
        <Row gutter={16} className="border-bottom">
            <Col span={3}>
                <img
                    alt="example"
                    src={props.logoUrl}
                    style={{ width: "100%" }}
                />
            </Col>
            <Col span={18}>
                <Space></Space>
                <Title level={5}>Lê Ánh Tuyết</Title>
                
                <Text strong type="secondary">Công ty FPT</Text><br></br>
                <Text>Bộ phận tuyển dụng</Text>
            </Col>
            <Col span={3}>
                5 ngày trước
            </Col>
        </Row>
    )
}

export default GeneralJobCard