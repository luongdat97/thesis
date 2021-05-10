import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Pagination, Radio, Select, Tag, Button } from 'antd';
import HorizontalJobCard from '../../JobCard/HorizontalJobCard'
import jobApi from '../../../../api/jobApi'
import { Link } from 'react-router-dom'
import { tag } from '../../../../Constances/const'
const { CheckableTag } = Tag;
const { Title, Text } = Typography;
const { Option } = Select
const tagsData = ["PHP", "C/C++", "C#", "ReactJS", "Vue", "Angular"]
const InterestJobList = (props) => {
    let { jobList, skillRequire, workType, setSkillRequire, setWorkType, handleSearch } = props
    

    const handleChange = (tag, checked) => {
        const nextSelectedTags = checked ? [...skillRequire, tag] : skillRequire.filter(t => t !== tag);
        setSkillRequire(nextSelectedTags)
      }
    return (
        <>
            <Card className="mb-3">
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
            </Card>
            <Card
                title={<Title level={4} style={{ color: 'inherit' }}>Danh sách việc làm</Title>}
                // extra={<a href="#" className="text-white">Xem tất cả <i className="fas fa-angle-double-right" style={{color: "inherit"}}></i></a>}
                style={{ width: "100%" }}
                headStyle={{ backgroundColor: "#1890ff", color: "#fff" }}
            >
                <Row gutter={[0, 16]}>
                    {
                        jobList.map(job => (
                            <Col key={job.id} span={24}>
                                <Link to={`/job-detail/${job.id}`}>
                                    <HorizontalJobCard job={job} />
                                </Link>

                            </Col>
                        ))
                    }
                </Row>
                <div className="d-flex justify-content-center mt-3">
                    <Pagination defaultCurrent={1} total={150} pageSizeOptions={[]} />
                </div>

            </Card>
        </>

    )
}

export default InterestJobList