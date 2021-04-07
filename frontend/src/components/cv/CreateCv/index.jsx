import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Row, Col, Collapse, Card, Typography, Button, Space, Slider, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
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
            <div style={{ backgroundColor: "#f0f2f5" }}>
                <StyleCv>
                    <div style={{ backgroundColor: "#fff", width: 750 }} className="p-2 my-3">
                        <Title level={2}>Tạo CV cá nhân</Title>
                        <div className="mt-4 mb-3">
                            <Space>
                                <Button type="primary" size="large" icon={<i className="fas fa-exchange-alt light-icon"></i>}>&nbsp;Đổi mẫu</Button>
                                <Button type="primary" size="large" icon={<i className="far fa-eye light-icon"></i>}>&nbsp;Xem trước</Button>
                                <Button type="primary" size="large" icon={<i className="fas fa-download light-icon"></i>}>&nbsp;Tải xuống</Button>
                                <Button type="primary" className="btn-success" size="large" icon={<i className="far fa-save light-icon"></i>}>&nbsp;Lưu</Button>
                            </Space>
                        </div>

                        <Row className="my-3">
                            <Col span={8} className="border pl-3">
                                Chọn màu
                        <br></br>
                                <Radio.Group name="radiogroup" defaultValue={1}>
                                    <Radio value={1} id="red"></Radio>
                                    <Radio value={2} id="white"></Radio>
                                    <Radio value={3} id="pink"></Radio>
                                    <Radio value={4} id="orange"></Radio>
                                </Radio.Group>
                            </Col>
                            <Col span={8} className="border pl-3">
                                Cỡ chữ
                        <div className="d-flex align-items-end pb-1">
                                    <i className="fas fa-font"></i>
                                    <Slider defaultValue={0} min={0} max={3} style={{ width: 120, margin: "0px 15px 3px" }} />
                                    <i style={{ fontSize: '1.5em' }} className="fas fa-font"></i>
                                </div>
                            </Col>
                            <Col span={8} className="border pl-3">
                                Khoảng cách dòng
                        <div className="d-flex align-items-end pb-1">
                                    <i className="fas fa-text-height"></i>
                                    <Slider defaultValue={0} min={0} max={3} style={{ width: 120, margin: "0px 15px 3px" }} />
                                    <i style={{ fontSize: '1.5em' }} className="fas fa-text-height"></i>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <div id="html2canvas" style={{ width: 750, backgroundColor: "#fff", paddingTop: 25 }}>

                        <Form
                            {...layout}
                            onFinish={(values) => console.log(values)}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
        </Button>
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
                                    <i className="fas fa-bullseye ml-3"></i>
                                    <Input placeholder="Mục tiêu nghề nghiệp" className="section-title" defaultValue="Mục tiêu nghề nghiệp" />
                                </div>

                                <TextArea
                                    placeholder="Autosize height with minimum and maximum number of lines"
                                    defaultValue={`Môi trường chuyên nghiệp\nCống hiến hết mình`}
                                    autoSize={{ minRows: 1, maxRows: 6 }}
                                    onChange={(e) => console.log(e.target.value)}
                                />
                            </div>
                            <div className="section">
                                <SectionTool />
                                <div className="d-flex align-items-center section-title">
                                    <i className="fas fa-graduation-cap ml-3"></i>
                                    <Input placeholder="Học vấn" className="section-title" defaultValue="Học vấn" />
                                </div>
                                <div className="ml-3">
                                    <Form.List name="education" initialValue={[{}]}>
                                        {(fields, { add, remove, move }) => (
                                            <>

                                                {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                                    <div className="section-item">
                                                        <ItemTool add={add} remove={remove} move={move} index={index} length={fields.length} />
                                                        <Row>
                                                            <Col span={5}>
                                                                <Form.Item
                                                                    {...restField}
                                                                    name={[name, 'first']}
                                                                    fieldKey={[fieldKey, 'first']}
                                                                >
                                                                    <Input placeholder="10/2021 - hiện tại" value="10/2021 - hiện tại" />
                                                                </Form.Item>

                                                            </Col>
                                                            <Col span={19}>
                                                                <Form.Item
                                                                    {...restField}
                                                                    name={[name, 'education']}
                                                                    fieldKey={[fieldKey, 'education']}
                                                                >
                                                                    <Input placeholder="Đại học TOPCV" style={{ fontWeight: 'bold' }} defaultValue="Đại học TOPCV" />
                                                                </Form.Item>
                                                                <Form.Item
                                                                    {...restField}
                                                                    name={[name, 'major']}
                                                                    fieldKey={[fieldKey, 'major']}
                                                                >
                                                                    <Input placeholder="Chuyên ngành: Quản trị Doanh nghiệp" defaultValue="Chuyên ngành: Quản trị doanh nghiệp" />
                                                                </Form.Item>
                                                                <Form.Item
                                                                    {...restField}
                                                                    name={[name, 'description']}
                                                                    fieldKey={[fieldKey, 'description']}
                                                                >
                                                                    <Input placeholder="Tốt nghiệp loại Giỏi, điểm trung bình 8.0" defaultValue="Tốt nghiệp loại giỏi" />
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </Form.List>

                                </div>
                            </div>

                            <div className="section">
                                <SectionTool />
                                <div className="d-flex align-items-center section-title">
                                    <i className="fas fa-briefcase ml-3"></i>
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
                <Button type="primary"><i className="fas fa-arrow-up light-icon"></i></Button>
                <Button type="primary"><i className="fas fa-arrow-down light-icon"></i></Button>
                <Button type="primary"><i className="fas fa-trash light-icon"></i></Button>
            </Space>
        </div>
    )
}

function ItemTool(props) {
    const { remove, index, add, length, move } = props
    return (
        <div className="section-item-tool">
            <Space size="small">
                {length >= 1 && index !== 0 && <Button type="primary" size="small" onClick={() => move(index, index - 1)}><i className="fas fa-arrow-up light-icon"></i></Button>}
                {length >= 1 && index !== length - 1 && <Button type="primary" size="small" onClick={() => move(index, index + 1)}><i className="fas fa-arrow-down light-icon"></i></Button>}
                <Button type="primary" size="small" onClick={() => add({}, index + 1)}><i className="fas fa-plus light-icon"></i></Button>
                
                {length >= 2 && <Button type="primary" size="small" onClick={() => { remove(index) }}><i className="fas fa-minus light-icon"></i></Button>}
            </Space>
        </div>
    )
}

export default Home