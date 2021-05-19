import React, { useState, useEffect } from 'react';
import { Form, Input, Tabs, Select, Row, Col, Table, Tag, Typography, Space, Checkbox, Button, Card, Popconfirm, message } from 'antd';
import accountApi from '../../../api/accountApi'
import AddAccount from './AddAccount'
import EditAccount from './EditAccount'
const { TabPane } = Tabs;
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

const AccountManage = (props) => {
  const [accountList, setAccountList] = useState([])
  useEffect(() => {
    fetchAccountList()
  }, [])

  const fetchAccountList = () => {
    accountApi.getAccountList().then(res => {
      console.log(res.data)
      let accountList = res.data
      let accountListForTable = accountList.map((account) => ({
        ...account.profile, ...account, key: account.id
      }))
      setAccountList(accountListForTable)
    })
  }

  const blockAccount = (account_id) => {
    accountApi.changeActive({ account_id, active: false }).then(res => {
      message.success("Bạn đã khóa tài khoản thành công!")
      fetchAccountList()
    })
  }

  const unblockAccount = (account_id) => {
    accountApi.changeActive({ account_id, active: true }).then(res => {
      message.success("Bạn đã mở khóa tài khoản thành công!")
      fetchAccountList()
    })
  }

  const columns = [
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mã ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tài khoản',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text, record) => (
        <Space size="small">
          <EditAccount fetchAccountList={fetchAccountList} data={record}/>
          {record.active &&
            <Popconfirm
              title="Bạn có muốn khóa tài khoản này?"
              onConfirm={() => blockAccount(record.id)}
              okText="Đồng ý"
              cancelText="Thoát"
            >
              <Button type="primary" danger style={{width: 150}}>Khóa tài khoản</Button>
            </Popconfirm>
          }

          {!record.active &&
            <Popconfirm
              title="Bạn có muốn mở khóa tài khoản này?"
              onConfirm={() => unblockAccount(record.id)}
              okText="Đồng ý"
              cancelText="Thoát"
            >
              <Button type="primary" danger ghost style={{width: 150}}>Mở khóa tài khoản</Button>
            </Popconfirm>
          }


        </Space>
      ),
    },
  ];


  return (
    <>
      <Card>
        <Title level={4}>Quản lý tài khoản</Title>
        <AddAccount fetchAccountList={fetchAccountList}/>


        <Table columns={columns} dataSource={accountList} className="mt-3"/>
      </Card>
    </>
  )
}
export default AccountManage;