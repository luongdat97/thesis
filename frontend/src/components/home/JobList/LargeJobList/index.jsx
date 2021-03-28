import React, { useState, useEffect } from 'react';
import {Row, Col, Card, Typography} from 'antd';
import GeneralJobCard from '../../JobCard/GeneralJobCard'
const { Title, Text } = Typography;

const LargeJobList = (props) => {
    let {companyLogo} = props
    return (
        <Card
            title={<Title level={3} style={{color: 'inherit'}}>Việc làm tốt nhất</Title>}
            extra={<a href="#" class="text-white">Xem tất cả <i class="fas fa-angle-double-right" style={{color: "inherit"}}></i></a>}
            style={{ width: "100%", ...props.style }}
            headStyle={{ backgroundColor: "#1890ff", color: "#fff" }}
        >
            <Row gutter={[16, 16]}>
                {
                    companyLogo.map((data) => (
                        <Col span={8}>
                            <GeneralJobCard logoUrl={data}/>
                        </Col>
                    ))
                }
                {
                    companyLogo.map((data) => (
                        <Col span={8}>
                            <GeneralJobCard logoUrl={data}/>
                        </Col>
                    ))
                }
                {
                    companyLogo.map((data) => (
                        <Col span={8}>
                            <GeneralJobCard logoUrl={data}/>
                        </Col>
                    ))
                }
            </Row>
        </Card>
    )
}

export default LargeJobList