import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, Row, Col, Button, Card, Typography, List, Checkbox, Space } from 'antd';
import { useParams, Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

const CompanyInfo = (props) => {
    const [company, setCompany] = useState(props.company)
    // const [cookies] = useCookies(['user']);
    // const fetchCompany = async () => {
    //     console.log(cookies.user)
    //     let company = await companyApi.getCompanyById(cookies.user.company_id)
    //     setCompany(company.data)
    //     console.log(company)
    // }
    // useEffect(() => {
    //     fetchCompany()
    // }, [])
    return (
        <>
            <div className="p-3">

                <Title level={3}>Thông tin công ty</Title>
                <Row className="mb-2">
                    <Col span={4}>Logo</Col>
                    <Col span={20}><img src={company.logo?.url} style={{ width: 100, height: 100, objectFit: 'contain' }} /></Col>
                </Row>
                <Row className="mb-2">
                    <Col span={4}>Tên công ty</Col>
                    <Col span={20}>{company.name}</Col>
                </Row>
                <Row className="mb-2">
                    <Col span={4}>Mã số thuế</Col>
                    <Col span={20}>{company.taxCode}</Col>
                </Row>
                <Row className="mb-2">
                    <Col span={4}>Lĩnh vực hoạt động</Col>
                    <Col span={20}>{company.field}</Col>
                </Row>
                <Row className="mb-2">
                    <Col span={4}>Địa chỉ</Col>
                    <Col span={20}>{company.address}</Col>
                </Row>
                <Row className="mb-2">
                    <Col span={4}>Số điện thoại</Col>
                    <Col span={20}>{company.phone}</Col>
                </Row>
                <Row className="mb-2">
                    <Col span={4}>Email</Col>
                    <Col span={20}>{company.email}</Col>
                </Row>
                <Row className="mb-2">
                    <Col span={4}>Website</Col>
                    <Col span={20}>{company.website}</Col>
                </Row>
                <Row className="mb-2">
                    <Col span={4}>Quy mô</Col>
                    <Col span={20}>{company.scale}</Col>
                </Row>
                <Row className="mb-2">
                    <Col span={4}>Mô tả</Col>
                    <Col span={20}>{company.description}
                    </Col>
                </Row>
            </div>
        </>
    )
}


export default CompanyInfo;