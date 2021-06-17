import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Form, Input, message } from 'antd';
import applicantApi from '../../../api/applicantApi'
const { Title, Text } = Typography;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const RegisterApplicant = (props) => {
    const [password, setPassword] = useState('')

    const [form] = Form.useForm();
    const handleSubmit = (formData) => {
        return applicantApi.register(formData)
    }

    const onFinish = (values) => {
        console.log('Success:', values);
        handleSubmit(values).then(res => {
            message.success("Bạn đã đăng ký tài khoản thành công!")
        }).catch(err => {
            console.log(err)
            message.error("Email đã tồn tại!")
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="bg-white mt-5">
            <Row>
                <Col sm={12} >
                    <div className="d-flex align-items-center h-100 bg-success p-5">
                        <img className="w-100" alt="img" src="https://res.cloudinary.com/project0407/image/upload/v1618044397/project/toppng.com-job-search-remotive-home-find-a-job-cartoo-1186x930_vmsnwf.png"></img>
                    </div>

                </Col>
                <Col sm={12} className="p-5">
                    <Row>
                        <Col offset={8} sm={16}>
                            <Title level={3}>Đăng ký ứng viên</Title>
                        </Col>
                    </Row>

                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        form={form}
                    >
                        <Form.Item
                            label="Họ và tên"
                            name="name"
                            rules={[{ required: true, message: 'Thiếu thông tin' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Điện thoại"
                            name="phone"
                            rules={[{ required: true, message: 'Thiếu thông tin!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Thiếu thông tin!' }, {type: 'email', message: 'Sai định dạng email!'}]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: 'Thiếu thông tin!' }]}
                            onChange={(ev) => setPassword(ev.target.value)}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="Nhập lại mật khẩu"
                            name="rePassword"
                            rules={[{ required: true, message: 'Thiếu thông tin!' }, {pattern: `^${password}$`, message: "mật khẩu không khớp"}]}
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

export default RegisterApplicant