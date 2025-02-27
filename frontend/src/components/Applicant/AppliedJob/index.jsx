import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, Collapse, Card, Typography, List } from 'antd';
import AppliedJobCard from './AppliedJobCard'
import appliedJobApi from '../../../api/appliedJobApi'
import { useCookies } from 'react-cookie'
const { Title } = Typography

const AppliedJob = (props) => {
    const [cookies] = useCookies(['user'])
    const [appliedList, setAppliedList] = useState([])
    const fetchAppliedList = async () => {
        const applicant_id = cookies.user.id
        let appliedList = await appliedJobApi.getAppliedJobList({ applicant_id })
        console.log(appliedList.data)
        setAppliedList(appliedList.data)
    }

    useEffect(() => {
        fetchAppliedList()
    }, [])
    return (
        <>
            <Card className="px-4">
                <Title level={3} className="mb-3">Công việc đã ứng tuyển</Title>
                {appliedList.map((item) => {
                    if (item.job_ref) {
                        return <>
                            <AppliedJobCard job={item.job_ref} appliedJob={item} key={item.id}></AppliedJobCard>
                            <br></br>
                        </>
                    }
                }

                )}
            </Card>
        </>
    )
}

export default AppliedJob;