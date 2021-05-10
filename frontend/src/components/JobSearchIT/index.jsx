import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, Collapse, Card, Typography, List } from 'antd';
import styled from 'styled-components'
import HomeSlider from './SliderCarousel'
import GeneralJobCard from './JobCard/GeneralJobCard'
import HorizontalJobCard from './JobCard/HorizontalJobCard'
import AreaJobList from './JobList/AreaJobList'
import InterestJobList from './JobList/InterestJobList'
import LargeJobList from './JobList/LargeJobList'
import SearchJobForm from './SearchJobForm'
import FormSearch from './FormSearch'
import jobApi from '../../api/jobApi'
const { Option } = Select;
const { Panel } = Collapse;
const { Meta } = Card;
const { Title, Text } = Typography;

const Home = () => {
    const [jobList, setJobList] = useState([])
    const fetchJob = async () => {
        let jobList = (await jobApi.getJobList()).data
        setJobList(jobList)
    }
    useEffect(() => {
        fetchJob()
    }, [])
    const [skillRequire, setSkillRequire] = useState([])
    const [workType, setWorkType] = useState("")
    const [paramFilter, setParamFilter] = useState({})

    const handleSearch = () => {
        let params
        if (workType) {
            params = {
                skillRequire: [...skillRequire, workType]
            }
        } else {
            params = {
                skillRequire: skillRequire
            }
        }

        params = {...params, ...paramFilter}

        jobApi.searchJob(params).then((res) => {
            console.log(res.data)
            setJobList(res.data)
        })
    }
    return (
        <>
            <HomeSlider />
            <div style={{ paddingTop: 25, backgroundColor: "#f0f2f5" }}>
                <Row gutter={30}>
                    <Col sm={16}>
                        <InterestJobList
                            jobList={jobList}
                            setJobList={setJobList}
                            setSkillRequire={setSkillRequire}
                            setWorkType={setWorkType}
                            skillRequire={skillRequire}
                            workType={workType}
                            handleSearch={handleSearch}
                        />
                    </Col>
                    <Col sm={8}>
                        <FormSearch 
                            setJobList={setJobList}
                            handleSearch={handleSearch}
                            paramFilter={paramFilter}
                            setParamFilter={setParamFilter}
                        ></FormSearch>

                    </Col>
                </Row>


            </div>

        </>

    );
};


export default Home