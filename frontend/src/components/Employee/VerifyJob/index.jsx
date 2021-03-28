import React, { useState, useEffect } from 'react';
import { Form, Input, Tabs, Select, Row, Col, Table, Tag, Typography, Space, Checkbox, Button } from 'antd';

const { TabPane } = Tabs;
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

const JobManager = (props) => {
    return (
        <>
            <Title level={3}>Duyệt tin tuyển dụng</Title>
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
    <TabPane tab="Tin tuyển dụng mới cần duyệt " key="1">
    <Table columns={columns} dataSource={data} />
    </TabPane>
    <TabPane tab="Tin đã duyệt" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Tin bị từ chối" key="3">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
);

const columns = [
  {
    title: 'Tin tuyển dụng',
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
    title: 'Công ty',
    dataIndex: 'company',
    key: 'company',
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
        <Button type="primary">Xem tin</Button>
        <Button type="primary">Duyệt tin</Button>
        <Button type="primary">Từ chối</Button>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    jobName: 'Tuyển dụng thực tập sinh JAVA',
    owner: 'Lương Mạnh Đạt',
    company: 'FPT software',
    createdDate: '20/01/2021'
  },
  {
    key: '2',
    jobName: 'Tuyển dụng thực tập sinh JAVA',
    owner: 'Lương Mạnh Đạt',
    company: 'FPT software',
    createdDate: '20/01/2021'
  },
]

export default JobManager;