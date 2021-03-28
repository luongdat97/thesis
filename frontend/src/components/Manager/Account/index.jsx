import React, { useState, useEffect } from 'react';
import { Form, Input, Tabs, Select, Row, Col, Table, Tag, Typography, Space, Checkbox, Button } from 'antd';

const { TabPane } = Tabs;
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

const JobManager = (props) => {
    return (
        <>
            <Title level={3}>Quản lý tài khoản</Title>
            <Row>
                <Col xs={16}>
                <Button type="primary">Tạo mới tài khoản</Button>

                <Table columns={columns} dataSource={data} />
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
    <TabPane tab="Công ty mới cần duyệt " key="1">
    <Table columns={columns} dataSource={data} />
    </TabPane>
    <TabPane tab="Công ty đã duyệt" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Công ty bị từ chối" key="3">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
);

const columns = [
  {
    title: 'Họ tên',
    dataIndex: 'jobName',
    key: 'jobName',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Mã ID',
    dataIndex: 'createdDate',
    key: 'createdDate',
  },
  {
    title: 'Tài khoản',
    dataIndex: 'owner',
    key: 'owner',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'createdDate',
    key: 'createdDate',
  },
  {
    title: 'Vai trò',
    dataIndex: 'createdDate',
    key: 'createdDate',
  },
  {
    title: 'Thao tác',
    key: 'action',
    render: (text, record) => (
      <Space size="small">
        <Button type="primary">Xem</Button>
        <Button type="primary">Sửa</Button>
        <Button type="primary">Khóa tài khoản</Button>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    jobName: 'FPT software',
    owner: 'Lương Mạnh Đạt',
    company: 'FPT software',
    createdDate: '20/01/2021'
  },
  {
    key: '2',
    jobName: 'Samsung',
    owner: 'Lương Mạnh Đạt',
    company: 'Samsung',
    createdDate: '20/01/2021'
  },
]

export default JobManager;