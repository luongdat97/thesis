import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Form, Input, message, Modal, DatePicker, Select } from 'antd';
import applicantApi from '../../../../api/applicantApi'
import adminApi from '../../../../api/adminApi'
import employeeApi from '../../../../api/employeeApi'
const { Option } = Select;
const { Title, Text } = Typography;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const RegisterApplicant = (props) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);

        if (values.role === "admin") {
            adminApi.register(values).then((res) => {
                message.success("Tạo mới tài khoản thành công!")
                props.fetchAccountList()
            }).catch(err => {
                message.warn("Email đã được đăng ký, vui lòng chọn email khác!")
            })
        } else {
            employeeApi.register(values).then((res) => {
                message.success("Tạo mới tài khoản thành công!")
                props.fetchAccountList()
            }).catch(err => {
                message.warn("Email đã được đăng ký, vui lòng chọn email khác!")
            })
        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Tạo mới tài khoản
            </Button>
            <Modal title="Tạo tài khoản" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <div className="bg-white">

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
                        >
                            <Input />
                        </Form.Item>
                        {/* <Form.Item
                            label="Ngày sinh"
                            name="birthday"
                        >
                            <DatePicker />
                        </Form.Item> */}
                        <Form.Item
                            label="Vai trò"
                            name="role"
                            rules={[{ required: true, message: 'Thiếu thông tin!' }]}
                        >
                            <Select style={{ width: 150 }}>
                                <Option value="employee">Nhân viên</Option>
                                <Option value="admin">Quản trị viên</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Email đăng nhập"
                            name="email"
                            rules={[{ required: true, message: 'Thiếu thông tin!' }, { type: 'email', message: 'Sai định dạng email!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: 'Thiếu thông tin!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <div className="d-flex justify-content-end">
                            <Button className="mr-3" onClick={handleCancel} >
                                Thoát
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Tạo mới
                            </Button>
                        </div>

                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default RegisterApplicant