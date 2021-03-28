import React, { useState, useEffect } from 'react';
import { Form, Input, Tabs, Select, Row, Col, Table, Tag, Typography, Space, Checkbox } from 'antd';

const { TabPane } = Tabs;
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

const JobManager = (props) => {
    return (
        <>
            <Title level={3}>Danh sách tin tuyển dụng</Title>
            <Row>
                <Col xs={16}>


                    <Demo></Demo>
                </Col>
                <Col></Col>
            </Row>

        </>
    )
}



function callback(key) {
  console.log(key);
}

const Demo = () => (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="Tin đang hiển thị" key="1">
    <Table columns={columns} dataSource={data} />
    </TabPane>
    <TabPane tab="Tin chờ xác thực" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Tin hết hạn" key="3">
      Content of Tab Pane 3
    </TabPane>
    <TabPane tab="Tin bị từ chối" key="4">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
);

const columns = [
  {
    title: 'Vị trí tuyển dụng',
    dataIndex: 'position',
    key: 'position',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Hạn nhận hồ sơ',
    dataIndex: 'endDate',
    key: 'endDate',
  },
  {
    title: 'Tổng CV apply',
    dataIndex: 'numberApply',
    key: 'numberApply',
  },
  {
    title: 'Thời gian yêu cầu hiển thị',
    key: 'showTime',
    dataIndex: 'showTime',
  },
  {
    title: 'Thao tác',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Sửa {record.name}</a>
        <a>Xóa</a>
        <a>Xem CV apply</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    position: `Nhân Viên Kinh Doanh
    Mức lương: Thoả thuận
    Mã TTD: #382105`,
    endDate: "29/05/2021",
    numberApply: '20',
    showTime: "20 ngày, từ 12/3/2021",
  },
  {
    key: '1',
    position: `Nhân Viên Kinh Doanh
    Mức lương: Thoả thuận
    Mã TTD: #382105`,
    endDate: "29/05/2021",
    numberApply: '20',
    showTime: "20 ngày, từ 12/3/2021",
  },
]

export default JobManager;