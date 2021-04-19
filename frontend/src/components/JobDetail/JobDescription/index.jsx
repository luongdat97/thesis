import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, Collapse, Card, Typography, Space } from 'antd';
import styled from 'styled-components'
const { Option } = Select;
const { Panel } = Collapse;
const { Meta } = Card;
const { Title, Text } = Typography;

export default function JobDescription(props) {
    let job = props.job
    return (
        <>
            <Card>
                <Space direction="vertical" size="large" className="px-5">
                    <div>
                        <Title level={3}>Mô tả công việc</Title>
                        <Space direction="vertical">
                            {job.jobDescription?.split("\n").map((item) => (
                                <Text key={item.id}>{item}</Text>
                            ))}
                        </Space>
                    </div>
                    <div>
                        <Title level={3}>YÊU CẦU ỨNG VIÊN</Title>
                        <Space direction="vertical">
                            {job.jobRequire?.split("\n").map((item) => (
                                <Text key={item.id}>{item}</Text>
                            ))}
                        </Space>
                    </div>
                    <div>
                        <Title level={3}>Quyền lợi được hưởng</Title>
                        <Space direction="vertical">
                            {job.jobBenefit?.split("\n").map((item) => (
                                <Text key={item.id}>{item}</Text>
                            ))}
                        </Space>
                    </div>
                    <div>
                        <Title level={3}>Cách thức ứng tuyển</Title>
                        Ứng viên nộp hồ sơ trực tuyến bằng cách bấm Ứng tuyển ngay dưới đây.<br />
                        <div className="pt-3">
                            <div className="d-flex justify-content-center">
                                <Button size="large" type="primary" style={{ background: "#73d13d", borderColor: "#73d13d" }}>Ứng tuyển ngay</Button>
                            </div>
                            <div className="d-flex justify-content-center">Hạn nộp hồ sơ: 08/04/2021</div>
                        </div>
                    </div>
                </Space>
            </Card>




        </>

    )
}
