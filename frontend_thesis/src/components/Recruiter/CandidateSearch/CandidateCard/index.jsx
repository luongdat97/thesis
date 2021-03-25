import React, { useState, useEffect } from 'react';
import { Card, Avatar, Tabs, Select, Row, Col, Table, Tag, Typography, Space, Checkbox } from 'antd';
const CandidateCard = (props) => {
    return (
        <>
            <Card style={{ width: 300 }}>
                <Row>
                    <Col>
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    </Col>
                    <Col>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Col>
                </Row>


            </Card>
        </>
    )
}

export default CandidateCard