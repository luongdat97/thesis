import React, { useState, useEffect } from 'react';
import { Form, Input, Tabs, Select, Row, Col, Table, Card, Typography, Space, Button, Popconfirm, message } from 'antd';
import jobApi from "../../../api/jobApi"
import { attachTypeApi } from 'antd/lib/message';
import PostJob from '../PostJob'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import util from '../../../helper/util'

const { TabPane } = Tabs;
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

const JobManager = (props) => {
  const [jobList, setJobList] = useState([])
  let displayedList = jobList.filter(item => item.state === 1 && !util.isOutDate(item.endDate))
  let waitedList = jobList.filter(item => !item.state && !util.isOutDate(item.endDate))
  let rejectedList = jobList.filter(item => item.state === 2 && !util.isOutDate(item.endDate))
  let outDateList = jobList.filter(item => util.isOutDate(item.endDate))
  const [cookies] = useCookies(['user'])
  let recruiter_id = cookies.user.id
  useEffect(() => {
    fetchJobList()
  }, [])

  const fetchJobList = () => {
    jobApi.getJobList({ recruiter_id }).then((res) => {
      let jobList = res.data.map((item) => ({
        ...item,
        key: item.id
      }))
      console.log(jobList)
      setJobList(jobList)
    })
  }

  const handleDelJob = (jobId) => {
    return jobApi.delJob(jobId)
  }

  const removeJobFromList = (jobId) => {
    let newList = [...jobList]
    let removeIndex = newList.findIndex((job) => job.id === jobId)
    newList.splice(removeIndex, 1)
    setJobList(newList)
  }

  const delConfirm = (jobId) => {
    console.log("jobid.................")
    console.log(jobId)
    handleDelJob(jobId).then((res) => {
      removeJobFromList()
      message.success('Click on Yes');

    })

  }

  const rejectedColumns = [
    {
      title: 'Vị trí tuyển dụng',
      dataIndex: 'title',
      key: 'title',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Mã tin',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Hạn nhận hồ sơ',
      dataIndex: 'endDate',
      key: 'endDate',
      render: endDate => moment(endDate).format("DD/MM/YYYY")
    },
    {
      title: 'Lý do từ chối',
      dataIndex: 'rejectReason',
      key: 'rejectReason',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text, record) => (
        <Space size="small">
          <Link to={`/recruiter/edit-job/${record.id}`} ><Button type="primary" size="small">Sửa</Button></Link>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => delConfirm(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" size="small" danger>Xóa</Button>
          </Popconfirm>

        </Space>
      ),
    },
  ];

  const displayedColumns = [
    {
      title: 'Vị trí tuyển dụng',
      dataIndex: 'title',
      key: 'title',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Mã tin',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Hạn nhận hồ sơ',
      dataIndex: 'endDate',
      key: 'endDate',
      render: endDate => moment(endDate).format("DD/MM/YYYY")
    },
    {
      title: 'Tổng CV apply',
      dataIndex: 'numberApply',
      key: 'numberApply',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text, record) => (
        <Space size="small">
          <Button type="primary" size="small">Xem CV apply</Button>
          <Link to={`/recruiter/edit-job/${record.id}`} ><Button type="primary" size="small">Sửa</Button></Link>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => delConfirm(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" size="small" danger>Xóa</Button>
          </Popconfirm>

        </Space>
      ),
    },
  ];

  const allStateColumns = [
    {
      title: 'Vị trí tuyển dụng',
      dataIndex: 'title',
      key: 'title',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Mã tin',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Hạn nhận hồ sơ',
      dataIndex: 'endDate',
      key: 'endDate',
      render: endDate => moment(endDate).format("DD/MM/YYYY")
    },
    {
      title: 'Trạng thái',
      dataIndex: 'state',
      key: 'state',
      render: text => !text ? 'Chờ duyệt' : text === 1 ? 'Đã duyệt' : 'Bị từ chối'
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text, record) => (
        <Space size="small">
          <Button type="primary" size="small">Xem CV apply</Button>
          <Link to={`/recruiter/edit-job/${record.id}`} ><Button type="primary" size="small">Sửa</Button></Link>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => delConfirm(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" size="small" danger>Xóa</Button>
          </Popconfirm>

        </Space>
      ),
    },
  ];

  const waitedColumns = [
    {
      title: 'Vị trí tuyển dụng',
      dataIndex: 'title',
      key: 'title',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Mã tin',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Hạn nhận hồ sơ',
      dataIndex: 'endDate',
      key: 'endDate',
      render: endDate => moment(endDate).format("DD/MM/YYYY")
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text, record) => (
        <Space size="small">
          <Link to={`/recruiter/edit-job/${record.id}`} ><Button type="primary" size="small">Sửa</Button></Link>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => delConfirm(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" size="small" danger>Xóa</Button>
          </Popconfirm>

        </Space>
      ),
    },
  ];

  const outDateColumns = [
    {
      title: 'Vị trí tuyển dụng',
      dataIndex: 'title',
      key: 'title',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Mã tin',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Hạn nhận hồ sơ',
      dataIndex: 'endDate',
      key: 'endDate',
      render: endDate => moment(endDate).format("DD/MM/YYYY")
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text, record) => (
        <Space size="small">
          <Link to={`/recruiter/edit-job/${record.id}`} ><Button type="primary" size="small">Sửa</Button></Link>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => delConfirm(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" size="small" danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card>
        <Title level={3}>Danh sách tin tuyển dụng</Title>
        <Tabs defaultActiveKey="1">
        <TabPane tab="Đăng tin" key="6">
            <PostJob fetchJobList={fetchJobList}></PostJob>
          </TabPane>
          <TabPane tab="Tất cả tin" key="5">
            <Table columns={allStateColumns} dataSource={jobList} />
          </TabPane>
          <TabPane tab="Tin đang hiển thị" key="1">
            <Table columns={displayedColumns} dataSource={displayedList} />
          </TabPane>
          <TabPane tab="Tin chờ xác thực" key="2">
            <Table columns={waitedColumns} dataSource={waitedList} />
          </TabPane>
          <TabPane tab="Tin hết hạn" key="3">
            <Table columns={outDateColumns} dataSource={outDateList} />
          </TabPane>
          <TabPane tab="Tin bị từ chối" key="4">
            <Table columns={rejectedColumns} dataSource={rejectedList} />
          </TabPane>
        </Tabs>
      </Card>


    </>
  )
}

export default JobManager;