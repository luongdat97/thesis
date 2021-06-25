import React, { useState, useEffect } from 'react';
import { Form, Input, Tabs, Select, Row, Col, Table, Card, Typography, Space, Checkbox, Button, Popconfirm, message, Badge } from 'antd';
import { useCookies } from 'react-cookie'
import jobApi from '../../../api/jobApi'
import appliedJobApi from '../../../api/appliedJobApi'
import invitedApplicantApi from '../../../api/invitedApplicant'
import savedApplicantApi from '../../../api/savedApplicant'
import moment from 'moment'
import util from '../../../helper/util'
import { jobState } from '../../../Constances/const'
import CvModal from '../../CvModal'
import ApproveModal from './ApproveModal'

const { TabPane } = Tabs;
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

const CandidateManage = (props) => {
  const [jobList, setJobList] = useState([])
  const [chosenJob, setChosenJob] = useState(props.location.state?.job || {})
  const [cookies] = useCookies(["user"])
  let recruiter_id = cookies.user.id
  useEffect(() => {
    jobApi.getJobList({ recruiter_id }).then(res => {
      console.log(res.data)
      setJobList(res.data)
      if (!chosenJob.id) setChosenJob(res.data[0])
    })
  }, [])
  return (
    <>
      <div className="bg-white p-3">
        {!!chosenJob &&
          <>
            <Title level={3}>Quản lý ứng viên</Title>
            <div className="mb-3">
              Chọn tin tuyển dụng liên quan:&nbsp;
            <Select style={{ width: 500 }} placeholder="Chọn tin tuyển dụng" size="large" value={chosenJob.id} onChange={(value) => { setChosenJob(jobList.find(item => item.id === value)) }}>
                {jobList.map(item =>
                  <Option value={item.id} key={item.id}>{item.title}</Option>
                )}
              </Select>
            </div>

            <div className="mb-3">
              Trạng thái tin tuyển dụng: {util.isOutDate(chosenJob.endDate) ? "Tin đã hết hạn" : !chosenJob.state? "Chờ duyệt" : (jobState.find(item =>  item.code == chosenJob.state ))?.label}
            </div>

            <div className="mb-3">
              Hạn tuyển: {moment(chosenJob.endDate).format("DD/MM/YYYY")}
            </div>

            <CandidateTable chosenJob={chosenJob} recruiter_id={recruiter_id} />
          </>
        }
        {!chosenJob &&
          <Title level={3}>Bạn chưa có tin tuyển dụng nào, hãy đăng tin mới để sử dụng chức năng này!</Title>
        }
      </div>
    </>
  )
}

