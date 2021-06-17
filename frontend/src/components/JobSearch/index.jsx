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
    const [pageIndex, setPageIndex] = useState(0)
    const [total, setTotal] = useState(1)
    return (
        <>
            <HomeSlider />
            <div style={{paddingTop: 25, backgroundColor: "#f0f2f5"}}>
                <Row gutter={30}>
                    <Col sm={16}>
                        <InterestJobList jobList={jobList} setPageIndex={setPageIndex} total={total}></InterestJobList>
                    </Col>
                    <Col sm={8}>
                        <FormSearch setJobList={setJobList} pageIndex={pageIndex} setTotal={setTotal}></FormSearch>
                    </Col>
                </Row>
            </div>
        </>
    );
};


export default Home