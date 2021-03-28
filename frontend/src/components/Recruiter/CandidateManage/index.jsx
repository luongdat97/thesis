import React, { useState, useEffect } from 'react';
import { Form, Input, Tabs, Select, Row, Col, Table, Tag, Typography, Space, Checkbox, Button } from 'antd';

const { TabPane } = Tabs;
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

const JobManager = (props) => {
    return (
        <>
            <Title level={3}>Danh sách ứng viên</Title>
            <Form>
              <Form.Item
                label="Chọn tin tuyển dụng liên quan"
              >
                <Select placeholder="Chọn tin tuyển dụng" size="large">
                  <Option value="1">Tuyển thực tập sinh JAVA</Option>
                  <Option value="2">Ăn cơm chưa!</Option>
                  <Option value="3">Fresher AI</Option>
                </Select>
              </Form.Item>
            </Form>
            Trạng thái tin tuyển dụng: Đang tuyển dụng
            <br />
            Hạn tuyển: 20/09/2021
            <br />
            <Button>Xem chi tiết tin tuyển dụng</Button>
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
    <TabPane tab="Ứng viên đã duyệt" key="1">
    <Table columns={columns} dataSource={data} />
    </TabPane>
    <TabPane tab="Ứng viên chờ duyệt" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Ứng viên bị từ chối" key="3">
      Content of Tab Pane 3
    </TabPane>
    <TabPane tab="Ứng viên đã mời ứng tuyển" key="4">
      Content of Tab Pane 3
    </TabPane>
    <TabPane tab="Ứng viên đã lưu" key="5">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
);

const columns = [
  {
    title: 'Tên ứng viên',
    dataIndex: 'applicantName',
    key: 'applicantName',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'applicantPhoneNumber',
    key: 'applicantPhoneNumber',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Thao tác',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Sửa</a>
        <a>Xem CV ứng tuyển</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    applicantName: 'Lương Mạnh Đạt',
    applicantPhoneNumber: '0981988997',
    email: 'luongdat97@gmail.com'
  },
  {
    key: '2',
    applicantName: 'Lương Mạnh Đạt',
    applicantPhoneNumber: '0981988997',
    email: 'luongdat97@gmail.com'
  },
]

export default JobManager;