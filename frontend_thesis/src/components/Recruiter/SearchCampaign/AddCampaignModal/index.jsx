import React, { useState } from 'react';
import { Modal, Button, Form, Input, Row, Col, Typography, Select } from 'antd';

const { Title } = Typography
const {Option} = Select

const AddModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button type="primary" style={{background: "#52c41a", borderColor: "#52c41a"}} onClick={showModal}>Thêm mới chiến dịch</Button>
            <Modal title="Tạo chiến dịch tìm kiếm" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Row>
                    <Col xs={16}>
                        <Row>
                            <Col xs={20}>
                                <Form className="my-3">
                                    <Form.Item
                                        label="Tên chiến dịch"
                                    >
                                        <Input placeholder="Nhập tên chiến dịch"></Input>
                                    </Form.Item>
                                </Form>
                                <Form className="my-3">
                                    <Form.Item
                                        label="Tin tuyển dụng"
                                    >
                                        <Select placeholder="Chọn tin tuyển dụng của bạn">
                                            <Option value="fresher java">fresher java</Option>
                                            <Option value="Tuyển dụng lập trình viên java">Tuyển dụng lập trình viên java</Option>
                                            <Option value="3">Tuyển dụng lập trình nhúng</Option>
                                        </Select>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                    <Col></Col>
                </Row>
            </Modal>
        </>
    );
};

export default AddModal