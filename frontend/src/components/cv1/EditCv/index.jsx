import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Row, Col, Collapse, Card, Typography, Button, Space, Slider, Radio, Divider } from 'antd';
import cvApi from '../../../api/cvApi'
import StyleCv from "./index.style"
import UploadAvatar from './UploadAvatar'
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"
import printJS from 'print-js'
import {useParams} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import Util from '../../../helper/util'
const generate = Util.generate
const { Option } = Select;
const { Panel } = Collapse;
const { Meta } = Card;
const { Title, Text } = Typography;
const { TextArea } = Input
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const Home = () => {
    const [cookies] = useCookies(["user"])
    const [avatar, setAvatar] = useState({})
    const [cvData, setCvData] = useState({})
    const [form] = Form.useForm()
    const {id} = useParams()
    useEffect(()=> {
        cvApi.getCvById(id).then(res=> {
            setCvData(res.data)
            setAvatar(res.data.avatar)
            console.log(res.data)
        })
    },[])

    useEffect(() => { form.resetFields()}, [cvData]);

    const onSubmit = (values) => {
        console.log({...cvData, ...values, avatar})
        cvApi.editCv({...cvData, ...values, avatar}).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <div style={{ backgroundColor: "#f0f2f5" }}>
                <StyleCv>
                    <Title level={3}>Tạo CV cá nhân</Title>
                    <div className="mb-3" >
                        <div className="mb-3">
                            <Space>
                                <Button type="primary" size="small" >&nbsp;Đổi mẫu</Button>
                                <Button type="primary" size="small" onClick={() => generate()}>&nbsp;Xem trước</Button>
                                <Button type="primary" size="small" >&nbsp;Tải xuống</Button>
                                <Button type="primary" size="small" >&nbsp;Lưu</Button>
                            </Space>
                        </div>
                        <div style={{ backgroundColor: "#fff" }} className="p-2">
                            <Title level={4}>Tùy chỉnh CV</Title>
                            <div className=" pl-3 mb-3">
                                <Row>
                                    <Col span={8}>
                                        Cỡ chữ
                                        </Col>
                                    <Col>
                                        <div className="d-flex align-items-end pb-1">
                                            <i className="fas fa-font"></i>
                                            <Slider defaultValue={0} min={0} max={3} style={{ width: 120, margin: "0px 15px 3px" }} />
                                            <i style={{ fontSize: '1.5em' }} className="fas fa-font"></i>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className=" pl-3 mb-3">
                                <Row>
                                    <Col span={8}>
                                        Khoảng cách dòng
                                        </Col>
                                    <Col>
                                        <div className="d-flex align-items-end pb-1">
                                            <i className="fas fa-text-height"></i>
                                            <Slider defaultValue={0} min={0} max={3} style={{ width: 120, margin: "0px 15px 3px" }} />
                                            <i style={{ fontSize: '1.5em' }} className="fas fa-text-height"></i>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>

                    <Row gutter={30}>

                        <Col>
                            <div id="html2canvas" style={{ width: 750, backgroundColor: "#fff", paddingTop: 25 }}>

                                <Form
                                    {...layout}
                                    onFinish={(values) => onSubmit(values)}
                                    form={form}
                                    initialValues={cvData}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                    <Row>
                                        <Col span={6} className="px-3"><UploadAvatar avatar={avatar} setAvatar={setAvatar} /></Col>
                                        <Col span={18}>
                                            <Form.Item
                                                name="name"
                                            >
                                                <Input style={{ fontSize: 22, fontWeight: "bold" }} placeholder="Họ và tên" defaultValue="Lương Mạnh Đạt" />
                                            </Form.Item>

                                            <Form.Item
                                                name="jobPosition"
                                            >
                                                <Input style={{ fontSize: 18, fontWeight: "bold" }} placeholder="Vị trí bạn muốn ứng tuyển" defaultValue="Thực tập sinh React" />
                                            </Form.Item>

                                            <Row>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Ngày sinh"
                                                        name="birthday"
                                                    >
                                                        <Input bordered={false} defaultValue="30/01/1997" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Giới tính"
                                                        name="gender"
                                                    >
                                                        <Input defaultValue="Nam" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Điện thoại"
                                                        name="phoneNumber"
                                                    >
                                                        <Input defaultValue="0981988997" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Email"
                                                        name="email"
                                                    >
                                                        <Input defaultValue="luongdat97@gmail.com" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Địa chỉ"
                                                        name="address"
                                                    >
                                                        <Input defaultValue="Kim Xa, Vinh Phúc" />
                                                    </Form.Item>
                                                </Col>
                                            </Row>


                                        </Col>

                                    </Row>
                                    <Divider className="my-0 mt-3" />
                                    <div className="section">
                                        <SectionTool />
                                        <div className="d-flex align-items-center section-title">
                                            <i className="fas fa-graduation-cap ml-3 mr-2"></i>
                                            <span className="section-title">Mục tiêu nghề nghiệp</span>
                                        </div>
                                        <div className="ml-4">
                                            <Form.Item
                                                name="objective"
                                            >
                                                <TextArea
                                                    placeholder={`-Môi trường chuyên nghiệp\n-Cống hiến hết mình`}
                                                    autoSize={{ minRows: 2, maxRows: 6 }}
                                                />
                                            </Form.Item>


                                        </div>
                                    </div>

                                    <Divider className="my-0 mt-3" />
                                    <div className="section">
                                        <SectionTool />
                                        <div className="d-flex align-items-center section-title">
                                            <i className="fas fa-graduation-cap ml-3 mr-2"></i>
                                            <span className="section-title">Học vấn</span>
                                        </div>
                                        <div className="ml-4">
                                            <Form.List name="education" initialValue={[{}]}>
                                                {(fields, { add, remove, move }) => (
                                                    <>
                                                        {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                                            <div className="section-item">
                                                                <ItemTool add={add} remove={remove} move={move} index={index} length={fields.length} />
                                                                <Row>
                                                                    <Col span={5}>
                                                                        <Form.Item
                                                                            {...restField}
                                                                            name={[name, 'duration']}
                                                                            fieldKey={[fieldKey, 'duration']}
                                                                        >
                                                                            <Input placeholder="10/2021 - hiện tại" />
                                                                        </Form.Item>

                                                                    </Col>
                                                                    <Col span={19}>
                                                                        <Form.Item

                                                                            name={[name, 'schoolName']}
                                                                            fieldKey={[fieldKey, 'schoolName']}
                                                                        >
                                                                            <Input placeholder="Đại học TOPCV" style={{ fontWeight: 'bold' }} />
                                                                        </Form.Item>
                                                                        <Form.Item
                                                                            {...restField}
                                                                            name={[name, 'major']}
                                                                            fieldKey={[fieldKey, 'major']}
                                                                        >
                                                                            <Input placeholder="Chuyên ngành: Quản trị Doanh nghiệp" />
                                                                        </Form.Item>
                                                                        <Form.Item
                                                                            {...restField}
                                                                            name={[name, 'description']}
                                                                            fieldKey={[fieldKey, 'description']}
                                                                        >
                                                                            <Input placeholder="CPA 3.2/4" />
                                                                        </Form.Item>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        ))}
                                                    </>
                                                )}
                                            </Form.List>
                                        </div>
                                    </div>

                                    <Divider className="my-0 mt-3" />
                                    <div className="section">
                                        <SectionTool />
                                        <div className="d-flex align-items-center section-title">
                                            <i className="fas fa-graduation-cap ml-3 mr-2"></i>
                                            <span className="section-title">Kinh nghiệm làm việc</span>
                                        </div>
                                        <div className="ml-4">
                                            <Form.List name="experience" initialValue={[{}]}>
                                                {(fields, { add, remove, move }) => (
                                                    <>
                                                        {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                                            <div className="section-item">
                                                                <ItemTool add={add} remove={remove} move={move} index={index} length={fields.length} />
                                                                <Row>
                                                                    <Col span={5}>
                                                                        <Form.Item
                                                                            {...restField}
                                                                            name={[name, 'duration']}
                                                                            fieldKey={[fieldKey, 'duration']}
                                                                        >
                                                                            <Input placeholder="10/2021 - hiện tại" />
                                                                        </Form.Item>

                                                                    </Col>
                                                                    <Col span={19}>
                                                                        <Form.Item

                                                                            name={[name, 'workplace']}
                                                                            fieldKey={[fieldKey, 'workplace']}
                                                                        >
                                                                            <Input placeholder="Công ty Vietel" style={{ fontWeight: 'bold' }} />
                                                                        </Form.Item>
                                                                        <Form.Item
                                                                            {...restField}
                                                                            name={[name, 'level']}
                                                                            fieldKey={[fieldKey, 'level']}
                                                                        >
                                                                            <Input placeholder="Vị trí công việc: Nhân viên" />
                                                                        </Form.Item>
                                                                        <Form.Item
                                                                            {...restField}
                                                                            name={[name, 'description']}
                                                                            fieldKey={[fieldKey, 'description']}
                                                                        >
                                                                            <TextArea
                                                                                placeholder={`- Hỗ trợ viết bài quảng cáo sản phẩm qua kênh facebook, các forum,...\n- Giới thiệu, tư vấn sản phẩm, giải đáp các vấn đề thắc mắc của khách hàng qua điện thoại và email.`}
                                                                                autoSize={{ minRows: 1, maxRows: 6 }}
                                                                            />
                                                                        </Form.Item>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        ))}
                                                    </>
                                                )}
                                            </Form.List>
                                        </div>
                                    </div>

                                    <Divider className="my-0 mt-3" />
                                    <div className="section">
                                        <SectionTool />
                                        <div className="d-flex align-items-center section-title">
                                            <i className="fas fa-graduation-cap ml-3 mr-2"></i>
                                            <span className="section-title">Hoạt động</span>
                                        </div>
                                        <div className="ml-4">
                                            <Form.List name="activity" initialValue={[{}]}>
                                                {(fields, { add, remove, move }) => (
                                                    <>
                                                        {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                                            <div className="section-item">
                                                                <ItemTool add={add} remove={remove} move={move} index={index} length={fields.length} />
                                                                <Row>
                                                                    <Col span={5}>
                                                                        <Form.Item
                                                                            {...restField}
                                                                            name={[name, 'duration']}
                                                                            fieldKey={[fieldKey, 'duration']}
                                                                        >
                                                                            <Input placeholder="10/2021 - hiện tại" />
                                                                        </Form.Item>

                                                                    </Col>
                                                                    <Col span={19}>
                                                                        <Form.Item

                                                                            name={[name, 'name']}
                                                                            fieldKey={[fieldKey, 'name']}
                                                                        >
                                                                            <Input placeholder="Nhóm tình nguyện hiến máu nhân đạo" style={{ fontWeight: 'bold' }} />
                                                                        </Form.Item>
                                                                        <Form.Item
                                                                            {...restField}
                                                                            name={[name, 'description']}
                                                                            fieldKey={[fieldKey, 'description']}
                                                                        >
                                                                            <TextArea
                                                                                placeholder={`-Tập hợp các món quà và phân phát tới người vô gia cư.\n- Chia sẻ, động viên họ vượt qua giai đoạn khó khăn, giúp họ có những suy nghĩ lạc quan.`}
                                                                                autoSize={{ minRows: 1, maxRows: 6 }}
                                                                            />
                                                                        </Form.Item>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        ))}
                                                    </>
                                                )}
                                            </Form.List>
                                        </div>
                                    </div>

                                    <Divider className="my-0 mt-3" />
                                    <div className="section">
                                        <SectionTool />
                                        <div className="d-flex align-items-center section-title">
                                            <i className="fas fa-graduation-cap ml-3 mr-2"></i>
                                            <span className="section-title">Kỹ năng</span>
                                        </div>
                                        <div className="ml-4">
                                            <Form.List name="skill" initialValue={[{}]}>
                                                {(fields, { add, remove, move }) => (
                                                    <>
                                                        {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                                            <div className="section-item">
                                                                <ItemTool add={add} remove={remove} move={move} index={index} length={fields.length} />
                                                                <Row>
                                                                    <Col span={5}>
                                                                        <Form.Item
                                                                            {...restField}
                                                                            name={[name, 'name']}
                                                                            fieldKey={[fieldKey, 'name']}
                                                                        >
                                                                            <Input placeholder="Tin học văn phòng" />
                                                                        </Form.Item>

                                                                    </Col>
                                                                    <Col span={19}>
                                                                        <Form.Item

                                                                            name={[name, 'description']}
                                                                            fieldKey={[fieldKey, 'description']}
                                                                        >
                                                                            <Input placeholder="Sử dụng thành thạo các công cụ Word, Excel, Power Point" />
                                                                        </Form.Item>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        ))}
                                                    </>
                                                )}
                                            </Form.List>
                                        </div>
                                    </div>

                                    <Divider className="my-0 mt-3" />
                                    <div className="section">
                                        <SectionTool />
                                        <div className="d-flex align-items-center section-title">
                                            <i className="fas fa-graduation-cap ml-3 mr-2"></i>
                                            <span className="section-title">Sở thích</span>
                                        </div>
                                        <div className="ml-4">
                                            <Form.Item
                                                name="favorite"
                                            >
                                                <TextArea
                                                    placeholder={`-Đá bóng \n-Đọc sách`}
                                                    autoSize={{ minRows: 2, maxRows: 6 }}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </Form>
                            </div>

                        </Col>

                    </Row>
                </StyleCv>
            </div>
        </>

    );
};

