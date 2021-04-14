import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, Collapse, Card, Typography, Space } from 'antd';
import styled from 'styled-components'
const { Option } = Select;
const { Panel } = Collapse;
const { Meta } = Card;
const { Title, Text } = Typography;

export default function JobSumary() {
    return (
        <Card>
            <Row gutter={16}>
                <Col span={4} className="px-5">
                    <img className="w-100" alt="company logo" src='https://res.cloudinary.com/project0407/image/upload/v1615347249/project/company%20logo/cong-ty-co-phan-dau-tu-phat-trien-anh-va-em-59db4c9957711_rs_abw9g7.jpg'></img>
                </Col>
                <Col span={12}>
                    <Title level={3} className="text-uppercase text-success">Nhân viên tư vấn mỹ phẩm</Title>
                    <Title level={5}>Công ty TNHH AmorePacific Việt Nam</Title>
                    <Text><i className="fas fa-map-marker-alt"></i> Vincom Smart City, Đai Mỗ, Từ Liêm, Hà Nội/ Aeon Long Biên, Hà Nội</Text><br />
                    <Text><i className="far fa-clock"></i> Hạn nộp hồ sơ: 08/04/2021</Text>
                </Col>
                <Col span={8}>
                    <Space direction="vertical" size="large">
                        <Button size="large" type="primary" style={{ background: "#73d13d", borderColor: "#73d13d" }}>Ứng tuyển ngay</Button>
                        <Button size="large">Lưu tin</Button>
                    </Space>

                </Col>
            </Row>
        </Card>

    )
}
