import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, Row, Col, Button, Typography, Space, Checkbox } from 'antd';
import CandidateCard from "./CandidateCard"
import SearchInput from "./SearchInput"

const { RangePicker } = DatePicker
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

const CandidateSearch = (props) => {
    return (
        <>

            <Title level={3}>Tìm kiếm ứng viên</Title>
            <FormSearch></FormSearch>

            <Row className="mt-5" gutter={16}>
                <Col xs={16}>
                    <CandidateCard></CandidateCard>
                    <CandidateCard></CandidateCard>
                    <CandidateCard></CandidateCard>
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
    return (
        <>
            <Title level={2}>Lọc kết quả</Title>
            <Form>
                <Form.Item
                    label="Chọn ngành nghề"
                >
                    <Select>
                        <Option value="1">It</Option>
                        <Option value="2">Bán hàng</Option>
                        <Option value="3">Thu ngân</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Chọn tỉnh thành"
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
                    label="Chọn giới tính"
                >
                    <Select>
                        <Option value="1">Tất cả</Option>
                        <Option value="2">Nam</Option>
                        <Option value="3">Nữ</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Chọn giới hạn năm sinh"
                >
                    <RangePicker picker="year" />
                </Form.Item>
            </Form>

        </>
    )
}


export default CandidateSearch;