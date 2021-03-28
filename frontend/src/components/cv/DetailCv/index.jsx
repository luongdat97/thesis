import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Row, Col, Collapse, Card, Typography, Button, Space, Slider, Radio } from 'antd';
import StyleCv from "./index.style"
import UploadAvatar from './UploadAvatar'
const { Option } = Select;
const { Panel } = Collapse;
const { Meta } = Card;
const { Title, Text } = Typography;
const { TextArea } = Input
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

const Home = () => {
    return (
        <>
            <div>
                <StyleCv>
                    
                    <div id="html2canvas" style={{ width: 750, backgroundColor: "#fff", paddingTop: 25 }}>

                        <Form
                            {...layout}
                        >
                            <Row>
                                <Col span={6} className="p-3"><UploadAvatar /></Col>
                                <Col span={18}>
                                    <Input style={{ fontSize: 28, fontWeight: "bold" }} placeholder="Họ và tên" defaultValue="Lương Mạnh Đạt" />
                                    <Input style={{ fontSize: 15, fontWeight: "bold" }} placeholder="Vị trí bạn muốn ứng tuyển" defaultValue="Thực tập sinh React" />
                                    <Form.Item
                                        label="Ngày sinh"
                                        name="birthDay"
                                    >
                                        <Input bordered={false} defaultValue="30/01/1997" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Giới tính"
                                        name="gender"
                                    >
                                        <Input defaultValue="Nam" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Điện thoại"
                                        name="phoneNumber"
                                    >
                                        <Input defaultValue="0981988997" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                    >
                                        <Input defaultValue="luongdat97@gmail.com" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Địa chỉ"
                                        name="address"
                                    >
                                        <Input defaultValue="Kim Xa, Vinh Phúc" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <div className="section">
                                <SectionTool />
                                <div className="d-flex align-items-center section-title">
                                    <i class="fas fa-bullseye ml-3"></i>
                                    <Input placeholder="Mục tiêu nghề nghiệp" className="section-title" defaultValue="Mục tiêu nghề nghiệp" />
                                </div>

                                <TextArea
                                    placeholder="Autosize height with minimum and maximum number of lines"
                                    defaultValue="Môi trường chuyên nghiệp \n Cống hiến hết mình"
                                    autoSize={{ minRows: 1, maxRows: 6 }}
                                />
                            </div>
                            <div className="section">
                                <SectionTool />
                                <div className="d-flex align-items-center section-title">
                                    <i class="fas fa-graduation-cap ml-3"></i>
                                    <Input placeholder="Học vấn" className="section-title" defaultValue="Học vấn" />
                                </div>
                                <Row className="section-item">
                                    <ItemTool />
                                    <Col span={5}>
                                        <Input placeholder="10/2021 - hiện tại" value="10/2021 - hiện tại" />
                                    </Col>
                                    <Col span={19}>
                                        <Input placeholder="Đại học TOPCV" style={{ fontWeight: 'bold' }} defaultValue="Đại học TOPCV" />
                                        <Input placeholder="Chuyên ngành: Quản trị Doanh nghiệp" defaultValue="Chuyên ngành: Quản trị doanh nghiệp" />
                                        <Input placeholder="Tốt nghiệp loại Giỏi, điểm trung bình 8.0" defaultValue="Tốt nghiệp loại giỏi" />
                                    </Col>
                                </Row>
                                <Row className="section-item">
                                    <ItemTool />
                                    <Col span={5}>
                                        <Input placeholder="10/2021 - hiện tại" value="10/2021 - hiện tại" />
                                    </Col>
                                    <Col span={19}>
                                        <Input placeholder="Đại học TOPCV" style={{ fontWeight: 'bold' }} />
                                        <Input placeholder="Chuyên ngành: Quản trị Doanh nghiệp" />
                                        <Input placeholder="Tốt nghiệp loại Giỏi, điểm trung bình 8.0" />
                                    </Col>
                                </Row>

                            </div>
                            <div className="section">
                                <SectionTool />
                                <div className="d-flex align-items-center section-title">
                                    <i class="fas fa-briefcase ml-3"></i>
                                    <Input placeholder="Kinh nghiệm làm việc" defaultValue="Kinh nghiệm làm việc" className="section-title" />
                                </div>
                                <Row>
                                    <Col span={5}>
                                        <Input placeholder="10/2021 - hiện tại" value="10/2021 - hiện tại" />
                                    </Col>
                                    <Col span={19}>
                                        <Input placeholder="Đại học TOPCV" style={{ fontWeight: 'bold' }} />
                                        <Input placeholder="Chuyên ngành: Quản trị Doanh nghiệp" />
                                        <TextArea
                                            placeholder="Autosize height with minimum and maximum number of lines"
                                            autoSize={{ minRows: 2, maxRows: 6 }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={5}>
                                        <Input placeholder="10/2021 - hiện tại" value="10/2021 - hiện tại" />
                                    </Col>
                                    <Col span={19}>
                                        <Input placeholder="Đại học TOPCV" style={{ fontWeight: 'bold' }} />
                                        <Input placeholder="Chuyên ngành: Quản trị Doanh nghiệp" />
                                        <TextArea
                                            placeholder="Autosize height with minimum and maximum number of lines"
                                            autoSize={{ minRows: 2, maxRows: 6 }}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </div>
                </StyleCv>
            </div>
        </>

    );
};

function SectionTool(props) {
    return (
        <div className="section-tool">
            <Space size="small">
                <Button type="primary"><i class="fas fa-arrow-up light-icon"></i></Button>
                <Button type="primary"><i class="fas fa-arrow-down light-icon"></i></Button>
                <Button type="primary"><i class="fas fa-trash light-icon"></i></Button>
            </Space>
        </div>
    )
}

function ItemTool(props) {
    return (
        <div className="section-item-tool">
            <Space size="small">
                <Button type="primary" size="small"><i class="fas fa-arrow-up light-icon"></i></Button>
                <Button type="primary" size="small"><i class="fas fa-arrow-down light-icon"></i></Button>
                <Button type="primary" size="small"><i class="fas fa-plus light-icon"></i></Button>
                <Button type="primary" size="small"><i class="fas fa-trash light-icon"></i></Button>
            </Space>
        </div>
    )
}

export default Home