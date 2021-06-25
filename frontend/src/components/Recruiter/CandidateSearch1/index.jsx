import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, Row, Col, Button, Typography, Card, Pagination, Space } from 'antd';
import CandidateCard from "./CandidateCard"
import cvApi from '../../../api/cvApi'
import desireApi from '../../../api/desireApi'
import jobApi from '../../../api/jobApi'
import SearchInput from "./SearchInput"
import { useCookies } from 'react-cookie'
import { province, career, tag } from '../../../Constances/const'
import util from "../../../helper/util"

const { RangePicker } = DatePicker
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

const searchSelectProps = {
    showSearch: true,
    optionFilterProp: "children",
    filterOption: (input, option) =>
        util.normalString(option.children).indexOf(util.normalString(input)) >= 0,
    filterSort: (optionA, optionB) =>
        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
}
const CandidateSearch = (props) => {
    const [desireList, setDesireList] = useState([])
    const [jobList, setJobList] = useState([])
    const [total, setTotal] = useState(1)
    const [pageIndex, setPageIndex] = useState(0)
    const [cookies] = useCookies(['user'])
    let recruiter_id = cookies.user.id
    useEffect(() => {
        getDesireList()
        jobApi.getJobList({ recruiter_id }).then((res) => {
            console.log(res.data)
            setJobList(res.data)
        })
    }, [pageIndex])

    const getDesireList = (params) => {
        console.log({ ...params, enable: true })
        desireApi.getDesireList({ ...params, enable: true, pageIndex }).then((res) => {
            console.log(res.data)
            setDesireList(res.data.data)
            setTotal(res.data.total)
        })

    }

    return (
        <>
            <Title level={3} className="mb-0 mt-3">Tìm kiếm ứng viên</Title>

            <Row className="mt-3" gutter={16}>
                <Col xs={16}>
                    {desireList.map(cv =>
                        <CandidateCard data={cv} key={cv.id} recruiter_id={recruiter_id} jobList={jobList}></CandidateCard>
                    )}
                    <div className="d-flex justify-content-center mt-3">
                        <Pagination defaultCurrent={1} pageSize={5} total={total} onChange={(index) => setPageIndex(index - 1)} pageSizeOptions={[]} />
                    </div>
                </Col>
                <Col xs={8}>
                    <ExtraOption getDesireList={getDesireList}></ExtraOption>
                </Col>
            </Row>

        </>
    )
}

const ExtraOption = (props) => {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const [form] = Form.useForm()
    return (
        <>
            <Card className="bg-white">
                <Title level={4}>Nhập thông tin tìm kiếm</Title>
                <Form
                    {...layout}
                    onFinish={(value) => { console.log(value); props.getDesireList(value) }}
                    form={form}
                >
                    {/* <Form.Item
                        label="Từ khóa"
                        name="textSearch"
                    >
                        <Input prefix={<i className="fas fa-search"></i>} placeholder="Nhập từ khóa bạn muốn tìm..." />
                    </Form.Item> */}
                    <Form.Item
                        label="Ngành nghề"
                        name='field'
                    >
                        <Select {...searchSelectProps}>
                            <Option value={null}>Tất cả ngành nghề</Option>
                            {career.map(item => (
                                <Option value={item} key={item}>{item}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Địa điểm"
                        name='address'
                    >
                        <Select {...searchSelectProps}>
                            <Option value={null}>Tất cả địa điểm</Option>
                            {province.map(item => (
                                <Option value={item} key={item}>{item}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Kinh nghiệm"
                        name='experience'
                    >
                        <Select {...searchSelectProps}>
                            <Option value={null}>Tất cả kinh nghiệm</Option>
                            <Option value="1">Chưa có kinh nghiệm</Option>
                            <Option value="2">Dưới 1 năm</Option>
                            <Option value="3">1 năm</Option>
                            <Option value="4">2 năm</Option>
                            <Option value="5">3 năm</Option>
                            <Option value="6">4 năm</Option>
                            <Option value="7">5 năm</Option>
                            <Option value="8">Trên 5 năm</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Trình độ"
                        name='level'
                    >
                        <Select {...searchSelectProps}>
                            <Option value={null}>Tất cả trình độ</Option>
                            <Option value="1">Sinh viên</Option>
                            <Option value="2">mới ra trường</Option>
                            <Option value="3">có kinh nghệm</Option>
                            <Option value="4">trưởng nhóm</Option>
                            <Option value="5">Quản lý/ giám sát</Option>
                            <Option value="6">chuyên gia</Option>
                            <Option value="7">giám sát</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Tiếng Anh"
                        name='english'
                    >
                        <Select {...searchSelectProps}>
                            <Option value={null}>Tất cả mức độ</Option>
                            <Option value="1">Không biết</Option>
                            <Option value="2">Đọc hiểu cơ bản</Option>
                            <Option value="3">Đọc/ viết tốt tài liệu chuyên môn</Option>
                            <Option value="4">Giao tiếp tốt</Option>
                            <Option value="5">Thành thạo mọi kỹ năng</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Thời gian"
                        name='workType'
                    >
                        <Select {...searchSelectProps}>
                            <Option value={null}>Tất cả</Option>
                            <Option value="1">Toàn thời gian</Option>
                            <Option value="2">Bán thời gian</Option>
                            <Option value="3">Thực tập</Option>
                            <Option value="4">Remote (làm việc từ xa)</Option>
                        </Select>
                    </Form.Item>
                    {/* <Form.Item
                        label="Giới tính"
                    >
                        <Select>
                            <Option value="1">Tất cả</Option>
                            <Option value="2">Nam</Option>
                            <Option value="3">Nữ</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Năm sinh"
                    >
                        <RangePicker picker="year" />
                    </Form.Item> */}
                    <div className="d-flex justify-content-center">
                        <Button type="primary" htmlType="submit" className="mr-3">Tìm kiếm</Button>
                        <Button onClick={() => { form.resetFields() }}>Đặt lại dữ liệu</Button>
                    </div>



                </Form>
            </Card>


        </>
    )
}


export default CandidateSearch;