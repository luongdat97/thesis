import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, Collapse, Card, Typography, List } from 'antd';
import styled from 'styled-components'
import HomeSlider from '../home/SliderCarousel'
import SearchJobForm from '../home/SearchJobForm'
import CardDetail from './CardDetail'
import JobSumary from './JobSumary'
import JobDescription from './JobDescription'
import {useParams} from 'react-router-dom'
import jobApi from '../../api/jobApi'
const { Option } = Select;
const { Panel } = Collapse;
const { Meta } = Card;
const { Title, Text } = Typography;

const Home = (props) => {
    let id = useParams().id || props.jobId
    const [job, setJob] = useState({})
    useEffect(() => {
        fetchJob()
    },[])
    const fetchJob = async () => {
        const job = await jobApi.getJobById(id)
        setJob(job.data)
        console.log(job.data)
    }
    return (
        <>
            <div >
                <JobSumary job={job} noAction={props.noAction}></JobSumary>
                <Row gutter={30} className="mt-4">
                    <Col span={16}>
                        <JobDescription job={job}></JobDescription>
                    </Col>
                    <Col span={8}>
                        <CardDetail job={job}></CardDetail>
                    </Col>
                </Row>
            </div>

        </>

    );
};

export default Home