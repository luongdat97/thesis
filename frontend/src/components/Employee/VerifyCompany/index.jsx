import React, { useState, useEffect } from 'react';
import { Form, Input, Tabs, Select, Row, Col, Table, Tag, Typography, Space, Checkbox, Button, Modal, message, Popconfirm } from 'antd';
import companyApi from '../../../api/companyApi'
import moment from "moment"
import util from '../../../helper/util'
import { useCookies } from 'react-cookie'
const { TabPane } = Tabs;
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

const CompanyManager = (props) => {
  const [cookies] = useCookies(["user"])
  const [companyList, setCompanyList] = useState([])
  let waitedList = companyList.filter(item => !item.state)
  let approvedList = companyList.filter(item => item.state === 1)
  let rejectedList = companyList.filter(item => item.state === 2)
  let employee = cookies.user
  const fetchCompanyList = async () => {
    let companyRes = await companyApi.getCompanyList()
    let companyList = companyRes.data.map((item, index) => ({ ...item, key: item.id }))
    setCompanyList(companyList)
    console.log(companyList)
  }

  const approveCompany = (company_id) => {
    companyApi.editCompany({ state: 1, employeeVerify_id: employee.id, id: company_id }).then(res => {
      message.success("Đã xác thực công ty!")

      let approvedCompanyIndex = companyList.findIndex((item) => item.id ===company_id)
      let newCompanyList = [...companyList]
      newCompanyList[approvedCompanyIndex].state = 1
      setCompanyList(newCompanyList)
    })
  }

  const rejectCompany = (company_id, rejectReason) => {
    companyApi.editCompany({ state: 2, employeeVerify_id: employee.id, id: company_id, rejectReason }).then((res) => {
      message.success("Đã từ chối công ty!")

      let rejectedCompanyIndex = companyList.findIndex((item) => item.id ===company_id)
      let newCompanyList = [...companyList]
      newCompanyList[rejectedCompanyIndex].state = 2
      newCompanyList[rejectedCompanyIndex].rejectReason = rejectReason
      setCompanyList(newCompanyList)
    })
  }

  useEffect(() => {
    fetchCompanyList()
  }, [])

  const columns = [
    {
      title: 'Công ty',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'ctime',
      key: 'ctime',
      render: ctime => moment(ctime).format("DD/MM/YYYY")
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text, record) => (
        <Space size="small">
          <Popconfirm
            title="Bạn có đồng ý xác thực công ty này?"
            onConfirm={() => approveCompany(record.id)}
            okText="Đồng ý"
            cancelText="Thoát"
          >
            <Button type="primary">Duyệt công ty</Button>
          </Popconfirm>
          
          <RejectModal company={record} rejectCompany={rejectCompany}></RejectModal>
        </Space>
      ),
    },
  ];

  const approvedColumns = [
    {
      title: 'Công ty',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'ctime',
      key: 'ctime',
      render: ctime => moment(ctime).format("DD/MM/YYYY")
    },
  ];

  const rejectedColumns = [
    {
      title: 'Công ty',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'ctime',
      key: 'ctime',
      render: ctime => moment(ctime).format("DD/MM/YYYY")
    },
    {
      title: 'Lý do từ chối',
      dataIndex: 'rejectReason',
      key: 'rejectReason',
    },
  ];

  return (
    <>
      <Title level={3}>Xác thực công ty</Title>
      <div className="bg-white p-3">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Công ty mới cần duyệt " key="1">
            <Table columns={columns} dataSource={waitedList} />
          </TabPane>
          <TabPane tab="Công ty đã duyệt" key="2">
            <Table columns={approvedColumns} dataSource={approvedList} />
          </TabPane>
          <TabPane tab="Công ty bị từ chối" key="3">
            <Table columns={rejectedColumns} dataSource={rejectedList} />
          </TabPane>
        </Tabs>
      </div>
    </>
  )
}
const RejectModal = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState('')
  const { company, rejectCompany } = props
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    rejectCompany(company.id, rejectReason)
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>Từ chối</Button>
      <Modal
        title={`Từ chối công ty: ${company.name}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Thoát
        </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Từ chối công ty
        </Button>,
        ]}
      >
        <div>Nhập lý do từ chối</div>
        <TextArea rows={4} onChange={(ev) => setRejectReason(ev.target.value)} />
      </Modal>
    </>
  );
};



export default CompanyManager;