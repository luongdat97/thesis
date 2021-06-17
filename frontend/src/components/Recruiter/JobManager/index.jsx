import React, { useState, useEffect } from 'react';
import { Form, Input, Tabs, Select, Row, Col, Table, Card, Typography, Space, Button, Popconfirm, message } from 'antd';
import jobApi from "../../../api/jobApi"
import { attachTypeApi } from 'antd/lib/message';
import PostJob from '../PostJob'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import util from '../../../helper/util'
import recruiterApi from '../../../api/recruiterApi'
import PostJobModal from './PostJobModal'
import EditJobModal from './EditJobModal'
import JobModal from '../../JobModal'

const { TabPane } = Tabs;
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

const JobManager = (props) => {
  const [jobList, setJobList] = useState([])
  const [recruiter, setRecruiter] = useState({})
  let displayedList = jobList.filter(item => item.state === 1)
  let waitedList = jobList.filter(item => !item.state )
  let rejectedList = jobList.filter(item => item.state === 2 )
  let outDateList = jobList.filter(item => util.isOutDate(item.endDate))
  const [cookies] = useCookies(['user'])
  let recruiter_id = cookies.user.id
  useEffect(() => {
    fetchJobList()
    fetchRecruiter()
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

  const fetchRecruiter = () => {
    recruiterApi.getRecruiterById(recruiter_id).then(res => {
      console.log(res.data)
      setRecruiter(res.data)
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
      removeJobFromList(jobId)
      message.success('Bạn đã xóa thành công!');

    })

  }

  const rejectedColumns = [
    {
      title: 'Vị trí tuyển dụng',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <JobModal title={text} jobId={record.id} noAction/>,
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
          <EditJobModal jobId={record.id} fetchJobList={fetchJobList} />
          <Popconfirm
            title="Bạn có muốn xóa tin này?"
            onConfirm={() => delConfirm(record.id)}
            okText="Đồng ý"
            cancelText="Thoát"
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
      render: (text, record) => <JobModal title={text} jobId={record.id} noAction/>,
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
    // {
    //   title: 'Tổng CV apply',
    //   dataIndex: 'numberApply',
    //   key: 'numberApply',
    // },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text, record) => (
        <Space size="small">
          <Button type="primary" size="small">Quản lý ứng viên</Button>
          <EditJobModal jobId={record.id} fetchJobList={fetchJobList} />
          <Popconfirm
            title="Bạn có muốn xóa tin này?"
            onConfirm={() => delConfirm(record.id)}
            okText="Đồng ý"
            cancelText="Thoát"
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
      render: (text, record) => <JobModal title={text} jobId={record.id} noAction/>,
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
          <EditJobModal jobId={record.id} fetchJobList={fetchJobList} />
          <Popconfirm
            title="Bạn có muốn xóa tin này?"
            onConfirm={() => delConfirm(record.id)}
            okText="Đồng ý"
            cancelText="Thoát"
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
      render: (text, record) => <JobModal title={text} jobId={record.id} noAction/>,
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
          <EditJobModal jobId={record.id} fetchJobList={fetchJobList} />
          <Popconfirm
            title="Bạn có muốn xóa tin này?"
            onConfirm={() => delConfirm(record.id)}
            okText="Đồng ý"
            cancelText="Thoát"
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
      render: (text, record) => <JobModal title={text} jobId={record.id} noAction/>,
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
          <EditJobModal jobId={record.id} fetchJobList={fetchJobList} />
          <Popconfirm
            title="Bạn có muốn xóa tin này?"
            onConfirm={() => delConfirm(record.id)}
            okText="Đồng ý"
            cancelText="Thoát"
          >
            <Button type="primary" size="small" danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      {!!recruiter.company_id &&
        <Card>
          <Title level={3}>Quản lý tin tuyển dụng</Title>
          <PostJobModal fetchJobList={fetchJobList} />
          <Tabs defaultActiveKey="5">
            <TabPane tab="Tất cả tin" key="5">
              <Table columns={allStateColumns} dataSource={jobList} />
            </TabPane>
            <TabPane tab="Tin đã được xác thực" key="1">
              <Table columns={displayedColumns} dataSource={displayedList} />
            </TabPane>
            <TabPane tab="Tin không được duyệt" key="4">
              <Table columns={rejectedColumns} dataSource={rejectedList} />
            </TabPane>
            <TabPane tab="Tin chờ xác thực" key="2">
              <Table columns={waitedColumns} dataSource={waitedList} />
            </TabPane>
            <TabPane tab="Tin hết hạn" key="3">
              <Table columns={outDateColumns} dataSource={outDateList} />
            </TabPane>      
          </Tabs>
        </Card>
      }

      {!recruiter.company_id && <CompanyRequre />}



    </>
  )
}

const CompanyRequre = (props) => {
  return (
    <>
      <Card style={{ textAlign: 'center' }}>
        Bạn chưa cập nhật thông tin công ty!<br />
        Để sử dụng chức năng này, vui lòng cập nhật thông tin công ty <Link to="/recruiter/add-company">tại đây</Link> <br />
        <Link to="/recruiter/add-company"><Button type="primary">Cập nhật thông tin công ty</Button></Link>
      </Card>
    </>
  )
}

export default JobManager;