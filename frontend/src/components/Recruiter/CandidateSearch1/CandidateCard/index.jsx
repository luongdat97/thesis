import React, { useState, useEffect } from 'react';
import { Card, Avatar, Tabs, Select, Row, Col, Table, Tag, Typography, Space, Checkbox, Button } from 'antd';
import util from "../../../../helper/util"
const { Title, Text } = Typography
const CandidateCard = (props) => {
    console.log(".........", props)
    const profile = props.data.applicant?.profile || {}
    const cv = props.data.cv
    const desire = props.data
    return (
        <>
            <Card style={{ width: "100%" }}>
                <Row gutter={16}>
                    <Col span={4}>
                        <img style={{ width: 100, height: 130, objectFit:'cover'}} src={cv.avatar.url} />
                    </Col>
                    <Col span={20}>

                        <Title level={4} className="m-0">{profile.name}</Title>
                        <Title level={5} className="m-0"> {cv.jobPosition}</Title>

                        <div>
                            Mức lương mong muốn: {util.toSalaryString(desire.salary)}
                        </div>

                        <Space size="large" className="mt-1">
                            <Text>20 tuổi</Text>
                            <Text>Kinh nghiệm: {desire.experience}</Text>
                            <Text>Địa điểm: {desire.address}</Text>
                        </Space>
                        <br />
                        {cv.experience.map(item => (
                            <div key={item.id}>
                                <Text><i className="fas fa-briefcase"></i> {item.workPlace} - {item.level}</Text>
                            </div>

                        ))}
                        <Text><i className="fas fa-graduation-cap"></i>{cv.education[0].major + " - " + cv.education[0].schoolName}</Text><br />


                        <Space size="small" className="mt-1">
                            <Button style={{ width: 110 }} size="small" type="primary">Mời ứng tuyển</Button>
                            <Button style={{ width: 110 }} size="small" type="primary">Lưu ứng viên</Button>
                            <Button style={{ width: 110 }} size="small" type="primary">Xem CV</Button>
                        </Space>
                    </Col>

                </Row>


            </Card>
        </>
    )
}

export default CandidateCard