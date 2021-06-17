import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, Row, Col, InputNumber, Card, Typography, List, Checkbox, Button, message, Space } from 'antd';
import jobApi from "../../../api/jobApi"
import { useCookies } from 'react-cookie'
import { province, career, tag } from '../../../Constances/const'
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select


const PostJob = (props) => {
    console.log(props)
    const [cookies] = useCookies(["user"])
    const [form] = Form.useForm()
    const postJob = (job) => {
        return jobApi.postJob(job)
    }
    const onFinish = (values) => {
        console.log('Success:', values);
        values.recruiter_id = cookies.user.id
        postJob(values).then((res) => {
            console.log("...........")
            console.log(res)
            message.success("Bạn đã tạo bài đăng thành công!")
            if (props.fetchJobList) {
                console.log("haaaaaaaaaa")
                props.fetchJobList()
            }
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Title level={4}>Đăng tin tuyển dụng</Title>
            <Form
                layout="vertical"
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
            >
                <Title level={5}>Thông tin cơ bản</Title>
                <Form.Item
                    label="Tiêu đề"
                    name="title"
                    rules={[{ required: true, message: 'Thiếu thông tin!' }]}
                >
                    <Input />
                </Form.Item>
                <Row gutter={20}>
                    <Col span={12}>
                        <Form.Item
                            label="Ngành nghề"
                            name="career"
                            rules={[{ required: true, message: 'Thiếu thông tin!' }]}
                        >
                            <Select>
                                {career.map(item => (
                                    <Option value={item} key={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Địa chỉ làm việc"
                            name="address"
                            rules={[{ required: true, message: 'Thiếu thông tin!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Tỉnh thành"
                            name="workplace"
                            rules={[{ required: true, message: 'Thiếu thông tin!' }]}
                        >
                            <Select>
                                {province.map(item => (
                                    <Option value={item} key={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Lương từ"
                                    name={["salary", "from"]}
                                >
                                    <Input type="number" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Lương lên đến"
                                    name={["salary", "to"]}
                                >
                                    <Input type="number" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col span={12}>
                        <Form.Item
                            label="Yêu cầu giới tính"
                            name="genderRequire"
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
                <Row gutter={20}>
                    <Col span={12}>
                        <Form.Item
                            label="Cấp bậc"
                            name="level"
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
                    <Col span={5}>
                        <Form.Item
                            label="Số lượng cần tuyển"
                            name="numberHire"
                        >
                            <InputNumber min={1} />
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            label="Hạn nộp hồ sơ"
                            name="endDate"
                            rules={[{ required: true, message: 'Thiếu thông tin!' }]}
                        >
                            <DatePicker />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col span={12}>
                        <Form.Item
                            label="Yêu cầu kinh nghiệm"
                            name="experienceRequire"
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
                            label="Từ khóa tìm kiếm"
                            name="skillRequire"
                        >
                            <Select mode="tags" tokenSeparators={[',']}>
                                {tag.map((item) => (
                                    <Option value={item} key={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                    </Col>
                </Row>


                <Title level={5}>Thông tin người nhận hồ sơ</Title>

                <Form.Item
                    label="Tên người nhận hồ sơ"
                    name={["receiver", "name"]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email nhận hồ sơ"
                    name={["receiver", "email"]}
                    rules={[{ required: true, message: 'Thiếu thông tin!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Điện thoại"
                    name={["receiver", "phone"]}
                >
                    <Input />
                </Form.Item>
                <Title level={5}>Mô tả chi tiết công việc</Title>
                <Form.Item
                    label="Mô tả công việc"
                    name="jobDescription"
                    rules={[{ required: true, message: 'Thiếu thông tin!' }]}
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    label="Yêu cầu ứng viên"
                    name="jobRequire"
                    rules={[{ required: true, message: 'Thiếu thông tin!' }]}
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    label="Quyền lợi ứng viên"
                    name="jobBenefit"
                    rules={[{ required: true, message: 'Thiếu thông tin!' }]}
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Space direction="horizontal" className="d-flex justify-content-end">
                    <Button onClick={() => form.resetFields()}>
                        Đặt lại dữ liệu
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Đăng tin
                    </Button>
                </Space>
            </Form>
        </>
    );
};

export default PostJob;