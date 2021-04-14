import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, Row, Col, InputNumber, Card, Typography, List, Checkbox, Space, Table, Button } from 'antd';
import AddCampaignModal from "./AddCampaignModal"
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

const columns = [
    {
        title: 'Tên chiến dịch',
        dataIndex: 'campaignName',
        key: 'campaignName',
    },
    {
        title: 'Tin tuyển dụng liên quan',
        dataIndex: 'relatedJob',
        key: 'relatedJob',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdDate',
        key: 'createdDate',
    },
    {
        title: 'Thao tác',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a>Sửa {record.name}</a>
                <a>Xóa</a>
                <a>Xem ứng viên đã lưu</a>
            </Space>
        ),
    },
];

const data = [
    {
        key: '1',
        campaignName: "Thực tập java",
        createdDate: "29/05/2021",
        relatedJob: 'Tuyển dụng nhân viên lập trình java',
    },
    {
        key: '2',
        campaignName: "Developer reactjs",
        createdDate: "29/05/2021",
        relatedJob: 'Tuyển dụng nhân viên lập trình java',
    },
]

const SearchCampaign = (props) => {
    return (
        <>
            <Card>
                <Title level={3}>Tạo chiến dịch tìm kiếm</Title>

                <Row>
                    <Col xs={20}>
                        <Form layout="inline" className="my-3">
                            <Form.Item
                                label="Tìm kiếm theo tên chiến dịch"
                            >
                                <Input placeholder="Nhập tên chiến dịch"></Input>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary">Tìm kiếm</Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col xs={4}>
                        <div className="d-flex justify-content-end my-3">
                            <AddCampaignModal></AddCampaignModal>
                        </div>
                    </Col>

                </Row>



                <Table columns={columns} dataSource={data} />


            </Card>


        </>
    )
}

export default SearchCampaign;