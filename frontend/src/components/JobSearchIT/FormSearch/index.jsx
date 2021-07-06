import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, Collapse, Card, Typography, List, Space } from 'antd';
import { provice, career, province } from "../../../Constances/const"
import util from "../../../helper/util"
import styled from 'styled-components'
import jobApi from "../../../api/jobApi"
import {tag} from "../../../Constances/const"
const { Option } = Select;
const { Panel } = Collapse;
const { Meta } = Card;
const { Title, Text } = Typography;

const SearchJobForm = (props) => {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({}); // To disable submit button at the beginning.
    const { setJobList, setParamFilter, handleSearch, workType, setWorkType } = props
    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = (values) => {
        console.log('Finish:', values);
    };

    // const handleSearch = () => {
    //     console.log(form.getFieldsValue())
    //     let params = form.getFieldsValue()
    //     jobApi.searchJob(params).then((res) => {
    //         console.log(res.data)
    //         setJobList(res.data)
    //     })
    // }

    const searchSelectProps = {
        optionLabelProp: "label",
        showSearch: true,
        style: { width: "100%" },
        optionFilterProp: "children",
        filterOption: (input, option) =>
            util.normalString(option.children).indexOf(util.normalString(input)) >= 0,
        filterSort: (optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
    }

    return (
        <>

            <Card className="bg-white">
                <Title level={4}>Nhập thông tin tìm kiếm</Title>
                <Form form={form} name="horizontal_login" onFinish={onFinish} onFieldsChange={(changedFields, allFields) => setParamFilter(form.getFieldsValue())}>
                    <Form.Item
                        name="textSearch"
                    >
                        <Input prefix={<i className="fas fa-search"></i>} placeholder="Tên công việc bạn muốn ứng tuyển..." />
                    </Form.Item>

                    <Form.Item
                        name="jobType"
                    >
                        <Select
                            placeholder="Loại việc làm"
                            value={workType}
                            onChange={setWorkType}
                        >
                            <Option value="">Tất cả loại hình</Option>
                            <Option value="Frontend">Frontend</Option>
                            <Option value="Backend">Backend</Option>
                            <Option value="Fullstack">Fullstack</Option>
                            <Option value="Tester">Tester</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="skillRequire"
                    >
                        <Select
                            placeholder="Nhập từ khóa tìm kiếm"
                             mode="tags"
                            style={{ width: '100%' }}
                            tokenSeparators={[',']}
                        >
                            {tag.map(item => (
                                <Option key={item} value={item}>{item}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="workplace"
                    >
                        <Select
                            placeholder="Tất cả địa điểm"
                            {...searchSelectProps}
                            defaultValue=""
                        >

                            <Option value=""
                                label={
                                    <React.Fragment>
                                        <i className="fas fa-map-marked"></i>
                                        &nbsp;
                                        {"Tất cả địa điểm"}
                                    </React.Fragment>
                                }
                            >Tất cả địa điểm</Option>
                            {province.map(item => (
                                <Option value={item} key={item}
                                    label={
                                        <React.Fragment>
                                            <i className="fas fa-map-marked"></i>
                                        &nbsp;
                                        {item}
                                        </React.Fragment>
                                    }
                                >{item}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="salary"
                    >
                        <Select
                            {...searchSelectProps}
                            defaultValue=""
                        >
                            <Option value=""
                                label={
                                    <React.Fragment>
                                        <i className="fas fa-money-bill-wave"></i>
                                                &nbsp;
                                                {"Tất cả mức lương"}
                                    </React.Fragment>
                                }
                            >Tất cả mức lương</Option>
                            <Option value="1"
                                label={
                                    <React.Fragment>
                                        <i className="fas fa-money-bill-wave"></i>
                                                &nbsp;
                                                {"dưới 3 triệu"}
                                    </React.Fragment>
                                }
                            > dưới 3 triệu</Option>
                            <Option value="2"
                                label={
                                    <React.Fragment>
                                        <i className="fas fa-money-bill-wave"></i>
                                            &nbsp;
                                            {"3 - 5 triệu"}
                                    </React.Fragment>
                                }
                            >3 - 5 triệu</Option>
                            <Option value="3"
                                label={
                                    <React.Fragment>
                                        <i className="fas fa-money-bill-wave"></i>
                                            &nbsp;
                                            {"5 - 8 triệu"}
                                    </React.Fragment>
                                }
                            >5 - 8 triệu</Option>
                            <Option value="4"
                                label={
                                    <React.Fragment>
                                        <i className="fas fa-money-bill-wave"></i>
                                            &nbsp;
                                            {"8 - 15 triệu"}
                                    </React.Fragment>
                                }
                            >8 - 15 triệu</Option>
                            <Option value="5"
                                label={
                                    <React.Fragment>
                                        <i className="fas fa-money-bill-wave"></i>
                                            &nbsp;
                                            {"trên 15 triệu"}
                                    </React.Fragment>
                                }
                            >trên 15 triệu</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="experienceRequire"
                    >
                        <Select
                            {...searchSelectProps}
                            defaultValue=""
                        >
                            <Option value=""
                                label={
                                    <React.Fragment>
                                        <i className="fas fa-business-time"></i>
                                                &nbsp;
                                                {"Tất cả kinh nghiệm"}
                                    </React.Fragment>
                                }
                            >Tất cả kinh nghiệm</Option>
                            <Option value={1}
                                label={
                                    <React.Fragment>
                                        <i className="fas fa-business-time"></i>
                                                &nbsp;
                                                {"Chưa có kinh nghiệm"}
                                    </React.Fragment>
                                }
                            >Chưa có kinh nghiệm</Option>
                            <Option value={2}
                                label={
                                    <React.Fragment>
                                        <i className="fas fa-business-time"></i>
                                                &nbsp;
                                                {"Dưới 1 năm"}
                                    </React.Fragment>
                                }
                            >Dưới 1 năm</Option>
                            <Option value={3}
                                label={
                                    <React.Fragment>
                                        <i className="fas fa-business-time"></i>
                                                &nbsp;
                                                {"1 năm"}
                                    </React.Fragment>
                                }
                            >1 năm</Option>
                            <Option value={4}
                                label={
                                    <React.Fragment>
                                        <i className="fas fa-business-time"></i>
                                                &nbsp;
                                                {"2 năm"}
                                    </React.Fragment>
                                }
                            >2 năm</Option>
                            <Option value={5}
                                label={
                                    <React.Fragment>
                                        <i className="fas fa-business-time"></i>
                                                &nbsp;
                                                {"3 năm"}
                                    </React.Fragment>
                                }
                            >3 năm</Option>
                            <Option value={6}
                                label={
                                    <React.Fragment>
                                        <i className="fas fa-business-time"></i>
                                                &nbsp;
                                                {"4 năm"}
                                    </React.Fragment>
                                }
                            >4 năm</Option>
                            <Option value={7}
                                label={
                                    <React.Fragment>
                                        <i className="fas fa-business-time"></i>
                                                &nbsp;
                                                {"5 năm"}
                                    </React.Fragment>
                                }
                            >5 năm</Option>
                            <Option value={8}
                                label={
                                    <React.Fragment>
                                        <i className="fas fa-business-time"></i>
                                                &nbsp;
                                                {"trên 5 năm"}
                                    </React.Fragment>
                                }
                            >trên 5 năm</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="workType"
                    >
                        <Select
                            {...searchSelectProps}
                            defaultValue=""
                        >
                            <Option value=""
                                label={
                                    <React.Fragment>
                                        <i className="far fa-clock"></i>
                                                &nbsp;
                                                {"Tất cả loại hình"}
                                    </React.Fragment>
                                }
                            >Tất cả loại hình</Option>
                            <Option value={1}
                                label={
                                    <React.Fragment>
                                        <i className="far fa-clock"></i>
                                                &nbsp;
                                                {"Toàn thời gian"}
                                    </React.Fragment>
                                }
                            >Toàn thời gian</Option>
                            <Option value={2}
                                label={
                                    <React.Fragment>
                                        <i className="far fa-clock"></i>
                                                &nbsp;
                                                {"Bán thời gian"}
                                    </React.Fragment>
                                }
                            >Bán thời gian</Option>
                            <Option value={3}
                                label={
                                    <React.Fragment>
                                        <i className="far fa-clock"></i>
                                                &nbsp;
                                                {"Thực tập"}
                                    </React.Fragment>
                                }
                            >Thực tập</Option>
                            <Option value={4}
                                label={
                                    <React.Fragment>
                                        <i className="far fa-clock"></i>
                                                &nbsp;
                                                {"Remote (làm việc từ xa)"}
                                    </React.Fragment>
                                }
                            >Remote (làm việc từ xa)</Option>
                        </Select>
                    </Form.Item>
                    <Space>
                        <Button onClick={() => {form.resetFields(); setWorkType("")}}>Đặt lại</Button>
                        <Button type="primary" onClick={handleSearch}>Tìm kiếm</Button>
                    </Space>
                    
                </Form>
            </Card>
        </>
    );
};

export default SearchJobForm