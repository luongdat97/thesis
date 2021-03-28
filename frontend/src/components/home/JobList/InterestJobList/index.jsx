import React, { useState, useEffect } from 'react';
import {Row, Col, Card, Typography} from 'antd';
import HorizontalJobCard from '../../JobCard/HorizontalJobCard'
const { Title, Text } = Typography;

const InterestJobList = (props) => {
    let {companyLogo} = props
    return (
        <Card
            title={<Title level={3} style={{color: 'inherit'}}>Việc làm mới nhất</Title>}
            extra={<a href="#" class="text-white">Xem tất cả <i class="fas fa-angle-double-right" style={{color: "inherit"}}></i></a>}
            style={{ width: "100%" }}
            headStyle={{ backgroundColor: "#1890ff", color: "#fff" }}
        >
            <Row gutter={[0, 16]}>
                {
                    companyLogo.map(data => (
                        <Col span={24}>
                            <HorizontalJobCard logoUrl={data}/>
                        </Col>
                    ))
                }
            </Row>
        </Card>
    )
}

export default InterestJobList