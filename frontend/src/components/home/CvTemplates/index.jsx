import React, { useState, useEffect } from 'react';
import { Form, Input, Tabs, Select, Row, Col, Table, Tag, Typography, Space, Checkbox, Button, Card } from 'antd';
import FormSearch from './FormSearch';
import {Link} from 'react-router-dom'
import SliderCarousel from '../../home/SliderCarousel'

const { TabPane } = Tabs;
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

const cvCovers = ['https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.1/default.png?v=1.0.3',
    'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.1/timeline_clean_2.png?v=1.0.3',
    'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.1/onepage_impressive.png?v=1.0.3',
    'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.1/timeline_clean_2.png?v=1.0.3',
    'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.1/default.png?v=1.0.3',
]

const JobManager = (props) => {
    return (
        <>
            <SliderCarousel></SliderCarousel>
            <Title level={3} className="mt-3">Danh sách mẫu CV xin việc</Title>
            <Row gutter={30}>
                <Col sm={16}>
                    <Card className="bg-white">
                        <Row gutter={[16, 16]}>
                            {cvCovers.map(url =>
                                <Col span={8}>
                                    <CvCard cover={url}></CvCard>
                                </Col>
                            )}
                        </Row>
                    </Card>
                </Col>
                <Col sm={8}>
                    <FormSearch></FormSearch>
                </Col>
            </Row>

        </>
    )
}

const CvCard = (props) => {
    return (
        <Link to="/cv/create">
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