import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Form, Input, message, Modal, DatePicker, Select } from 'antd';
import applicantApi from '../../../../api/applicantApi'
import adminApi from '../../../../api/adminApi'
import employeeApi from '../../../../api/employeeApi'
import accountApi from '../../../../api/accountApi'
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
    let data = props.data
    console.log(data)
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);
       accountApi.editAccount({id: data.id, role: values.role}).then(res => {
           message.success("Bạn đã cập nhật tài khoản thành công!")
           props.fetchAccountList()
       })
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
                Sửa
            </Button>
            <Modal title="Cập nhật tài khoản" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <div className="bg-white">

                    <Form
                        {...layout}
                        name="basic"
                        initialValues={data}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        form={form}
                    >
                        <Form.Item
                            label="Họ và tên"
                            name="name"
                        >
                            <Input readOnly bordered={false} />
                        </Form.Item>
                        <Form.Item
                            label="Điện thoại"
                            name="phone"
                        >
                            <Input readOnly bordered={false}  />
                        </Form.Item>
                        {/* <Form.Item
                            label="Ngày sinh"
                            name="birthday"
                        >
                            <DatePicker />
                        </Form.Item> */}
                        <Form.Item
                            label="Email đăng nhập"
                            name="email"
                        >
                            <Input readOnly bordered={false} />
                        </Form.Item>

                        <Form.Item
                            label="Vai trò"
                            name="role"
                        >
                            <Select style={{ width: 150 }}>
                                <Option value="employee">Nhân viên</Option>
                                <Option value="admin">Quản trị viên</Option>
                            </Select>
                        </Form.Item>

                        <div className="d-flex justify-content-end">
                            <Button className="mr-3" onClick={handleCancel} >
                                Thoát
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </div>

                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default RegisterApplicant