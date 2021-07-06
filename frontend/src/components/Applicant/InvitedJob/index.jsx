import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, Collapse, Card, Typography, List, Divider } from 'antd';
import SavedJobCard from './SavedJobCard'
import invitedApplicant from '../../../api/invitedApplicant'
import jobApi from "../../../api/jobApi"
import { useCookies } from 'react-cookie'
import { promised } from 'q';
const { Title } = Typography

const SavedJob = (props) => {
    const [cookies] = useCookies(['user'])
    const [invitedList, setInvitedList] = useState([])
    const fetchInvitedList = async () => {
        const applicant_id = cookies.user.id
        let invitedList = await invitedApplicant.getInvitedApplicantList({ applicant_id })
        console.log(invitedList.data)
        let data = await Promise.all(invitedList.data.map(async (item) => {
            let Job = await jobApi.getJobById(item.job_id)
            return ({ ...item, job_ref: Job.data })
        }))

        console.log(data)
        setInvitedList(data)
    }

    const deleteSavedJob = (savedJobId) => {
        invitedApplicant.delInvitedApplicant({id: savedJobId}).then(res => {
            console.log(savedJobId)
            let index = invitedList.findIndex((item) => item.id === savedJobId)

            let newInvitedList = [...invitedList]
            newInvitedList.splice(index, 1)
            setInvitedList(newInvitedList)
        })
    }

    useEffect(() => {
        fetchInvitedList()
    }, [])
    return (
        <>
            <Card className="px-4">
                <Title level={3} className="mb-3">Danh sách lời mời ứng tuyển</Title>
                {invitedList.map((item) => (
                    <div>
                        <SavedJobCard job={item.job_ref} key={item.id} deleteSavedJob={() => deleteSavedJob(item.id)}></SavedJobCard>
                        <br />
                    </div>

                ))}
            </Card>


        </>
    )
}

export default SavedJob;