import React, { useState, useEffect } from 'react';
import { Form, Input, Tabs, Select, Row, Col, Table, Card, Typography, Space, Button, Popconfirm, message } from 'antd';
import jobApi from "../../../api/jobApi"
import { attachTypeApi } from 'antd/lib/message';
import moment from 'moment'
import { Link } from 'react-router-dom'

const { TabPane } = Tabs;
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

const JobManager = (props) => {
  const [jobList, setJobList] = useState([])
  useEffect(() => {
    fetchJobList()
  }, [])

  const fetchJobList = () => {
    jobApi.getJobList().then((res) => {
      console.log(res)
      let jobList = res.data.map((item) => ({
        key: item.id,
        title: item.title,
        endDate: moment(item.endDate).format('DD/MM/YYYY'),
        numberApply: "20",
        id: item.id
      }))
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

  const columns = [
    {
      title: 'Vị trí tuyển dụng',
      dataIndex: 'title',
      key: 'title',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Hạn nhận hồ sơ',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Tổng CV apply',
      dataIndex: 'numberApply',
      key: 'numberApply',
    },
    {
      title: 'Thời gian yêu cầu hiển thị',
      key: 'showTime',
      dataIndex: 'showTime',
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

  return (
    <>
      <Card>
        <Title level={3}>Danh sách tin tuyển dụng</Title>



        <Demo jobData={jobList} columns={columns}></Demo>

      </Card>


    </>
  )
}



function callback(key) {
  console.log(key);
}

const Demo = (props) => (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="Tin đang hiển thị" key="1">
      <Table columns={props.columns} dataSource={props.jobData} />
    </TabPane>
    <TabPane tab="Tin chờ xác thực" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Tin hết hạn" key="3">
      Content of Tab Pane 3
    </TabPane>
    <TabPane tab="Tin bị từ chối" key="4">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
);

export default JobManager;