const CandidateTable = (props) => {
  const { chosenJob, recruiter_id } = props
  const [applicantList, setApplicantList] = useState([])
  const [invitedList, setInvitedList] = useState([])
  const [savedList, setSavedList] = useState([])
  const [dayMeet, setDayMeet] = useState(null)
  const [approveMessage, setApproveMessage] = useState("")

  const approvedList = (applicantList.filter((item) => item.state == 1)).map(item => ({
    ...item.applicant_ref.profile, key: item.id, ...item,
  }))
  const waitedList = (applicantList.filter((item) => !item.state)).map(item => ({
    ...item.applicant_ref.profile, key: item.id, ...item,
  }))
  const rejectedList = (applicantList.filter((item) => item.state == 2)).map(item => ({
    ...item.applicant_ref.profile, key: item.id, ...item,
  }))

  const savedListData = savedList.map(item => ({ ...item.applicant.profile, key: item.id, ...item }))
  const invitedListData = invitedList.map(item => ({ ...item.applicant.profile, key: item.id, ...item }))
  useEffect(() => {
    if (chosenJob.id) {
      fetchAppliedList()
      fetchInvitedList()
      fetchSavedList()
    }

  }, [chosenJob])

  const fetchAppliedList = () => {
    appliedJobApi.getAppliedJobList({ job_id: chosenJob.id }).then(res => {
      console.log(res.data)
      setApplicantList(res.data)
    })
  }

  const fetchInvitedList = () => {
    invitedApplicantApi.getInvitedApplicantList({ job_id: chosenJob.id }).then(res => {
      console.log(res.data)
      setInvitedList(res.data)
    })
  }

  const fetchSavedList = () => {
    savedApplicantApi.getSavedApplicantList({ recruiter_id }).then(res => {
      console.log(res.data)
      setSavedList(res.data)
    })
  }

  const approve = (appliedJobId) => {
    appliedJobApi.editAppliedJob({ id: appliedJobId, state: 1, dayMeet, message }).then(res => {
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

  const delInvite = (invitedId) => {
    invitedApplicantApi.delInvitedApplicant({ id: invitedId }).then(res => {
      message.success("Bạn đã xóa lời mời thành công!")
      fetchInvitedList()
    })
  }

  const delSave = (savedId) => {
    savedApplicantApi.delSavedApplicant(savedId).then(res => {
      message.success("Bạn đã bỏ lưu thành công!")
      fetchSavedList()
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
      title: 'Ngày phỏng vấn',
      dataIndex: 'dayMeet',
      key: 'dayMeet',
      render: text => moment(text).format(" HH:mm DD/MM/YYYY")
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <CvModal cvId={record.cv_id} smallButton />

          {/* <Popconfirm
            title="Bạn có muốn từ chối ứng viên này?"
            onConfirm={() => { reject(record.id) }}
            okText="Đồng ý"
            cancelText="Thoát"
          >
            <Button size="small" type="primary" danger>Từ chối</Button>
          </Popconfirm> */}


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
          <CvModal cvId={record.cv_id} smallButton />
          {/* <Popconfirm
            title="Bạn có muốn duyệt ứng viên này?"
            onConfirm={() => { approve(record.id) }}
            okText="Đồng ý"
            cancelText="Thoát"
          >
            <Button size="small" type="primary">Duyệt</Button>
          </Popconfirm> */}
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
          <CvModal cvId={record.cv_id} smallButton />
          <ApproveModal dayMeet={dayMeet} message={approveMessage} setMessage={setApproveMessage} setDayMeet={setDayMeet} handleApprove={() => approve(record.id)} />

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
  const savedColumns = [
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
          <CvModal cvId={record.cv_id} smallButton />

          <Popconfirm
            title="Bạn có muốn bỏ lưu ứng viên này?"
            onConfirm={() => { delSave(record.id) }}
            okText="Đồng ý"
            cancelText="Thoát"
          >
            <Button size="small" type="primary" danger>Bỏ lưu</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const invitedColumns = [
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
          <CvModal cvId={record.cv_id} smallButton />

          <Popconfirm
            title="Bạn có muốn xóa lời mời ứng viên này?"
            onConfirm={() => { delInvite(record.id) }}
            okText="Đồng ý"
            cancelText="Thoát"
          >
            <Button size="small" type="primary" danger>Xóa lời mời</Button>
          </Popconfirm>


        </Space>
      ),
    },
  ];

  return (
    <Tabs defaultActiveKey="1" >
      <TabPane tab={<Badge count={waitedList.length} offset={[10, 0]}><span>Ứng viên mới chờ duyệt</span></Badge>} key="1">
        <Table columns={waitedColumns} dataSource={waitedList} />
      </TabPane>
      <TabPane tab="Ứng viên đã duyệt" key="2">
        <Table columns={approvedColumns} dataSource={approvedList} />
      </TabPane>

      <TabPane tab="Ứng viên bị từ chối" key="3">
        <Table columns={rejectedColumns} dataSource={rejectedList} />
      </TabPane>
      <TabPane tab="Ứng viên đã mời ứng tuyển" key="4">
        <Table columns={invitedColumns} dataSource={invitedListData} />
      </TabPane>
      <TabPane tab="Ứng viên đã lưu" key="5">
        <Table columns={savedColumns} dataSource={savedListData} />
      </TabPane>
    </Tabs>
  )
};

export default CandidateManage;