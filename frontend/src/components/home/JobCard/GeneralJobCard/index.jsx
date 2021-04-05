import React, { useState, useEffect } from 'react';
import {Row, Col, Typography} from 'antd';
const { Title, Text } = Typography;

const GeneralJobCard = (props) => {
    return (
        <Row gutter={16}>
            <Col span={8}>
                <img
                    alt="example"
                    src={props.logoUrl}
                    style={{ width: "100%" }}
                />
            </Col>
            <Col span={16}>
                <Title level={5}>Nhân viên kinh doanh online</Title>
                <Text strong type="secondary">Công ty FPT</Text>
                <Row>
                    <Col span={24}>
                        <i className="fas fa-dollar-sign"></i>&nbsp;
                        11-21 triệu
                    </Col>
                    <Col span={24}>
                        <i className="fas fa-map-marked-alt"></i>&nbsp;
                        Phú thọ, Vĩnh Phúc
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default GeneralJobCard