import React, { useState, useEffect } from 'react';
import { Card, Avatar, Tabs, Select, Row, Col, Table, Tag, Typography, Space, Checkbox, Button, Modal, Radio } from 'antd';
import util from "../../../../helper/util"
import { Link } from "react-router-dom"
import invitedApplicantAPI from "../../../../api/invitedApplicant"
import savedApplicantAPI from "../../../../api/savedApplicant"
const { Title, Text } = Typography
const CandidateCard = (props) => {
    console.log(".........", props)
    const profile = props.data.applicant?.profile || {}
    const cv = props.data.cv
    const desire = props.data
    const { jobList, recruiter_id } = props
    const [savedApplicant, setSavedApplicant] = useState(null)
    useEffect(() => {
        savedApplicantAPI.getSavedApplicant({ recruiter_id, applicant_id: desire.applicant_id }).then(res => {
            console.log(res)
            setSavedApplicant(res.data)
        })
    }, [])

    const saveApplicant = () => {
        savedApplicantAPI.postSavedApplicant({ recruiter_id, applicant_id: desire.applicant_id }).then(res => {
            console.log(res)
            setSavedApplicant(res.data)
        })
    }

    const delSavedApplicant = () => {
        savedApplicantAPI.delSavedApplicant(savedApplicant.id).then(res => {
            setSavedApplicant(null)
        })
    }

    return (
        <>
            <Card style={{ width: "100%" }}>
                <Row gutter={16}>
                    <Col span={4}>
                        <img style={{ width: 100, height: 130, objectFit: 'cover' }} src={cv.avatar.url} />
                    </Col>
                    <Col span={20}>

                        <Title level={4} className="m-0">{profile.name}</Title>
                        <Title level={5} className="m-0"> {cv.jobPosition}</Title>

                        <div>
                            Mức lương mong muốn: {util.toSalaryString(desire.salary)}
                        </div>

                        <Space size="large" className="mt-1">
                            <Text>20 tuổi</Text>
                            <Text>Kinh nghiệm: {desire.experience}</Text>
                            <Text>Địa điểm: {desire.address}</Text>
                        </Space>
                        <br />
                        {cv.experience.map(item => (
                            <div key={item.id}>
                                <Text><i className="fas fa-briefcase"></i> {item.workPlace} - {item.level}</Text>
                            </div>
                        ))}
                        <Text><i className="fas fa-graduation-cap"></i>{cv.education[0].major + " - " + cv.education[0].schoolName}</Text><br />
                        <Space size="small" className="mt-1">
                            <InviteApplyModal jobList={jobList} recruiter_id={recruiter_id} applicant_id={desire.applicant_id} />
                            {!savedApplicant && <Button onClick={() => { saveApplicant() }} style={{ width: 110 }} size="small" type="primary">Lưu ứng viên</Button>}
                            {!!savedApplicant && <Button onClick={() => { delSavedApplicant() }} style={{ width: 110 }} size="small" type="primary">Đã lưu</Button>}
                            <Button style={{ width: 110 }} size="small" type="primary">Xem CV</Button>
                        </Space>
                    </Col>

                </Row>


            </Card>
        </>
    )
}

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

const InviteApplyModal = (props) => {
    const { jobList, applicant_id, recruiter_id } = props
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [chosenJob, setChosenJob] = useState([])

    const showModal = () => {
        setIsModalVisible(true);
    };

    useEffect(()=> {
        invitedApplicantAPI.getInvitedApplicantList({recruiter_id, applicant_id}).then(res => {
            console.log(res.data)
            let listInvitedJob = res.data.map(item => item.job_id) 
            setChosenJob(listInvitedJob)
        })
    },[])

    const handleOk = () => {
        setIsModalVisible(false);
        invitedApplicantAPI.delInvitedApplicant({recruiter_id, applicant_id}).then(res => {
            chosenJob.forEach(chosenJob => {
                invitedApplicantAPI.postInvitedApplicant({ applicant_id, recruiter_id, job_id: chosenJob }).then((res) => {
                    console.log("hahha")
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            })
        })
        
    };



    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button onClick={showModal} style={{ width: 110 }} size="small" type="primary">Mời ứng tuyển</Button>
            <Modal title="Chọn việc làm" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Quay lại
                </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Mời ứng tuyển
                </Button>,
                ]}
            >
                <Checkbox.Group style={{ width: '100%' }} value={chosenJob} onChange={(value) => setChosenJob(value)}>
                    <Row>
                        {jobList.map(job => (
                            <Col span={24}>
                                <Checkbox value={job.id}>{job.title}</Checkbox>
                            </Col>
                        ))}
                    </Row>
                </Checkbox.Group>

            </Modal>
        </>
    );
};

export default CandidateCard