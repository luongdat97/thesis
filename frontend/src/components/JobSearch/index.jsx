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
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

const Home = () => {
    return (
        <>
            <HomeSlider />
            <div style={{paddingTop: 25, backgroundColor: "#f0f2f5"}}>
                <Row gutter={30}>
                    <Col sm={16}>
                        <InterestJobList companyLogo={companyLogo}></InterestJobList>
                    </Col>
                    <Col sm={8}>
                        <FormSearch></FormSearch>
                    </Col>
                </Row>
                
                
                <Row style={{marginTop: 25}} gutter={25}>
                    <Col span={16}>
                        <LargeJobList companyLogo={companyLogo}></LargeJobList>
                        <br></br>
                        <InterestJobList  companyLogo={companyLogo}></InterestJobList>
                        <br></br>
                        <AreaJobList></AreaJobList>
                        <br></br>
                        <AreaJobList></AreaJobList>
                    </Col>
                    <Col span={8}>
                        <img style={{width: "100%"}} alt="advertise" src="https://res.cloudinary.com/project0407/image/upload/v1615362884/project/advertise/co-viec-sieu-toc-cung-topcv_vlafgn.webp"></img>                            
                    </Col>
                </Row>
            </div>

        </>

    );
};


export default Home