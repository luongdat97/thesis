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

const companyLogo = [
    'https://res.cloudinary.com/project0407/image/upload/v1615347249/project/company%20logo/cong-ty-co-phan-dau-tu-phat-trien-anh-va-em-59db4c9957711_rs_abw9g7.jpg',
    'https://res.cloudinary.com/project0407/image/upload/v1615347249/project/company%20logo/cong-ty-co-phan-replus-5b504e7e8b74f_ka2czs.webp',
    'https://res.cloudinary.com/project0407/image/upload/v1615347249/project/company%20logo/cong-ty-co-phan-dich-vu-di-dong-truc-tuyen-vi-momo-5f55a14a178cc_mekeqf.webp',
    'https://res.cloudinary.com/project0407/image/upload/v1615347249/project/company%20logo/cong-ty-bds-tan-hoang-gia-60470624a2f64_wgstim.jpg',
    'https://res.cloudinary.com/project0407/image/upload/v1615347249/project/company%20logo/cong-ty-tnhh-oh-vacation-5b0fb1bd69cdf_rs_xojube.jpg',
    'https://res.cloudinary.com/project0407/image/upload/v1615347249/project/company%20logo/ngan-hang-thuong-mai-co-phan-ky-thuong-viet-nam-5e7c8a9259ddc_rvysrd.webp',
]

const Home = (props) => {
    let {id} = useParams()
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