import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, Collapse, Card, Typography, List, Checkbox, Radio } from 'antd';
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


            <Card className="bg-white">
                <Title level={5}>Tìm mẫu CV phù hợp</Title>
                <Form form={form} name="horizontal_login" onFinish={onFinish}>

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
                                        <i className="fas fa-tools"></i>
                                                &nbsp;&nbsp;
                                                {"Chọn ngành nghề"}
                                    </React.Fragment>
                                }
                            >Chọn ngành nghề</Option>
                            <Option value="2"
                                label={
                                    <React.Fragment>
                                        <i className="fas fa-tools"></i>
                                                &nbsp;&nbsp;
                                                {"Công nghệ thông tin"}
                                    </React.Fragment>
                                }
                            >Công nghệ thông tin</Option>
                            <Option value="3"
                                label={
                                    <React.Fragment>
                                        <i className="fas fa-tools"></i>
                                                &nbsp;&nbsp;
                                                {"Báo chí"}
                                    </React.Fragment>
                                }
                            >Báo chí</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="design"
                    >
                        <Select
                            {...searchSelectProps}
                            defaultValue="1"
                        >
                            <Option value="1"
                                label={
                                    <React.Fragment>
                                        <i className="fas fa-pencil-ruler"></i>
                                                &nbsp;&nbsp;
                                                {"Chọn thiết kế"}
                                    </React.Fragment>
                                }
                            >Chọn thiết kế</Option>
                            <Option value="2"
                                label={
                                    <React.Fragment>
                                        <i className="fas fa-pencil-ruler"></i>
                                                &nbsp;&nbsp;
                                                {"Đơn giản"}
                                    </React.Fragment>
                                }
                            >Đơn giản</Option>
                            <Option value="3"
                                label={
                                    <React.Fragment>
                                        <i className="fas fa-pencil-ruler"></i>
                                                &nbsp;&nbsp;
                                                {"Thanh lịch"}
                                    </React.Fragment>
                                }
                            >Thanh lịch</Option>
                        </Select>
                    </Form.Item>
                </Form>
                <Title level={5}>Sắp xếp</Title>
                <Radio.Group defaultValue="a" buttonStyle="solid">
                    <Radio.Button value="a">Được dùng nhiều</Radio.Button>
                    <Radio.Button value="b">Mới cập nhật</Radio.Button>
                </Radio.Group>
            </Card>
        </>
    );
};

export default SearchJobForm