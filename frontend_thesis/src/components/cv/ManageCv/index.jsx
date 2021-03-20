import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Row, Col, Collapse, Card, Typography, Button, Space, Slider, Radio } from 'antd';
import StyleManageCv from './index.style'
const { Option } = Select;
const { Panel } = Collapse;
const { Meta } = Card;
const { Title, Text } = Typography;
const { TextArea } = Input

function CvCard(props) {
    return (
        <>
            <Row gutter={16}>
                <Col span={4}>
                    <img className="w-100" alt="cv cover" src="https://res.cloudinary.com/project0407/image/upload/v1615735746/project/CV%20cover/modern_5_cktoed.webp"></img>
                </Col>
                <Col span={20}>
                    <div className="d-flex justify-content-between">
                        <Title level={3}>Tên file CV</Title>
                        <Space>
                            
                            <Button type="primary">Tải xuống</Button>
                            <Button type="primary">Xem</Button>
                            <Button type="primary">Sửa</Button>
                            <Button type="primary">Xóa</Button>
                        </Space>
                    </div>
                    
                    
                    <Text>Ngày tạo: 14-03-2021 16:31 PM</Text>
                    <br></br>
                    <Text>Link CV: https://i.topcv.vn/nguyenvana?ref=3881639</Text>
                    <br></br>
                    <Button type="primary" className="mt-3 btn-success">Bật tìm việc</Button>
                    
                </Col>
            </Row>
        </>
    )
}

export default function ManageCv() {
    return (
        <>
            <StyleManageCv>
                <Row>
                    <Col span={16}>
                        <Space direction="vertical" size="large">
                            <CvCard></CvCard>
                            <CvCard></CvCard>
                            <CvCard></CvCard>
                            <CvCard></CvCard>
                        </Space>
                    </Col>
                    <Col span={8}>
                    </Col>
                </Row>
            </StyleManageCv>
            


        </>
    )
}