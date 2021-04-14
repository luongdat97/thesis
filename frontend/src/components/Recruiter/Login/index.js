import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Form, Input, Checkbox } from 'antd';
import { useHistory } from "react-router-dom";
const { Title, Text } = Typography;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const GeneralJobCard = (props) => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="bg-white mt-5">
            <Row>
                <Col sm={12} >
                    <div className="d-flex align-items-center h-100" style={{ background: "#4080ed" }}>
                        <img className="w-100" alt="img" src="https://res.cloudinary.com/project0407/image/upload/v1618105031/project/09170499_Applicant-Tracking-Software-la-gi-2_oma6ba.png"></img>
                    </div>

                </Col>
                <Col sm={12} className="p-5" style={{ height: 476 }}>
                    <Row>
                        <Col offset={8} sm={16}>
                            <Title level={3}>Đăng nhập nhà tuyển dụng</Title>
                        </Col>
                    </Row>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>



                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" className="w-100">
                                Đăng nhập
                            </Button>
                        </Form.Item>
                        <div className="d-flex justify-content-end">
                            <a>Quên mật khẩu?</a>
                        </div>
                    </Form>

                </Col>
            </Row>
        </div>

    )
}

export default GeneralJobCard