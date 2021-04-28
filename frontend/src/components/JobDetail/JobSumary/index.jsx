import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, Collapse, Card, Typography, Space, message, Modal, Radio } from 'antd';
import moment from "moment"
import { useCookies } from 'react-cookie'
import styled from 'styled-components'
import appliedJobApi from '../../../api/appliedJobApi'
import savedJobApi from '../../../api/savedJobApi'
import cvApi from '../../../api/cvApi'
import { Link } from 'react-router-dom'
const { Option } = Select;
const { Panel } = Collapse;
const { Meta } = Card;
const { Title, Text } = Typography;

export default function JobSumary(props) {
    const [cookies] = useCookies(['user']);
    const [chosenCv, setChosenCv] = useState(null);
    const [appliedJobId, setAppliedJobId] = useState(null)
    const [savedJobId, setSavedJobId] = useState(null)
    const job = props.job
    const user = cookies.user
    const applyJob = () => {
        console.log(user)
        appliedJobApi.postAppliedJob({ applicant_id: user.id, job_id: job.id, cv_id: chosenCv }).then((res) => {
            setAppliedJobId(res.data.id)
        })
    }

    const deleteAppliedJob = () => {
        appliedJobApi.delAppliedJob(appliedJobId).then((res) => {
            setAppliedJobId(null)
        })
    }

    const saveJob = () => {
        console.log(user)
        savedJobApi.postSavedJob({ applicant_id: user.id, job_id: job.id }).then((res) => {
            setSavedJobId(res.data.id)
        })
    }

    const deleteSavedJob = () => {
        savedJobApi.delSavedJob(savedJobId).then((res) => {
            setSavedJobId(null)
        })
    }

    const fetchAppliedJob = async () => {
        if (job.id) {
            let appliedJob = await appliedJobApi.getAppliedJobByApplicantAndJob({applicant_id: user.id, job_id: job.id})
            console.log(appliedJob)
            if (appliedJob) {
                setAppliedJobId(appliedJob.data.id)
            }   
        }
    }

    const fetchSavedJob = async () => {
        if(job.id) {
            let savedJob = await savedJobApi.getSavedJobByApplicantAndJob({applicant_id: user.id, job_id: job.id})
            console.log(savedJob)
            if (savedJob) {
                setSavedJobId(savedJob.data.id)
            }
        }
        
    }

    useEffect(()=>{
        fetchAppliedJob()
    },[job])
    useEffect(()=>{
        fetchSavedJob()
    },[job])
    return (
        <Card>
            <Row gutter={16}>
                <Col span={4} className="px-5">
                    <img className="w-100" alt="company logo" src='https://res.cloudinary.com/project0407/image/upload/v1615347249/project/company%20logo/cong-ty-co-phan-dau-tu-phat-trien-anh-va-em-59db4c9957711_rs_abw9g7.jpg'></img>
                </Col>
                <Col span={12}>
                    <Title level={3} className="text-uppercase text-success">{job.title}</Title>
                    <Title level={5}>Công ty TNHH AmorePacific Việt Nam</Title>
                    <Text><i className="fas fa-map-marker-alt"></i> {job.address}</Text><br />
                    <Text><i className="far fa-clock"></i> Hạn nộp hồ sơ: {moment(job.endDate).format("DD/MM/YYYY")}</Text>
                </Col>
                <Col span={8}>
                    <Space direction="vertical" size="large">

                        {!appliedJobId && <ApplyModal user={user} chosenCv={chosenCv} setChosenCv={setChosenCv} applyJob={applyJob}></ApplyModal>}
                        {!!appliedJobId && <Button onClick={deleteAppliedJob} size="large" type="primary" style={{ background: "#73d13d", borderColor: "#73d13d", width: 150 }}>Đã ứng tuyển</Button>}

                        {!savedJobId && <Button onClick={saveJob} size="large" style={{ width: 150 }}>Lưu tin</Button>}
                        {!!savedJobId && <Button onClick={deleteSavedJob} size="large" style={{ width: 150 }}>Đã lưu</Button>}
                    </Space>

                </Col>
            </Row>
        </Card>

    )
}
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

const ApplyModal = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [cvList, setCvList] = useState([])
    const { chosenCv, setChosenCv, applyJob, user } = props
    useEffect(() => {
        fetchCv()
    }, [])

    const fetchCv = () => {
        cvApi.getCvList({applicant_id: user.id}).then((res) => {
            console.log(user.id)
            console.log(res.data)
            let cvList = res.data
            setCvList(cvList)

            if (cvList.length) {
                setChosenCv(cvList[0].id)
            }

        })
    }


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        applyJob()
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button onClick={showModal} size="large" type="primary" style={{ background: "#73d13d", borderColor: "#73d13d", width: 150 }}>Ứng tuyển ngay</Button>
            <Modal title="Chọn CV ứng tuyển" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Quay lại
                </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Nộp đơn ứng tuyển
                </Button>,
                ]}
            >
                <Radio.Group value={chosenCv} onChange={(e) => setChosenCv(e.target.value)}>
                    {cvList.map(cv => (
                        <Radio style={radioStyle} value={cv.id} key={cv.id}>{cv.jobPosition} <Link target="_blank" to={`/applicant/individual/view-cv/${cv.id}`}>xem CV</Link></Radio>
                    ))}
                </Radio.Group>
            </Modal>
        </>
    );
};