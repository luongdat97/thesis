import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, Row, Col, InputNumber, Card, Typography, List, Checkbox, Button, message } from 'antd';
import companyApi from '../../../../api/companyApi'
import recruiterApi from '../../../../api/recruiterApi'
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router-dom'
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
    const {id} = useParams()
    const [company, setCompany] = useState({})
    const [form] = Form.useForm()
    const fetchCompany = async () => {
        console.log(cookies.user)
        let company = await companyApi.getCompanyById(cookies.user.company_id)
        setCompany(company.data)
        console.log(company)
    }
    useEffect(() => {
        fetchCompany()
    }, [])

    useEffect(() => { form.resetFields()}, [company]);

    
    const editCompany = (company) => {
        companyApi.editCompany(company).then((res) => {
            message.success('Cập nhật thành công!')
        })
    }
    const onFinish = (values) => {
        console.log('Success:', values);
        values.id = id
        editCompany(values)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="bg-white p-3" style={{ marginLeft: "20%", marginRight: "20%" }}>
            <Row>
                <Col span={18} offset={6}>
                    <Title level={3}>Cập nhật thông tin công ty</Title>
                </Col>
            </Row>

            <Form
                {...layout}
                name="basic"
                initialValues={company}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
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
                    <Button type="primary" htmlType="submit">Cập nhật</Button>
                </Form.Item>

            </Form>
        </div>
    );
};

export default EditCompany;