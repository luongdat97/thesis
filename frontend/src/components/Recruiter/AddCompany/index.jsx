import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, Row, Col, InputNumber, Card, Typography, List, Checkbox } from 'antd';
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select
const companyLogo = [
    'https://res.cloudinary.com/project0407/image/upload/v1615347249/project/company%20logo/cong-ty-co-phan-dau-tu-phat-trien-anh-va-em-59db4c9957711_rs_abw9g7.jpg',
    'https://res.cloudinary.com/project0407/image/upload/v1615347249/project/company%20logo/cong-ty-co-phan-replus-5b504e7e8b74f_ka2czs.webp',
    'https://res.cloudinary.com/project0407/image/upload/v1615347249/project/company%20logo/cong-ty-co-phan-dich-vu-di-dong-truc-tuyen-vi-momo-5f55a14a178cc_mekeqf.webp',
    'https://res.cloudinary.com/project0407/image/upload/v1615347249/project/company%20logo/cong-ty-bds-tan-hoang-gia-60470624a2f64_wgstim.jpg',
    'https://res.cloudinary.com/project0407/image/upload/v1615347249/project/company%20logo/cong-ty-tnhh-oh-vacation-5b0fb1bd69cdf_rs_xojube.jpg',
    'https://res.cloudinary.com/project0407/image/upload/v1615347249/project/company%20logo/ngan-hang-thuong-mai-co-phan-ky-thuong-viet-nam-5e7c8a9259ddc_rvysrd.webp',
]

const SettingJob = (props) => {
    return (
        <>
            <Title level={3}>Tạo thông tin công ty</Title>
            <Row>
                <Col xs={16}>


                    <Demo></Demo>
                </Col>
                <Col></Col>
            </Row>

        </>
    )
}
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
    console.log(`selected ${value}`);
}

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const Demo = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
        {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Tên công ty"
                name="username"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Logo"
                name="username"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Mã số thuế"
                name="username"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Lĩnh vực hoạt động"
                name="username"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Địa chỉ"
                name="username"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Điện thoại"
                name="username"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="username"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Website"
                name="username"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Quy mô"
                name="username"
            >
                <Select>
                    <Option value="1">Dưới 10 nhân viên</Option>
                    <Option value="2">Từ 10 đến 24 nhân viên</Option>
                    <Option value="3">Từ 25 đến 49 nhân viên</Option>
                    <Option value="4">Từ 50 đến 100 nhân viên</Option>
                    <Option value="5">Từ 100 đến 500 nhân viên</Option>
                    <Option value="6">Trên 500 nhân viên</Option>
                    <Option value="7">trên 1000 nhân viên</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Mô tả công ty"
                name="username"
            >
                <TextArea rows={4} />
            </Form.Item>
            

        </Form>
    );
};

export default SettingJob;