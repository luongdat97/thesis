import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, Row, Col, Card, Typography, List, Checkbox, Button, message } from 'antd';
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router-dom'
import accountApi from '../../api/accountApi'
import moment from 'moment'
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select


const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 18,
    },
};

const EditCompany = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const [logo, setLogo] = useState({})
    const [form] = Form.useForm()
    const [password, setPassword] = useState("")

    const onFinish = (values) => {
        console.log('Success:', values);
        values.id = cookies.user.profile_id;
        accountApi.changePass({account_id: cookies.user.account_id, oldPassword: values.oldPassword, newPassword: values.newPassword}).then(res => {
            console.log(res.data)
            if(res.data.code == 1000) {
                message.success("Bạn đã thay đổi mật khẩu thành công!")
            } else {
                message.warn("Mật khẩu cũ không đúng, vui lòng thử lại!")
            }
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="bg-white p-3" style={{ marginLeft: "20%", marginRight: "20%" }}>
            <Row>
                <Col span={18} offset={6}>
                    <Title level={3}>Đổi mật khẩu</Title>
                </Col>
            </Row>

            <Form
                {...layout}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
            >
                <Form.Item
                    label="Mật khẩu cũ"
                    name="oldPassword"
                    rules={[{ required: true, message: 'Thiếu thông tin!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Mật khẩu mới"
                    name="newPassword"
                    rules={[{ required: true, message: 'Thiếu thông tin!' }]}
                    onChange={(ev) => setPassword(ev.target.value)}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Nhập lại"
                    name="rePassword"
                    rules={[{ required: true, message: 'Thiếu thông tin!' }, {pattern: `^${password}$`, message: "mật khẩu không khớp"}]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">Đổi mật khẩu</Button>
                </Form.Item>

            </Form>
        </div>
    );
};

export default EditCompany;