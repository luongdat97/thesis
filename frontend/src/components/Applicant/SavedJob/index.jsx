import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, Collapse, Card, Typography, List, Divider } from 'antd';
import SavedJobCard from './SavedJobCard'
import savedJobApi from '../../../api/savedJobApi'
import {useCookies} from 'react-cookie'
const { Title } = Typography

const SavedJob = (props) => {
    const [cookies] = useCookies(['user'])
    const [savedList, setSavedList] = useState([])
    const fetchSavedList = async () => {
        const applicant_id = cookies.user.id
        let savedList = await savedJobApi.getSavedJobList({applicant_id})
        console.log(savedList.data)
        setSavedList(savedList.data)
    }

    const deleteSavedJob = (savedJobId) => {
        savedJobApi.delSavedJob(savedJobId).then(res => {
            let index = savedList.findIndex((item) => item.id === savedJobId)

            let newSavedList = [...savedList]
            newSavedList.splice(index, 1)
            setSavedList(newSavedList)
        })
    }

    useEffect(()=> {
        fetchSavedList()
    },[])
    return (
        <>
            <Card>
                <Title level={3} className="mb-5">Danh sách việc làm đã lưu</Title>
                {savedList.map((item) => (
                    <div>
                        <SavedJobCard job={item.job_ref} key={item.id} deleteSavedJob={()=> deleteSavedJob(item.id)}></SavedJobCard>
                        <br />
                    </div>
                    
                ))}
            </Card>


        </>
    )
}

export default SavedJob;