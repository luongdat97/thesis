import React, { useState, useEffect } from 'react';
import { Form, Input, Tabs, Select, Row, Col, Table, Tag, Typography, Space, Checkbox, Button, Card } from 'antd';
import FormSearch from './FormSearch';
import { Link } from 'react-router-dom'
import SliderCarousel from '../../home/SliderCarousel'
import { useCookies } from 'react-cookie'

const { TabPane } = Tabs;
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

const cvCovers = [
    { cover: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.1/onepage_impressive.png?v=1.0.3', url: '/cv/create' },
    { cover: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.1/default.png?v=1.0.3', url: '/cv1/create' },
    // { cover: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.1/timeline_clean_2.png?v=1.0.3' },
    // { cover: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.1/timeline_clean_2.png?v=1.0.3' },
    // { cover: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.1/default.png?v=1.0.3' },
]

const JobManager = (props) => {
    const [cookies] = useCookies(["user"])
    console.log(cookies.user)
    return (
        <>
            <SliderCarousel></SliderCarousel>
            <Title level={3} className="mt-3">Danh sách mẫu CV xin việc</Title>
            <Row gutter={30}>
                <Col sm={24}>
                    <Card className="bg-white">
                        <Row gutter={[32, 32]}>
                            {cvCovers.map((data, index) =>
                                <Col span={6}>
                                    <CvCard cover={data.cover} url={cookies.user ? "/applicant" + data.url : data.url} index={index}></CvCard>
                                </Col>
                            )}
                        </Row>
                    </Card>
                </Col>
                {/* <Col sm={8}>
                    <FormSearch></FormSearch>
                </Col> */}
            </Row>

        </>
    )
}

const CvCard = (props) => {
    return (
        <Link to={props.url}>
            <Card
                hoverable
                className='w-100'
                cover={<img alt="example" src={props.cover} />}
            >
                <Title level={5}>Mẫu CV sinh viên</Title>
                <Tag color="#55acee">
                    Thanh lịch
                </Tag>
                <Tag color="#55acee">
                    Đơn giản
                </Tag>
            </Card>
        </Link>

    )
}


export default JobManager;