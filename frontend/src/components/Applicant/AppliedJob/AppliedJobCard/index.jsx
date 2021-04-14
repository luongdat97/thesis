import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Space } from 'antd';
const { Title, Text } = Typography;

const GeneralJobCard = (props) => {
    return (
        <Row gutter={16} className="mb-4">
            <Col span={3}>
                <img
                    alt="example"
                    src={props.logoUrl}
                    style={{ width: "100%" }}
                />
            </Col>
            <Col span={11}>
                <Title level={5}>Nhân viên kinh doanh online</Title>
                <Text strong type="secondary">Công ty FPT</Text>
                <Row>
                    <Col span={24}>
                        <i className="fas fa-dollar-sign"></i>&nbsp;
                        Lương: 11-21 triệu
                    </Col>
                    <Col span={24}>
                        <i className="fas fa-map-marked-alt"></i>&nbsp;
                        Địa điểm: Phú thọ, Vĩnh Phúc
                    </Col>
                </Row>
            </Col>
            <Col span={6}>
                Trạng thái: chờ phản hồi
                <br></br>
                Ngày nộp đơn: 20/3/2021
            </Col>
            <Col span={4}>
                <Space direction="vertical">
                    <Button size="small"><i className="far fa-eye" style={{ color: "inherit" }}></i>&nbsp; Xem CV</Button>
                    <Button size="small"><i className="far fa-comment-dots" style={{ color: "inherit" }}></i>&nbsp; Nhắn tin</Button>
                </Space>
            </Col>
        </Row>
    )
}

export default GeneralJobCard