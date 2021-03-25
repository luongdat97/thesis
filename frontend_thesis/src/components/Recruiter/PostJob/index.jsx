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
            <Title level={3}>Đăng tin tuyển dụng</Title>
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
                label="Tiêu đề"
                name="username"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Ngành"
                name="username"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Địa chỉ làm việc"
                name="username"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Nơi làm việc"
                name="username"
            >
                <Input />
            </Form.Item>
            <Form.Item
                        label="Lương"
                        name="username"
                    >
                        <Input.Group compact>
                            <Select defaultValue="1">
                                <Option value="1">Thỏa thuận</Option>
                                <Option value="2">Từ</Option>
                                <Option value="3">Lên đến</Option>
                                <Option value="4">Trong khoảng</Option>
                            </Select>
                            <Input style={{ width: 100, textAlign: 'center' }} placeholder="Minimum" />
                            <Input
                                className="site-input-split"
                                style={{
                                    width: 30,
                                    borderLeft: 0,
                                    borderRight: 0,
                                    pointerEvents: 'none',
                                }}
                                placeholder="~"
                                disabled
                            />
                            <Input
                                className="site-input-right"
                                style={{
                                    width: 100,
                                    textAlign: 'center',
                                }}
                                placeholder="Maximum"
                            />
                        </Input.Group>
                    </Form.Item>
            

            <Row>
                <Col span={12}>
                    <Form.Item
                        label="Giới tính"
                        name="gender"
                    >
                        <Select>
                            <Option value={1}>Không yêu cầu</Option>
                            <Option value={2}>Nam</Option>
                            <Option value={3}>Nữ</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Loại hình làm việc"
                        name="workType"
                    >
                        <Select>
                            <Option value={1}>Toàn thời gian</Option>
                            <Option value={2}>Bán thời gian</Option>
                            <Option value={3}>Thực tập</Option>
                            <Option value={4}>Remote (làm việc từ xa)</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                <Form.Item
                label="Cấp bậc"
                name="username"
            >
                <Select>
                    <Option value={1}>Nhân viên</Option>
                    <Option value={2}>Trưởng nhóm</Option>
                    <Option value={3}>Trưởng/Phó phòng</Option>
                    <Option value={4}>Quản lý/Giám sát</Option>
                    <Option value={5}>Trưởng chi nhánh</Option>
                    <Option value={6}>Phó giám đốc</Option>
                    <Option value={7}>Giám đốc</Option>
                    <Option value={8}>Thực tập sinh</Option>

                </Select>
            </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Số lượng cần tuyển"
                        name="username"
                    >
                        <InputNumber min={1} />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label="Kinh nghiệm"
                        name="experience"
                    >
                        <Select>
                            <Option value={1}>Chưa có kinh nghiệm</Option>
                            <Option value={2}>Dưới 1 năm</Option>
                            <Option value={3}>1 năm</Option>
                            <Option value={4}>2 năm</Option>
                            <Option value={5}>3 năm</Option>
                            <Option value={6}>4 năm</Option>
                            <Option value={7}>5 năm</Option>
                            <Option value={8}>trên 5 năm</Option>

                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Hạn nộp hồ sơ"
                        name="username"
                    >
                        <DatePicker />
                    </Form.Item>
                </Col>
            </Row>






            <Form.Item
                label="Tên người nhận hồ sơ"
                name="username"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email nhận hồ sơ"
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
                label="Mô tả công việc"
                name="username"
            >
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item
                label="Yêu cầu ứng viên"
                name="username"
            >
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item
                label="Quyền lợi ứng viên"
                name="username"
            >
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item
                label="Kỹ năng"
                name="username"
            >
                <Input />
            </Form.Item>

        </Form>
    );
};

export default SettingJob;