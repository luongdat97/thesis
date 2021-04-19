import React, { useState, useEffect } from 'react';
import {Row, Col, Card, Typography, Pagination} from 'antd';
import HorizontalJobCard from '../../JobCard/HorizontalJobCard'
import jobApi from '../../../../api/jobApi'
import {Link} from 'react-router-dom'
const { Title, Text } = Typography;

const InterestJobList = (props) => {
    const [jobList, setJobList] = useState([])
    const fetchJob = async () => {
        let jobList = (await jobApi.getJobList()).data
        setJobList(jobList)
    }
    useEffect(()=> {
        fetchJob()
    },[])
    let {companyLogo} = props
    console.log(jobList)
    return (
        <Card
            title={<Title level={4} style={{color: 'inherit'}}>Việc làm mới nhất</Title>}
            extra={<a href="#" className="text-white">Xem tất cả <i className="fas fa-angle-double-right" style={{color: "inherit"}}></i></a>}
            style={{ width: "100%" }}
            headStyle={{ backgroundColor: "#1890ff", color: "#fff" }}
        >
            <Row gutter={[0, 16]}>
                {
                    jobList.map(job => (
                        <Col key={job.id} span={24}>
                            <Link to={`/job-detail/${job.id}`}>
                                <HorizontalJobCard job={job}/>
                            </Link>
                            
                        </Col>
                    ))
                }
            </Row>
            <div className="d-flex justify-content-center mt-3">
                <Pagination defaultCurrent={1} total={150} pageSizeOptions={[]}/>
            </div>
            
        </Card>
    )
}

export default InterestJobList