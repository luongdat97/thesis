import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, Collapse, Card, Typography, Space, message, Tabs } from 'antd';
import styled from 'styled-components'
import moment from 'moment'
import CompanyInfo from '../../CompanyInfo'
const { Option } = Select;
const { Panel } = Collapse;
const { Meta } = Card;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

export default function JobDescription(props) {
    let job = props.job
    return (
        <>
            <Tabs defaultActiveKey="1" className="bg-white p-3">
                <TabPane tab="Mô tả việc làm" key="1">

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
                            <Title level={3}>Yêu cầu ứng viên</Title>
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
                    </Space>

                </TabPane>
                <TabPane tab="Thông tin công ty" key="2">
                    <CompanyInfo company={job.company} />
                </TabPane>
            </Tabs>
        </>
    )
}
