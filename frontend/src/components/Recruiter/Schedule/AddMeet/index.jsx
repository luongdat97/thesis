import React, { useState } from 'react';
import { Modal, Button, Form, DatePicker, TimePicker, Radio, Divider, Table } from 'antd';

const AddMeet = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Thêm mới lịch gặp
      </Button>
      <Modal title="Thêm lịch hẹn ứng viên" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Form>
              <Form.Item
                label="Chọn ngày gặp"
              >
                  <DatePicker></DatePicker>
              </Form.Item>
              <Form.Item
                label="Chọn thời gian gặp"
              >
                  <TimePicker format="HH:mm"></TimePicker>
              </Form.Item>
          </Form>
          Chọn ứng viên tham gia lịch hẹn gặp từ bảng:
          <Demo></Demo>
      </Modal>
    </>
  );
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
]; // rowSelection object indicates the need for row selection

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};

const Demo = () => {
  return (
    <div>
      <Table
      size="small"
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};


export default AddMeet