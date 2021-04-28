import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, Row, Col, InputNumber, Card, Typography, List, Checkbox, Button } from 'antd';
import companyApi from '../../../../api/companyApi'
import recruiterApi from '../../../../api/recruiterApi'
import { useCookies } from 'react-cookie'
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

const AddCompany = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const addCompany = (company) => {
        companyApi.postCompany(company).then((res) => {
            let company = res.data
            recruiterApi.editRecruiter({ id: cookies.user.id, company_id: company.id }).then(res => {
                let data = { ...cookies.user, company_id: company.id }
                setCookie('user', data, { path: '/' });
            })
        })
    }
    const onFinish = (values) => {
        console.log('Success:', values);
        addCompany(values)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="bg-white p-3" style={{ marginLeft: "20%", marginRight: "20%" }}>
            <Row>
                <Col span={18} offset={6}>
                    <Title level={3}>Tạo thông tin công ty</Title>
                </Col>
            </Row>

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
                    name="name"
                    rules={[{ required: true, message: 'Thiếu thông tin!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Logo"
                    name="logo"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Mã số thuế"
                    name="taxCode"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Lĩnh vực hoạt động"
                    name="field"
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
                    label="Điện thoại"
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
                    label="Website"
                    name="website"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Quy mô"
                    name="scale"
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
                    name="description"
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">Tạo mới</Button>
                </Form.Item>

            </Form>
        </div>
    );
};

export default AddCompany;