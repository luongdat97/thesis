import React, { useState, useEffect } from 'react';
import { Form, Input, Tabs, Select, Row, Col, Table, Card, Typography, Space, Checkbox, Button, Popconfirm, message } from 'antd';
import { useCookies } from 'react-cookie'
import jobApi from '../../../api/jobApi'
import appliedJobApi from '../../../api/appliedJobApi'
import invitedApplicantApi from '../../../api/invitedApplicant'
import savedApplicantApi from '../../../api/savedApplicant'
import moment from 'moment'
import util from '../../../helper/util'
import { jobState } from '../../../Constances/const'

const { TabPane } = Tabs;
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

const CandidateManage = (props) => {
  const [jobList, setJobList] = useState([])
  const [chosenJob, setChosenJob] = useState({})
  const [cookies] = useCookies(["user"])
  let recruiter_id = cookies.user.id
  useEffect(() => {
    jobApi.getJobList({ recruiter_id }).then(res => {
      console.log(res.data)
      setJobList(res.data)
    })
  }, [])
  return (
    <>
      <Card>
        <Title level={3}>Quản lý ứng viên</Title>
        <Form>
          <Form.Item
            label="Chọn tin tuyển dụng liên quan"
          >
            <Select placeholder="Chọn tin tuyển dụng" size="large" onChange={(value) => { setChosenJob(jobList.find(item => item.id === value)) }}>
              {jobList.map(item =>
                <Option value={item.id} key={item.id}>{item.title}</Option>
              )}

            </Select>
          </Form.Item>
        </Form>
        {!!chosenJob.id && <>
          Trạng thái tin tuyển dụng: {util.isOutDate(chosenJob.endDate) ? "Tin đã hết hạn" : (jobState.find(item => { console.log(chosenJob); return item.code == chosenJob.state }))?.label}
          <br />
            Hạn tuyển: {moment(chosenJob.endDate).format("DD/MM/YYYY")}
          <br />
          <CandidateTable chosenJob={chosenJob} />
        </>}
      </Card>
    </>
  )
}

const CandidateTable = (props) => {
  const { chosenJob } = props
  const [applicantList, setApplicantList] = useState([])
  const [invitedList, setInvitedList] = useState([])
  const [savedList, setSavedList] = useState([])

  const approvedList = (applicantList.filter((item) => item.state == 1)).map(item => ({
    ...item.applicant_ref.profile, key: item.id, ...item,
  }))
  const waitedList = (applicantList.filter((item) => !item.state)).map(item => ({
    ...item.applicant_ref.profile, key: item.id, ...item,
  }))
  const rejectedList = (applicantList.filter((item) => item.state == 2)).map(item => ({
    ...item.applicant_ref.profile, key: item.id, ...item,
  }))
  useEffect(() => {
    if (chosenJob.id) {
      fetchAppliedList()
    }

  }, [chosenJob])

  const fetchAppliedList = () => {
    appliedJobApi.getAppliedJobList({ job_id: chosenJob.id }).then(res => {
      console.log(res.data)
      setApplicantList(res.data)
    })
  }

  const fetchInvitedList = () => {
    invitedApplicantApi.getInvitedApplicantList({job_id: chosenJob.id}).then(res => {
      console.log(res.data)
      setInvitedList(res.data)
    })
  }

  const fetchSavedList = () => {
    savedApplicantApi.getSavedApplicantList({})
  }

  const approve = (appliedJobId) => {
    appliedJobApi.editAppliedJob({ id: appliedJobId, state: 1 }).then(res => {
      message.success("Bạn đã chấp nhận đơn của ứng viên!")
      fetchAppliedList()
    })
  }

  const reject = (appliedJobId) => {
    appliedJobApi.editAppliedJob({ id: appliedJobId, state: 2 }).then(res => {
      message.success("Bạn đã từ chối đơn của ứng viên!")
      fetchAppliedList()
    })
  }

  const approvedColumns = [
    {
      title: 'Tên ứng viên',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Thao tác',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button size="small" type="primary">Xem CV</Button>

          <Popconfirm
            title="Bạn có muốn từ chối ứng viên này?"
            onConfirm={() => { reject(record.id) }}
            okText="Đồng ý"
            cancelText="Thoát"
          >
            <Button size="small" type="primary" danger>Từ chối</Button>
          </Popconfirm>


        </Space>
      ),
    },
  ];

  const rejectedColumns = [
    {
      title: 'Tên ứng viên',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Thao tác',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button size="small" type="primary">Xem CV</Button>
          <Popconfirm
            title="Bạn có muốn duyệt ứng viên này?"
            onConfirm={() => { approve(record.id) }}
            okText="Đồng ý"
            cancelText="Thoát"
          >
            <Button size="small" type="primary">Duyệt</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const waitedColumns = [
    {
      title: 'Tên ứng viên',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Thao tác',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button size="small" type="primary">Xem CV</Button>
          <Popconfirm
            title="Bạn có muốn duyệt ứng viên này?"
            onConfirm={() => { approve(record.id) }}
            okText="Đồng ý"
            cancelText="Thoát"
          >
            <Button size="small" type="primary">Duyệt</Button>
          </Popconfirm>

          <Popconfirm
            title="Bạn có muốn từ chối ứng viên này?"
            onConfirm={() => { reject(record.id) }}
            okText="Đồng ý"
            cancelText="Thoát"
          >
            <Button size="small" type="primary" danger>Từ chối</Button>
          </Popconfirm>


        </Space>
      ),
    },
  ];

  return (
    <Tabs defaultActiveKey="1" >
      <TabPane tab="Ứng viên đã duyệt" key="1">
        <Table columns={approvedColumns} dataSource={approvedList} />
      </TabPane>
      <TabPane tab="Ứng viên chờ duyệt" key="2">
        <Table columns={waitedColumns} dataSource={waitedList} />
      </TabPane>
      <TabPane tab="Ứng viên bị từ chối" key="3">
        <Table columns={rejectedColumns} dataSource={rejectedList} />
      </TabPane>
      <TabPane tab="Ứng viên đã mời ứng tuyển" key="4">
        Content of Tab Pane 3
      </TabPane>
      <TabPane tab="Ứng viên đã lưu" key="5">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  )
};



const data = [
  {
    key: '1',
    applicantName: 'Lương Mạnh Đạt',
    applicantPhoneNumber: '0981988997',
    email: 'luongdat97@gmail.com'
  },
  {
    key: '2',
    applicantName: 'Lương Mạnh Đạt',
    applicantPhoneNumber: '0981988997',
    email: 'luongdat97@gmail.com'
  },
]

export default CandidateManage;