import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, Collapse, Card, Typography, List, Tag } from 'antd';
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
import { tag } from '../../Constances/const'
const { Option } = Select;
const { Panel } = Collapse;
const { Meta } = Card;
const { Title, Text } = Typography;
const { CheckableTag } = Tag;
const tagsData = ["PHP", "C/C++", "C#", "ReactJS", "Vue", "Angular"]
const Home = () => {
    const [jobList, setJobList] = useState([])
    const [pageIndex, setPageIndex] = useState(0)
    const [total, setTotal] = useState(0)
    const fetchJob = async () => {
        let jobList = (await jobApi.getJobList()).data
        setJobList(jobList)
    }
    useEffect(() => {
        handleSearch()
    }, [pageIndex])
    const [skillRequire, setSkillRequire] = useState([])
    const [workType, setWorkType] = useState("")
    const [paramFilter, setParamFilter] = useState({})

    const handleSearch = () => {
        
        let params
        // if (workType) {
        //     params = {
        //         skillRequire: [...skillRequire, workType]
        //     }
        //     console.log(workType)
        // console.log(params)
        // } else {
        //     params = {
        //         skillRequire: skillRequire
        //     }
        // }
        // console.log(params)
        params = { ...paramFilter}
        // console.log(workType)
        console.log(params)
        jobApi.searchJob({...params, index: pageIndex}).then((res) => {
            console.log(res.data.data)
            setJobList(res.data.data)
            setTotal(res.data.total)
        })
    }
    const handleChange = (tag, checked) => {
        const nextSelectedTags = checked ? [...skillRequire, tag] : skillRequire.filter(t => t !== tag);
        setSkillRequire(nextSelectedTags)
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
                            total={total}
                            setPageIndex={setPageIndex}
                        />
                    </Col>
                    <Col sm={8}>
                    {/* <Card className="mb-3">
                <Title level={4}>Tìm việc IT</Title>
                <div className="d-flex mb-2">
                    <Select
                        placeholder="Nhập từ khóa tìm kiếm"
                        size="large" mode="tags"
                        style={{ width: '100%' }}
                        tokenSeparators={[',']}
                        value={skillRequire}
                        onChange={setSkillRequire}
                    >
                        {tag.map(item => (
                            <Option key={item} value={item}>{item}</Option>
                        ))}
                    </Select>
                    <div style={{ width: 200 }}>
                        <Select
                            placeholder="Loại việc làm"
                            size='large'
                            style={{ width: 200 }}
                            value={workType}
                            onChange={setWorkType}
                        >
                            <Option value="">Tất cả loại hình</Option>
                            <Option value="Frontend">Frontend</Option>
                            <Option value="Backend">Backend</Option>
                            <Option value="Fullstack">Fullstack</Option>
                            <Option value="Tester">Tester</Option>
                        </Select>
                    </div>
                    <Button type="primary" size="large" onClick={handleSearch}>Tìm kiếm</Button>
                </div>
                {tagsData.map((item) => (
                    <CheckableTag className="border" key={item} checked={skillRequire.indexOf(item) > -1} onChange={checked => handleChange(item, checked)}>{item}</CheckableTag>
                ))}
            </Card> */}
                        <FormSearch 
                            setWorkType={setWorkType}
                            workType={workType}
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