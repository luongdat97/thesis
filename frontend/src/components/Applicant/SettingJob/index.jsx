import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, Collapse, Card, Typography, List, Checkbox } from 'antd';
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
            <Card>
                <Title level={4}>CẬP NHẬT THÔNG TIN GỢI Ý VIỆC LÀM</Title>
                <Demo></Demo>
            </Card>


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
            <Title level={5}>Thông tin cá nhân</Title>
            <Form.Item
                label="Họ và tên"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Title level={5}>Kinh nghiệm thực tế</Title>
            <Form.Item
                label="Ngành nghề"
                name="password"
            >
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    defaultValue={['IT phần mềm', 'Báo chí']}
                    onChange={handleChange}
                >
                    {children}
                </Select>
            </Form.Item>
            <Form.Item
                label="Kỹ năng"
                name="password"
            >
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    defaultValue={['Bootstrap', 'ReactJs']}
                    onChange={handleChange}
                >
                    {children}
                </Select>
            </Form.Item>
            <Form.Item
                label="Kinh nghiệm"
                name="password"
            >
                <Select >
                    <Option value="1">Chưa có kinh nghiệm</Option>
                    <Option value="2">Dưới 1 năm</Option>
                    <Option value="3">1 năm</Option>
                    <Option value="4">2 năm</Option>
                    <Option value="5">3 năm</Option>
                    <Option value="6">4 năm</Option>
                    <Option value="7">5 năm</Option>
                    <Option value="8">Trên 5 năm</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Trình độ chuyên môn"
                name="password"
            >
                <Select>
                    <Option value="1">Sinh viên</Option>
                    <Option value="2">mới ra trường</Option>
                    <Option value="3">có kinh nghệm</Option>
                    <Option value="4">trưởng nhóm</Option>
                    <Option value="5">Quản lý/ giám sát</Option>
                    <Option value="6">chuyên gia</Option>
                    <Option value="7">giám sát</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Trình độ tiếng Anh"
                name="password"
            >
                <Select>
                    <Option value="1">Không biết</Option>
                    <Option value="2">Đọc hiểu cơ bản</Option>
                    <Option value="3">Đọc/ viết tốt tài liệu chuyên môn</Option>
                    <Option value="4">Giao tiếp tốt</Option>
                    <Option value="5">Thành thạo mọi kỹ năng</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Năm sinh"
                name="password"
            >
                <Select>
                    <Option value="1">Chưa có kinh nghiệm</Option>
                    <Option value="2">Dưới 1 năm</Option>
                    <Option value="3">1 năm</Option>
                    <Option value="4">2 năm</Option>
                    <Option value="5">3 năm</Option>
                    <Option value="6">4 năm</Option>
                    <Option value="7">5 năm</Option>
                    <Option value="8">Trên 5 năm</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Giới tính"
                name="password"
            >
                <Select >
                    <Option value="1">Nam</Option>
                    <Option value="2">Nữ</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Quê quán"
                name="password"
            >
                <Select >
                    <Option value="1">Vĩnh Phúc</Option>
                    <Option value="2">Hà Nội</Option>
                    <Option value="3">Quảng Bình</Option>
                </Select>
            </Form.Item>
            <Title level={5}>Mong muốn của bạn</Title>
            <Form.Item
                label="Cv chính của bạn"
                name="password"
            >
                <Select >
                    <Option value="1">CV xin việc it</Option>
                    <Option value="2">CV xin việc CSS</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Loại hình làm việc"
                name="password"
            >
                <Select >
                    <Option value="1">Toàn thời gian</Option>
                    <Option value="2">Bán thời gian</Option>
                    <Option value="3">Thực tập</Option>
                    <Option value="4">Remote (làm việc từ xa)</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Mong muốn làm việc tại nước ngoài"
                name="password"
            >
                <Select >
                    <Option value="1">Có</Option>
                    <Option value="2">Không</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Về bạn"
                name="about"
            >
                <TextArea rows={3} placeholder="Giới thiệu ngắn gọn về bản thân để giúp bạn tăng sức thu hút với nhà tuyển dụng. VD: Tôi có chuyên môn trong lĩnh vực Tự động hóa, mong muốn của tôi là tìm được một môi trường làm việc chuyên nghiệp, với chế độ đãi ngộ tốt."></TextArea>
            </Form.Item>
            <Form.Item
                label="Mong muốn"
                name="desire"
            >
                <TextArea rows={2} placeholder="Mong muốn về môi trường làm việc, các công ty bạn mong muốn ứng tuyển (VD: Viettel, FPT, VNPT..)..vv"></TextArea>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Cập nhật
        </Button>
            </Form.Item>
        </Form>
    );
};

export default SettingJob;