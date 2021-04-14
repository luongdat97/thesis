import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Form, Input, Checkbox } from 'antd';
const { Title, Text } = Typography;
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
const tailLayout = {
    wrapperCol: { offset: 6, span: 18 },
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
                <div className="d-flex align-items-center h-100" style={{background: "#4080ed"}}>
                        <img className="w-100" alt="img" src="https://res.cloudinary.com/project0407/image/upload/v1618105031/project/09170499_Applicant-Tracking-Software-la-gi-2_oma6ba.png"></img>
                    </div>
                    
                </Col>
                <Col sm={12} className="p-5">
                    <Row>
                        <Col offset={6} sm={18}>
                        <Title level={3}>Đăng ký nhà tuyển dụng</Title>
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
                            label="Họ và tên"
                            name="name"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Điện thoại"
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Tên công ty"
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Địa chỉ công ty"
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
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
                        <Form.Item
                            label="Nhập lại mật khẩu"
                            name="rePassword"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Đăng ký
        </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>

    )
}

export default GeneralJobCard