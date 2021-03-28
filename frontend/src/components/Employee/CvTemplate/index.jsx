import React, { useState, useEffect } from 'react';
import { Form, Input, Tabs, Select, Row, Col, Table, Tag, Typography, Space, Checkbox, Button } from 'antd';

const { TabPane } = Tabs;
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

const JobManager = (props) => {
    return (
        <>
            <Title level={3}>Quản lý mẫu CV</Title>
            <Row>
                <Col xs={16}>


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
    <TabPane tab="Quản lý mẫu CV" key="1">
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
    title: 'Tên mẫu CV',
    dataIndex: 'cvName',
    key: 'cvName',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Ảnh',
    dataIndex: 'cvImage',
    key: 'cvImage',
    render: (text) => <img src={text} style={{height: "64px", width: "auto"}}></img>
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdTime',
    key: 'createdTime',
  },
  
  {
    title: 'Thao tác',
    key: 'action',
    render: (text, record) => (
      <Space size="small">
        <Button type="primary">Xem mẫu CV</Button>
        <Button type="primary">Ẩn mẫu CV</Button>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    cvName: 'Mẫu CV Sinh Viên',
    cvImage: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.1/pro_4.png?v=1.0.3',
    createdTime: '20/01/2021'
  },
  {
    key: '2',
    cvName: 'Mẫu CV tiêu chuẩn',
    cvImage: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.1/pro_4.png?v=1.0.3',
    createdTime: '20/01/2021'
  },
]

export default JobManager;