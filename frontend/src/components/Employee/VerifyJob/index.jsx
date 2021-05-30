import React, { useState, useEffect } from 'react';
import { Form, Input, Tabs, Select, Row, Col, Table, Tag, Typography, Space, Checkbox, Button, Modal, message, Popconfirm } from 'antd';
import jobApi from '../../../api/jobApi'
import moment from "moment"
import util from '../../../helper/util'
import { useCookies } from 'react-cookie'
import {Link} from "react-router-dom"
const { TabPane } = Tabs;
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

const JobManager = (props) => {
  console.log("haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa...............")
  const [cookies] = useCookies(["user"])
  const [jobList, setJobList] = useState([])
  let waitedList = jobList.filter(item => !item.state)
  let approvedList = jobList.filter(item => item.state === 1)
  let rejectedList = jobList.filter(item => item.state === 2)
  let employee = cookies.user
  const fetchJobList = async () => {
    let jobRes = await jobApi.getJobList()
    let jobList = jobRes.data.map((item, index) => ({ ...item, key: item.id }))
    setJobList(jobList)
    console.log(jobList)
  }

  const approveJob = (job_id) => {
    jobApi.editJob({ state: 1, employeeVerify_id: employee.id, id: job_id }).then(res => {
      message.success("Đã xác thực tin!")

      let approvedJobIndex = jobList.findIndex((item) => item.id ===job_id)
      let newJobList = [...jobList]
      newJobList[approvedJobIndex].state = 1
      setJobList(newJobList)
    })
  }

  const rejectJob = (job_id, rejectReason) => {
    jobApi.editJob({ state: 2, employeeVerify_id: employee.id, id: job_id, rejectReason }).then((res) => {
      message.success("Đã từ chối tin!")

      let rejectedJobIndex = jobList.findIndex((item) => item.id ===job_id)
      let newJobList = [...jobList]
      newJobList[rejectedJobIndex].state = 2
      newJobList[rejectedJobIndex].rejectReason = rejectReason
      setJobList(newJobList)
    })
  }

  useEffect(() => {
    fetchJobList()
  }, [])

  const columns = [
    {
      title: 'Tin tuyển dụng',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <Link  target="_blank" to={`/employee/job-detail/${record.id}`}>{text}</Link>,
    },
    {
      title: 'Mức lương',
      dataIndex: 'salary',
      key: 'salary',
      render: salary => util.toSalaryString(salary)
    },
    {
      title: 'Hạn nộp hồ sơ',
      dataIndex: 'endDate',
      key: 'endDate',
      render: endDate => moment(endDate).format("DD/MM/YYYY")
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
            title="Bạn có đồng ý xác thực tin này?"
            onConfirm={() => approveJob(record.id)}
            okText="Đồng ý"
            cancelText="Thoát"
          >
            <Button type="primary">Duyệt tin</Button>
          </Popconfirm>
          
          <RejectModal job={record} rejectJob={rejectJob}></RejectModal>
        </Space>
      ),
    },
  ];

  const approvedColumns = [
    {
      title: 'Tin tuyển dụng',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <Link  target="_blank" to={`/employee/job-detail/${record.id}`}>{text}</Link>,
    },
    {
      title: 'Mức lương',
      dataIndex: 'salary',
      key: 'salary',
      render: salary => util.toSalaryString(salary)
    },
    {
      title: 'Hạn nộp hồ sơ',
      dataIndex: 'endDate',
      key: 'endDate',
      render: endDate => moment(endDate).format("DD/MM/YYYY")
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
      title: 'Tin tuyển dụng',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <Link  target="_blank" to={`/employee/job-detail/${record.id}`}>{text}</Link>,
    },
    {
      title: 'Mức lương',
      dataIndex: 'salary',
      key: 'salary',
      render: salary => util.toSalaryString(salary)
    },
    {
      title: 'Hạn nộp hồ sơ',
      dataIndex: 'endDate',
      key: 'endDate',
      render: endDate => moment(endDate).format("DD/MM/YYYY")
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
      <Title level={3}>Duyệt tin tuyển dụng</Title>
      <div className="bg-white p-3">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Tin tuyển dụng mới cần duyệt " key="1">
            <Table columns={columns} dataSource={waitedList} />
          </TabPane>
          <TabPane tab="Tin đã duyệt" key="2">
            <Table columns={approvedColumns} dataSource={approvedList} />
          </TabPane>
          <TabPane tab="Tin bị từ chối" key="3">
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
  const { job, rejectJob } = props
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    rejectJob(job.id, rejectReason)
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} danger>Từ chối</Button>
      <Modal
        title={`Từ chối tin: ${job.title}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Thoát
        </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Từ chối tin
        </Button>,
        ]}
      >
        <div>Nhập lý do từ chối</div>
        <TextArea rows={4} onChange={(ev) => setRejectReason(ev.target.value)} />
      </Modal>
    </>
  );
};



export default JobManager;