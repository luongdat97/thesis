import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Pagination, Radio, Select, Tag, Button } from 'antd';
import {useCookies} from 'react-cookie'
import HorizontalJobCard from '../../JobCard/HorizontalJobCard'
import jobApi from '../../../../api/jobApi'
import { Link } from 'react-router-dom'
import { tag } from '../../../../Constances/const'
const { CheckableTag } = Tag;
const { Title, Text } = Typography;
const { Option } = Select
const tagsData = ["PHP", "C/C++", "C#", "ReactJS", "Vue", "Angular"]
const InterestJobList = (props) => {
    let { jobList, skillRequire, workType, setSkillRequire, setWorkType, handleSearch, total, setPageIndex } = props
    const [cookies, setCookie] = useCookies(['user']);
    let url = ""
    if (cookies.user) {
        url="/applicant"
    }

    return (
        <>
            
            <Card
                title={<Title level={4} style={{ color: 'inherit' }}>Danh sách việc làm IT</Title>}
                // extra={<a href="#" className="text-white">Xem tất cả <i className="fas fa-angle-double-right" style={{color: "inherit"}}></i></a>}
                style={{ width: "100%" }}
                headStyle={{ backgroundColor: "#1890ff", color: "#fff" }}
            >
                <Row gutter={[0, 16]}>
                    {
                        jobList.map(job => (
                            <Col key={job.id} span={24}>
                                <Link to={`${url}/job-detail/${job.id}`}>
                                    <HorizontalJobCard job={job} />
                                </Link>
                            </Col>
                        ))
                    }
                </Row>
                <div className="d-flex justify-content-center mt-3">
                    <Pagination defaultCurrent={1} onChange={(pageIndex) => setPageIndex(pageIndex - 1)} total={total} pageSizeOptions={[]} />
                </div>

            </Card>
        </>

    )
}

export default InterestJobList