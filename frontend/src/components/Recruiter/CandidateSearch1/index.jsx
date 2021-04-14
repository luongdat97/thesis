import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, Row, Col, Button, Typography, Card, Pagination, Space } from 'antd';
import CandidateCard from "./CandidateCard"
import SearchInput from "./SearchInput"
const { RangePicker } = DatePicker
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select
const avatars = [
    'https://timviec.com.vn/storage/avatars/14444/PXgKb9ugTu7LTzizOoD9b1cENDL5kMS6rLq0ozP3.png',
    'https://static.topcv.vn/avatars/igIjdWH406MoINsnj8Lr_605cb62f670b2_cvtpl.jpg',
    'https://timviec.com.vn/storage/avatars/528993/Jg5tKRGfcTs4kWZwDmC8WwKGVeqqzxngzlnyK7is.png',
    'https://static.topcv.vn/avatars/igIjdWH406MoINsnj8Lr_605cb62f670b2_cvtpl.jpg',
    'https://timviec.com.vn/storage/avatars/528993/Jg5tKRGfcTs4kWZwDmC8WwKGVeqqzxngzlnyK7is.png',
    'https://timviec.com.vn/storage/avatars/14444/PXgKb9ugTu7LTzizOoD9b1cENDL5kMS6rLq0ozP3.png',
    'https://static.topcv.vn/avatars/igIjdWH406MoINsnj8Lr_605cb62f670b2_cvtpl.jpg',
    'https://timviec.com.vn/storage/avatars/528993/Jg5tKRGfcTs4kWZwDmC8WwKGVeqqzxngzlnyK7is.png',
    'https://static.topcv.vn/avatars/igIjdWH406MoINsnj8Lr_605cb62f670b2_cvtpl.jpg',
]

const SettingJob = (props) => {
    return (
        <>
            <Title level={3} className="mb-0 mt-3">Tìm kiếm ứng viên</Title>


            <Row className="mt-3" gutter={16}>
                <Col xs={16}>
                        {avatars.map(avatar =>
                            <CandidateCard avatar={avatar}></CandidateCard>
                        )}

                    <div className="d-flex justify-content-center mt-3">
                        <Pagination defaultCurrent={1} total={150} pageSizeOptions={[]} />
                    </div>
                </Col>
                <Col xs={8}>
                    <ExtraOption></ExtraOption>
                </Col>
            </Row>

        </>
    )
}

const FormSearch = (props) => {
    return (
        <>
            <div className="d-flex justify-content-center">
                <Form layout="inline">
                    <Form.Item
                        label="Nhập từ khóa tìm kiếm"
                    >
                        <SearchInput />
                    </Form.Item>
                    <Button size="large" type="primary">Tìm kiếm</Button>

                </Form>

            </div>


        </>
    )
}

const ExtraOption = (props) => {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    return (
        <>
            <Card className="bg-white">
                <Title level={4}>Tìm kiếm nâng cao</Title>
                <Form
                    {...layout}
                >
                    <Form.Item
                        label="Ngành nghề"
                    >
                        <Select>
                            <Option value="1">It</Option>
                            <Option value="2">Bán hàng</Option>
                            <Option value="3">Thu ngân</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Tỉnh thành"
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select"
                        >
                            <Option value="1">Hà Nội</Option>
                            <Option value="2">Vĩnh Phúc</Option>
                            <Option value="3">Thanh Hóa</Option>
                            <Option value="4">Trà Vinh</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Giới tính"
                    >
                        <Select>
                            <Option value="1">Tất cả</Option>
                            <Option value="2">Nam</Option>
                            <Option value="3">Nữ</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Năm sinh"
                    >
                        <RangePicker picker="year" />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Button type="primary">Tìm kiếm</Button>
                    </Form.Item>

                </Form>
            </Card>


        </>
    )
}


export default SettingJob;