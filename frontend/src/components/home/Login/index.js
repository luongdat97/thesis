import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Form, Input, message } from 'antd';
import {useHistory} from 'react-router-dom'
import accountApi from '../../../api/accountApi'
import { useCookies } from 'react-cookie';
const { Title, Text } = Typography;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Login = (props) => {
    const [cookies, setCookie] = useCookies(['user']);
    let history = useHistory();
    const onFinish = (values) => {
        console.log('Success:', values);
        accountApi.login(values).then((res) => {
            let data = res.data
            console.log(data)
            if (data.code === 9000) {
                message.error("email không tồn tại!")
            } else if (data.code === 9001) {
                message.error("Mật khẩu không đúng!")
            } else if (data.code === 1000) {
                setCookie('user', data.data, { path: '/' });
                history.push("/applicant")
            }
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
                <Col sm={12} className="p-5" style={{ height: 476 }}>
                    <Row>
                        <Col offset={8} sm={16}>
                            <Title level={3}>Đăng nhập</Title>
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
                            name="username"
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

export default Login