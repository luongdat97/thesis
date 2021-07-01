import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Row, Col, Collapse, Card, Typography, Button, Space, Slider, Radio, Divider, Checkbox, message } from 'antd';
import cvApi from '../../../api/cvApi'
import StyleCv from "./index.style"
import UploadAvatar from '../UploadAvatar'
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"
import { useCookies } from "react-cookie"
import { useParams } from "react-router-dom"
import printJS from 'print-js'
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

const Home = (props) => {
    const [cookies] = useCookies(["user"])
    const [avatar, setAvatar] = useState({})
    const [cvData, setCvData] = useState({})
    const [form] = Form.useForm()
    const id = useParams().id || props.cvId
    useEffect(() => {
        cvApi.getCvById(id).then(res => {
            setCvData(res.data)
            setAvatar(res.data.avatar)
            if (res.data.display) setDisplay(res.data.display )
            console.log(res.data)
        })
    }, [])

    useEffect(() => { form.resetFields() }, [cvData]);

    const onSubmit = (values) => {
        console.log({ ...cvData, ...values, avatar })
        cvApi.editCv({ ...cvData, ...values, avatar }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    const [display, setDisplay] = useState({
        objective: true,
        education: true,
        experience: true,
        activity: true,
        skill: true,
        favorite: true,
        fontSize: "1em",
        textMargin: "2px"
    })

    console.log(avatar)
    return (
        <>
            <div>
                <StyleCv>
                    <div className="d-flex">
                        <Title level={5}>CV cá nhân </Title>
                        <Button type="primary" size="small" onClick={() => generate(props.scrollP)} className="mb-3 ml-3" >&nbsp;Tải xuống</Button>
                    </div>
                    <Row gutter={30}>
                        <Col>
                            <div id="html2canvas" style={{ width: 794, height: 1123, backgroundColor: "#fff" }}>
                                <Form
                                    {...layout}
                                    onFinish={(values) => onSubmit(values)}
                                    form={form}
                                    initialValues={cvData}
                                    className="h-100"
                                >
                                    <Row className="h-100">
                                        <Col span={7} className="px-0 input-none-bg text-white" style={{ background: "#37474f" }}>
                                            <div style={{ background: "#263238" }}>
                                                <div className="d-flex justify-content-center pt-4">
                                                    <img src={avatar?.url} alt="avatar" style={{ width: 180, height: 180 }}></img>
                                                </div>

                                                <Form.Item
                                                    name="name"
                                                >
                                                    <Input readOnly style={{ fontSize: 22, fontWeight: "bold" }} placeholder="Họ và tên" placeholder="Nguyễn Văn A" className="text-center" />
                                                </Form.Item>

                                                <Form.Item
                                                    name="jobPosition"
                                                >
                                                    <Input readOnly style={{ fontSize: 16, fontWeight: "bold" }} placeholder="Vị trí ứng tuyển" className="text-center" />
                                                </Form.Item>
                                            </div>
                                            <div className="p-2 mt-3">

                                                <Form.Item
                                                    colon={false}
                                                    labelCol={{ span: 3 }}
                                                    wrapperCol={{ span: 21 }}
                                                    label={<i className="far fa-calendar-alt"></i>}
                                                    name="birthday"
                                                >
                                                    <Input readOnly bordered={false} placeholder="30/01/1997" />
                                                </Form.Item>
                                                <Form.Item
                                                    colon={false}
                                                    labelCol={{ span: 3 }}
                                                    wrapperCol={{ span: 21 }}
                                                    label={<i className="fas fa-user"></i>}
                                                    name="gender"
                                                >
                                                    <Input readOnly placeholder="Nam" />
                                                </Form.Item>
                                                <Form.Item
                                                    colon={false}
                                                    labelCol={{ span: 3 }}
                                                    wrapperCol={{ span: 21 }}
                                                    label={<i className="fas fa-phone"></i>}
                                                    name="phoneNumber"
                                                >
                                                    <Input readOnly placeholder="0981988997" />
                                                </Form.Item>

                                                <Form.Item
                                                    colon={false}
                                                    labelCol={{ span: 3 }}
                                                    wrapperCol={{ span: 21 }}
                                                    label={<i className="fas fa-envelope"></i>}
                                                    name="email"
                                                >
                                                    <Input readOnly placeholder="luongdat97@gmail.com" />
                                                </Form.Item>
                                                <Form.Item
                                                    colon={false}
                                                    labelCol={{ span: 3 }}
                                                    wrapperCol={{ span: 21 }}
                                                    label={<i className="fas fa-map-marker-alt"></i>}
                                                    name="address"
                                                >
                                                    <Input readOnly placeholder="Kim Xa, Vinh Phúc" />
                                                </Form.Item>


                                                {display.objective && <>
                                                    <div className="section mt-3">
                                                        <div className="d-flex align-items-center section-title">
                                                            <span className="section-title">Mục tiêu nghề nghiệp</span>
                                                        </div>
                                                        <div className="ml-2">
                                                            <Form.Item
                                                                name="objective"
                                                            >
                                                                <TextArea
                                                                    placeholder={`-Môi trường chuyên nghiệp\n-Cống hiến hết mình`}
                                                                    autoSize={{ minRows: 1, maxRows: 20 }}
                                                                    readOnly
                                                                />
                                                            </Form.Item>
                                                        </div>
                                                    </div>

                                                    <Divider className="my-0 mt-3" />
                                                </>}

                                                {display.favorite && <>
                                                    <div className="section">
                                                        <div className="d-flex align-items-center section-title">
                                                            <span className="section-title">Sở thích</span>
                                                        </div>
                                                        <div className="ml-2">
                                                            <Form.Item
                                                                name="favorite"
                                                            >
                                                                <TextArea
                                                                    placeholder={`-Đá bóng \n-Đọc sách`}
                                                                    autoSize={{ minRows: 1, maxRows: 20 }}
                                                                    readOnly
                                                                />
                                                            </Form.Item>
                                                        </div>
                                                    </div>
                                                </>}
                                            </div>

                                        </Col>
                                        <Col span={17} className="pt-4">

                                            {display.education && <>
                                                <div className="section">
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
                                                                            <Row>
                                                                                <Col span={18}>
                                                                                    <Form.Item
                                                                                        name={[name, 'schoolName']}
                                                                                        fieldKey={[fieldKey, 'schoolName']}
                                                                                    >
                                                                                        <Input readOnly placeholder="Đại học TOPCV" style={{ fontWeight: 'bold' }} />
                                                                                    </Form.Item>
                                                                                </Col>
                                                                                <Col span={6}>
                                                                                    <Form.Item
                                                                                        {...restField}
                                                                                        name={[name, 'duration']}
                                                                                        fieldKey={[fieldKey, 'duration']}
                                                                                    >
                                                                                        <Input readOnly placeholder="10/2021 - hiện tại" />
                                                                                    </Form.Item>
                                                                                </Col>
                                                                            </Row>

                                                                            <Form.Item
                                                                                {...restField}
                                                                                name={[name, 'major']}
                                                                                fieldKey={[fieldKey, 'major']}
                                                                            >
                                                                                <Input readOnly placeholder="Chuyên ngành: Quản trị Doanh nghiệp" />
                                                                            </Form.Item>
                                                                            <Form.Item
                                                                                {...restField}
                                                                                name={[name, 'description']}
                                                                                fieldKey={[fieldKey, 'description']}
                                                                            >
                                                                                <Input readOnly placeholder="CPA 3.2/4" />
                                                                            </Form.Item>


                                                                        </div>
                                                                    ))}
                                                                </>
                                                            )}
                                                        </Form.List>
                                                    </div>
                                                </div>

                                                <Divider className="my-0 mt-3" />
                                            </>}

                                            {display.experience && <>
                                                <div className="section">
                                                    <div className="d-flex align-items-center section-title">
                                                        <i className="fas fa-briefcase ml-3 mr-2"></i>
                                                        <span className="section-title">Kinh nghiệm làm việc</span>
                                                    </div>
                                                    <div className="ml-4">
                                                        <Form.List name="experience" initialValue={[{}]}>
                                                            {(fields, { add, remove, move }) => (
                                                                <>
                                                                    {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                                                        <div className="section-item">
                                                                            <Row>
                                                                                <Col span={18}>
                                                                                    <Form.Item
                                                                                        name={[name, 'workplace']}
                                                                                        fieldKey={[fieldKey, 'workplace']}
                                                                                    >
                                                                                        <Input readOnly placeholder="Công ty Vietel" style={{ fontWeight: 'bold' }} />
                                                                                    </Form.Item>
                                                                                </Col>
                                                                                <Col span={6}>
                                                                                    <Form.Item
                                                                                        {...restField}
                                                                                        name={[name, 'duration']}
                                                                                        fieldKey={[fieldKey, 'duration']}
                                                                                    >
                                                                                        <Input readOnly placeholder="10/2021 - hiện tại" />
                                                                                    </Form.Item>
                                                                                </Col>
                                                                            </Row>
                                                                            <Form.Item
                                                                                {...restField}
                                                                                name={[name, 'level']}
                                                                                fieldKey={[fieldKey, 'level']}
                                                                            >
                                                                                <Input readOnly placeholder="Vị trí công việc: Nhân viên" />
                                                                            </Form.Item>
                                                                            <Form.Item
                                                                                {...restField}
                                                                                name={[name, 'description']}
                                                                                fieldKey={[fieldKey, 'description']}
                                                                            >
                                                                                <TextArea
                                                                                    placeholder={`- Hỗ trợ viết bài quảng cáo sản phẩm qua kênh facebook, các forum,...\n- Giới thiệu, tư vấn sản phẩm, giải đáp các vấn đề thắc mắc của khách hàng qua điện thoại và email.`}
                                                                                    autoSize={{ minRows: 1, maxRows: 20 }}
                                                                                    readOnly
                                                                                />
                                                                            </Form.Item>
                                                                        </div>
                                                                    ))}
                                                                </>
                                                            )}
                                                        </Form.List>
                                                    </div>
                                                </div>

                                                <Divider className="my-0 mt-3" />
                                            </>}
                                            {display.activity && <>
                                                <div className="section">
                                                    <div className="d-flex align-items-center section-title">
                                                        <i className="fas fa-user-edit ml-3 mr-2"></i>
                                                        <span className="section-title">Hoạt động</span>
                                                    </div>
                                                    <div className="ml-4">
                                                        <Form.List name="activity" initialValue={[{}]}>
                                                            {(fields, { add, remove, move }) => (
                                                                <>
                                                                    {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                                                        <div className="section-item">
                                                                            <Row>
                                                                                <Col span={18}>
                                                                                    <Form.Item

                                                                                        name={[name, 'name']}
                                                                                        fieldKey={[fieldKey, 'name']}
                                                                                    >
                                                                                        <Input readOnly placeholder="Nhóm tình nguyện hiến máu nhân đạo" style={{ fontWeight: 'bold' }} />
                                                                                    </Form.Item>

                                                                                </Col>
                                                                                <Col span={6}>
                                                                                    <Form.Item
                                                                                        {...restField}
                                                                                        name={[name, 'duration']}
                                                                                        fieldKey={[fieldKey, 'duration']}
                                                                                    >
                                                                                        <Input readOnly placeholder="10/2021 - hiện tại" />
                                                                                    </Form.Item>

                                                                                </Col>

                                                                            </Row>
                                                                            <Form.Item
                                                                                {...restField}
                                                                                name={[name, 'description']}
                                                                                fieldKey={[fieldKey, 'description']}
                                                                            >
                                                                                <TextArea
                                                                                    placeholder={`-Tập hợp các món quà và phân phát tới người vô gia cư.\n- Chia sẻ, động viên họ vượt qua giai đoạn khó khăn, giúp họ có những suy nghĩ lạc quan.`}
                                                                                    autoSize={{ minRows: 1, maxRows: 20 }}
                                                                                    readOnly
                                                                                />
                                                                            </Form.Item>
                                                                        </div>
                                                                    ))}
                                                                </>
                                                            )}
                                                        </Form.List>
                                                    </div>
                                                </div>

                                                <Divider className="my-0 mt-3" />
                                            </>}

                                            {display.skill && <>
                                                <div className="section">
                                                    <div className="d-flex align-items-center section-title">
                                                        <i className="far fa-sticky-note ml-3 mr-2"></i>
                                                        <span className="section-title">Kỹ năng</span>
                                                    </div>
                                                    <div className="ml-4">
                                                        <Form.List name="skill" initialValue={[{}]}>
                                                            {(fields, { add, remove, move }) => (
                                                                <>
                                                                    {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                                                        <div className="section-item">
                                                                            <Row>
                                                                                <Col span={6}>
                                                                                    <Form.Item
                                                                                        {...restField}
                                                                                        name={[name, 'name']}
                                                                                        fieldKey={[fieldKey, 'name']}
                                                                                    >
                                                                                        <Input readOnly placeholder="Tin học" readOnly />
                                                                                    </Form.Item>

                                                                                </Col>
                                                                                <Col span={18}>
                                                                                    <Form.Item

                                                                                        name={[name, 'description']}
                                                                                        fieldKey={[fieldKey, 'description']}
                                                                                    >
                                                                                        <Input readOnly readOnly placeholder="Sử dụng thành thạo các công cụ Word, Excel, Power Point" />
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
                                            </>}
                                        </Col>
                                    </Row>
                                </Form>
                            </div>

                        </Col>

                    </Row>
                </StyleCv>
            </div>
        </>

    );
};


export default Home