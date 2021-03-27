import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, Row, Col, Button, Typography, Space, Checkbox } from 'antd';
import CandidateCard from "./CandidateCard"
import SearchInput from "./SearchInput"

const { RangePicker } = DatePicker
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


export default SettingJob;