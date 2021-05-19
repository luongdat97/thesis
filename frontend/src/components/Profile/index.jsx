import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, Row, Col, Card, Typography, List, Checkbox, Button, message } from 'antd';
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router-dom'
import profileApi from '../../api/profileApi'
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
    const [profile, setProfile] = useState({})
    const [logo, setLogo] = useState({})
    const [form] = Form.useForm()

    const fetchProfile = () => {
        profileApi.getProfile({id: cookies.user.profile_id}).then(res => {
            console.log(res.data)
            let profile = res.data
            if (profile.birthday) profile.birthday = moment(profile.birthday)
            setProfile(res.data)
        })
    }
    useEffect(() => {
        fetchProfile()
    }, [])

    useEffect(() => { form.resetFields() }, [profile]);

    const onFinish = (values) => {
        console.log('Success:', values);
        values.id = cookies.user.profile_id;
        profileApi.editProfile(values).then(res => {
            console.log(res.data)
            message.success("Bạn đã cập nhật thông tin cá nhân thành công!")
        })
        //editCompany({...values, logo})

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="bg-white p-3" style={{ marginLeft: "20%", marginRight: "20%" }}>
            <Row>
                <Col span={18} offset={6}>
                    <Title level={3}>Thông tin cá nhân</Title>
                </Col>
            </Row>

            <Form
                {...layout}
                name="basic"
                initialValues={profile}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
            >
                <Form.Item
                    label="Họ và tên"
                    name="name"
                    rules={[{ required: true, message: 'Thiếu thông tin!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Địa chỉ"
                    name="address"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ngày sinh"
                    name="birthday"
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label="Giới tính"
                    name="gender"
                >
                    <Select style={{ width: 120 }}>
                        <Option value={1}>Nam</Option>
                        <Option value={2}>Nữ</Option>
                    </Select>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">Cập nhật</Button>
                </Form.Item>

            </Form>
        </div>
    );
};

export default EditCompany;