import React, { useState, useEffect } from 'react';
import {Row, Col, Typography, Button} from 'antd';
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
                <Title level={5}>Nhân viên kinh doanh online</Title>
                <Text strong type="secondary">Công ty FPT</Text>
                <Row>
                    <Col span={8}>
                        <i className="fas fa-dollar-sign"></i>&nbsp;
                        Lương: 11-21 triệu
                    </Col>
                    <Col span={8}>
                        <i className="fas fa-map-marked-alt"></i>&nbsp;
                        Địa điểm: Phú thọ, Vĩnh Phúc
                    </Col>
                    <Col span={8}>
                        <i className="far fa-clock"></i>&nbsp;
                        Hạn nộp: 20/4/2021
                    </Col>
                </Row>
            </Col>
            <Col span={3}>
                <Button><i className="far fa-trash-alt" style={{color: "inherit"}}></i>&nbsp;Bỏ lưu</Button>
            </Col>
        </Row>
    )
}

export default GeneralJobCard