import React, { useState, useEffect } from 'react';
import { Form, Input, Tabs, Select, Row, Col, Table, Tag, Typography, Space, Checkbox, Button } from 'antd';

const { TabPane } = Tabs;
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

const JobManager = (props) => {
    return (
        <>
            <Title level={3}>Xác thực công ty</Title>
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
    title: 'Tên công ty',
    dataIndex: 'jobName',
    key: 'jobName',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Người tạo',
    dataIndex: 'owner',
    key: 'owner',
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
      <Space size="small">
        <Button type="primary">Xem công ty</Button>
        <Button type="primary">Duyệt</Button>
        <Button type="primary">Từ chối</Button>
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