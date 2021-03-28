import React, { useState, useEffect } from 'react';
import { Form, Input, Tabs, Select, Row, Col, Table, Tag, Typography, Space, Checkbox, Button, DatePicker } from 'antd';
import AddMeet from './AddMeet'

const { TabPane } = Tabs;
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

const JobManager = (props) => {
    return (
        <>
            <Title level={3}>Đặt lịch hẹn ứng viên</Title>
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
            Hạn tuyển: 20/09/2021
            <br />
            <Button>Xem chi tiết tin tuyển dụng</Button>
            <div>Số lượng ứng viên: 50</div>
            <div>Đã hẹn gặp: 25</div>
            <div>Chưa hẹn gặp: 25</div>
            <Row>
                <Col xs={16}>
                <AddMeet></AddMeet>
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
    title: 'Ngày hẹn',
    dataIndex: 'dayMeet',
    key: 'dayMeet',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Thời gian hẹn',
    dataIndex: 'timeMeet',
    key: 'timeMeet',
  },
  {
    title: 'Số lượng gặp',
    dataIndex: 'numberMeet',
    key: 'numberMeet',
  },
  {
    title: 'Thao tác',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Sửa lịch gặp</a>
        <a>Xóa lịch gặp</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    dayMeet: '22/03/2021',
    timeMeet: '9:30 phút',
    numberMeet: '20'
  },
  {
    key: '2',
    dayMeet: '22/03/2021',
    timeMeet: '10:30 phút',
    numberMeet: '20'
  },
]

export default JobManager;