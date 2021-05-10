import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, Collapse, Card, Typography, List } from 'antd';
import styled from 'styled-components'
const { Option } = Select;
const { Panel } = Collapse;
const { Meta } = Card;
const { Title, Text } = Typography;

const SearchJobForm = () => {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = (values) => {
        console.log('Finish:', values);
    };

    const searchSelectProps = {
        size: "large",
        optionLabelProp: "label",
        showSearch: true,
        style: { width: "100%" },
        optionFilterProp: "children",
        filterOption: (input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
        filterSort: (optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())

    }

    return (
        <>
            <Form form={form} name="horizontal_login" onFinish={onFinish}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            noStyle
                            name="username"
                        >
                            <Input size="large" prefix={<i className="far fa-user"></i>} placeholder="Tên công việc, vị trí bạn muốn ứng tuyển..." />
                        </Form.Item>

                    </Col>
                    <Col span={6}>
                        <Form.Item
                            noStyle
                            name="passworsd"
                        >
                            <Select
                                placeholder="Tất cả địa điểm"
                                {...searchSelectProps}
                                defaultValue="1"
                            >
                                <Option value="1"
                                    label={
                                        <React.Fragment>
                                            <i className="fas fa-map-marked"></i>
                                        &nbsp;
                                        {"Tất cả địa điểm"}
                                        </React.Fragment>
                                    }
                                >Tất cả địa điểm</Option>
                                <Option value="2">Hồ Chí Minh</Option>
                                <Option value="3">Hà Nội</Option>
                                <Option value="4">Identified</Option>
                                <Option value="5">Resolved</Option>
                                <Option value="6">Cancelled</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            noStyle
                            name="password"
                        >
                            <Select
                                {...searchSelectProps}
                                placeholder="Tất cả ngành nghề"
                                defaultValue="1"
                            >
                                <Option value="1"
                                    label={
                                        <React.Fragment>
                                            <i className="fas fa-tools"></i>
                                        &nbsp;
                                        {"Tất cả ngành nghề"}
                                        </React.Fragment>
                                    }
                                >Tất cả ngành nghề</Option>
                                <Option value="2">An toàn lao động</Option>
                                <Option value="3">Bán hàng kỹ thuật</Option>
                                <Option value="4">Identified</Option>
                                <Option value="5">Resolved</Option>
                                <Option value="6">Cancelled</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item noStyle>
                            <Button
                                size="large"
                                type="primary"
                                htmlType="submit"
                                icon={<i className="fas fa-search text-white" ></i>}
                                shape="round"
                            >
                                &nbsp;Tìm kiếm
                    </Button>
                        </Form.Item>

                    </Col>
                </Row>

                <Row>
                    <Collapse ghost className="w-100" expandIconPosition="right">
                        <Panel header={<div className="d-flex justify-content-end">Tìm kiếm nâng cao</div>} key="1">
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Form.Item
                                        name="salary"
                                    >
                                        <Select
                                            {...searchSelectProps}
                                            defaultValue="1"
                                        >
                                            <Option value="1"
                                                label={
                                                    <React.Fragment>
                                                        <i className="fas fa-money-bill-wave"></i>
                                                &nbsp;
                                                {"Tất cả mức lương"}
                                                    </React.Fragment>
                                                }
                                            >Tất cả mức lương</Option>
                                            <Option value="2">An toàn lao động</Option>
                                            <Option value="3">Bán hàng kỹ thuật</Option>
                                            <Option value="4">Identified</Option>
                                            <Option value="5">Resolved</Option>
                                            <Option value="6">Cancelled</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        name="experience"
                                    >
                                        <Select
                                            {...searchSelectProps}
                                            defaultValue="1"
                                        >
                                            <Option value="1"
                                                label={
                                                    <React.Fragment>
                                                        <i className="fas fa-business-time"></i>
                                                &nbsp;
                                                {"Tất cả kinh nghiệm"}
                                                    </React.Fragment>
                                                }
                                            >Tất cả kinh nghiệm</Option>
                                            <Option value="2">An toàn lao động</Option>
                                            <Option value="3">Bán hàng kỹ thuật</Option>
                                            <Option value="4">Identified</Option>
                                            <Option value="5">Resolved</Option>
                                            <Option value="6">Cancelled</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        name="typeWork"
                                    >
                                        <Select
                                            {...searchSelectProps}
                                            defaultValue="1"
                                        >
                                            <Option value="1"
                                                label={
                                                    <React.Fragment>
                                                        <i className="far fa-clock"></i>
                                                &nbsp;
                                                {"Tất cả loại hình"}
                                                    </React.Fragment>
                                                }
                                            >Tất cả loại hình</Option>
                                            <Option value="2">An toàn lao động</Option>
                                            <Option value="3">Bán hàng kỹ thuật</Option>
                                            <Option value="4">Identified</Option>
                                            <Option value="5">Resolved</Option>
                                            <Option value="6">Cancelled</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        name="company"
                                    >
                                        <Select
                                            {...searchSelectProps}
                                            defaultValue="1"
                                        >
                                            <Option value="1"
                                                label={
                                                    <React.Fragment>
                                                        <i className="far fa-building"></i>
                                                &nbsp;
                                                {"Tất cả lĩnh vực"}
                                                    </React.Fragment>
                                                }
                                            >Tất cả lĩnh vực công ty</Option>
                                            <Option value="2">An toàn lao động</Option>
                                            <Option value="3">Bán hàng kỹ thuật</Option>
                                            <Option value="4">Identified</Option>
                                            <Option value="5">Resolved</Option>
                                            <Option value="6">Cancelled</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Panel>
                    </Collapse>
                </Row>
            </Form>
        </>
    );
};

export default SearchJobForm