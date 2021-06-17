import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, Collapse, Card, Typography, Space, message, Modal, Radio } from 'antd';
import moment from "moment"
import { useCookies } from 'react-cookie'
import styled from 'styled-components'
import appliedJobApi from '../../../api/appliedJobApi'
import savedJobApi from '../../../api/savedJobApi'
import cvApi from '../../../api/cvApi'
import { Link } from 'react-router-dom'
const { Option } = Select;
const { Panel } = Collapse;
const { Meta } = Card;
const { Title, Text } = Typography;

export default function JobSumary(props) {
    const [cookies] = useCookies(['user']);
    const job = props.job
    const user = cookies.user
    return (
        <Card>
            <Row gutter={16}>
                <Col span={4} className="px-1">
                    <img className="w-100" style={{maxHeight: 120, objectFit: "contain"}} alt="company logo" src={job.company?.logo?.url}></img>
                </Col>
                <Col span={12}>
                    <Title level={3} className="text-uppercase text-success">{job.title}</Title>
                    <Title level={5}>{job.company?.name}</Title>
                    <Text><i className="fas fa-map-marker-alt"></i> {job.address}</Text><br />
                    <Text><i className="far fa-clock"></i> Hạn nộp hồ sơ: {moment(job.endDate).format("DD/MM/YYYY")}</Text>
                </Col>
                <Col span={8}>
                    {!props.noAction &&
                        <Space direction="vertical" size="large">
                            <Button onClick={() => message.warn("Bạn cần đăng nhập để sử dụng chức năng này")} size="large" style={{ width: 150 }} type="primary">Ứng tuyển</Button>
                            <Button onClick={() => message.warn("Bạn cần đăng nhập để sử dụng chức năng này")} size="large" style={{ width: 150 }}>Lưu tin</Button>
                        </Space>
                    }
                </Col>
            </Row>
        </Card>
    )
}