function SectionTool(props) {
    return (
        <div className="section-tool">
            <Space size="small">
                <Button type="primary"><i className="fas fa-arrow-up light-icon"></i></Button>
                <Button type="primary"><i className="fas fa-arrow-down light-icon"></i></Button>
                <Button type="primary"><i className="fas fa-minus light-icon"></i></Button>
            </Space>
        </div>
    )
}

function ItemTool(props) {
    const { remove, index, add, length, move } = props
    return (
        <div className="section-item-tool">
            <Space size="small">
                {<Button type="primary" size="small" onClick={() => move(index, index - 1)}><i className="fas fa-arrow-up light-icon"></i></Button>}
                {<Button type="primary" size="small" onClick={() => move(index, index + 1)}><i className="fas fa-arrow-down light-icon"></i></Button>}
                <Button type="primary" size="small" onClick={() => add({}, index + 1)}><i className="fas fa-plus light-icon"></i></Button>

                {length >= 2 && <Button type="primary" size="small" onClick={() => { remove(index) }}><i className="fas fa-minus light-icon"></i></Button>}
            </Space>
        </div>
    )
}

function TempItemTool(props) {
    return (
        <div className="section-item-tool">

            <Space size="small">
                {<Button type="primary" size="small"><i className="fas fa-arrow-up light-icon"></i></Button>}
                {<Button type="primary" size="small"><i className="fas fa-arrow-down light-icon"></i></Button>}
                <Button type="primary" size="small"><i className="fas fa-plus light-icon"></i></Button>
                {<Button type="primary" size="small"><i className="fas fa-minus light-icon"></i></Button>}
            </Space>
        </div>
    )
}

export default Home