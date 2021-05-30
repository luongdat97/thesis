import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Row, Col, Collapse, Card, Typography, Button, Space, Slider, Radio, Divider, Checkbox, message } from 'antd';
import cvApi from '../../../api/cvApi'
import StyleCv from "./index.style"
import UploadAvatar from './UploadAvatar'
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"
import { useCookies } from "react-cookie"
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


const Home = () => {
    const [cookies] = useCookies(["user"])
    const [avatar, setAvatar] = useState({})
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
    const [form] = Form.useForm()
    const onSubmit = (values) => {

        console.log(values)
        if (cookies.user) {
            values.applicant_id = cookies.user.id
            values.avatar = avatar
            cvApi.postCv(values).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        } else {
            message.warn("Bạn phải đăng nhập để sử dụng chức năng này!")
        }

    }

    console.log(avatar)
    return (
        <>
            <div style={{ backgroundColor: "#f0f2f5" }}>
                <StyleCv>
                    <Title level={3}>Tạo CV cá nhân</Title>
                    <Row gutter={30}>
                        <Col>
                            <div style={{ width: 794, height: 1123, backgroundColor: "#fff", paddingTop: 25 }}>

                                <Form
                                    {...layout}
                                    onFinish={(values) => onSubmit(values)}
                                    form={form}
                                >
                                    <Row>
                                        <Col span={6} className="px-3"><UploadAvatar avatar={avatar} setAvatar={setAvatar} /></Col>
                                        <Col span={18}>
                                            <Form.Item
                                                name="name"
                                            >
                                                <Input style={{ fontSize: 22, fontWeight: "bold" }} placeholder="Họ và tên" placeholder="Nguyễn Văn A" />
                                            </Form.Item>

                                            <Form.Item
                                                name="jobPosition"
                                            >
                                                <Input style={{ fontSize: 18, fontWeight: "bold" }} placeholder="Vị trí bạn muốn ứng tuyển: Thực tập sinh React" />
                                            </Form.Item>

                                            <Row>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Ngày sinh"
                                                        name="birthday"
                                                    >
                                                        <Input bordered={false} placeholder="30/01/1997" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Giới tính"
                                                        name="gender"
                                                    >
                                                        <Input placeholder="Nam" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Điện thoại"
                                                        name="phoneNumber"
                                                    >
                                                        <Input placeholder="0981988997" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Email"
                                                        name="email"
                                                    >
                                                        <Input placeholder="luongdat97@gmail.com" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Địa chỉ"
                                                        name="address"
                                                    >
                                                        <Input placeholder="Kim Xa, Vinh Phúc" />
                                                    </Form.Item>
                                                </Col>
                                            </Row>


                                        </Col>

                                    </Row>
                                    <Divider className="my-0 mt-3" />
                                    {display.objective && <>
                                        <div className="section">
                                            <SectionTool action={() => setDisplay({ ...display, objective: false })} />
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
                                    </>}

                                    {display.education && <>
                                        <div className="section">
                                            <SectionTool action={() => setDisplay({ ...display, education: false })} />
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
                                    </>}

                                    {display.experience && <>
                                        <div className="section">
                                            <SectionTool action={() => setDisplay({ ...display, experience: false })} />
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
                                    </>}
                                    {display.activity && <>
                                        <div className="section">
                                            <SectionTool action={() => setDisplay({ ...display, activity: false })} />
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
                                    </>}

                                    {display.skill && <>
                                        <div className="section">
                                            <SectionTool action={() => setDisplay({ ...display, skill: false })} />
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
                                    </>}
                                    {display.favorite && <>
                                        <div className="section">
                                            <SectionTool action={() => setDisplay({ ...display, favorite: false })} />
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
                                    </>}

                                </Form>
                            </div>
                            <div style={{ position: "absolute", opacity: "0.0" }}>
                                <div id="html2canvas" style={{ width: 794, height: 1123, backgroundColor: "#fff", paddingTop: 25 }}>

                                    <Form
                                        {...layout}
                                        onFinish={(values) => onSubmit(values)}
                                        form={form}
                                    >
                                        <Row>
                                            <Col span={6} className="px-3"><img src={avatar?.url} alt="avatar" style={{width: 140, height: 160, objectFit:"cover"}}></img></Col>
                                            <Col span={18}>
                                                <Form.Item
                                                    name="name"
                                                >
                                                    <Input style={{ fontSize: 22, fontWeight: "bold" }} placeholder="Họ và tên" placeholder="Nguyễn Văn A" />
                                                </Form.Item>

                                                <Form.Item
                                                    name="jobPosition"
                                                >
                                                    <Input style={{ fontSize: 18, fontWeight: "bold" }} placeholder="Vị trí bạn muốn ứng tuyển: Thực tập sinh React" />
                                                </Form.Item>

                                                <Row>
                                                    <Col span={12}>
                                                        <Form.Item
                                                            label="Ngày sinh"
                                                            name="birthday"
                                                        >
                                                            <Input bordered={false} placeholder="30/01/1997" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            label="Giới tính"
                                                            name="gender"
                                                        >
                                                            <Input placeholder="Nam" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            label="Điện thoại"
                                                            name="phoneNumber"
                                                        >
                                                            <Input placeholder="0981988997" />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Form.Item
                                                            label="Email"
                                                            name="email"
                                                        >
                                                            <Input placeholder="luongdat97@gmail.com" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            label="Địa chỉ"
                                                            name="address"
                                                        >
                                                            <Input placeholder="Kim Xa, Vinh Phúc" />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>


                                            </Col>

                                        </Row>
                                        <Divider className="my-0 mt-3" />
                                        {display.objective && <>
                                            <div className="section">
                                                <SectionTool action={() => setDisplay({ ...display, objective: false })} />
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
                                        </>}

                                        {display.education && <>
                                            <div className="section">
                                                <SectionTool action={() => setDisplay({ ...display, education: false })} />
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
                                        </>}

                                        {display.experience && <>
                                            <div className="section">
                                                <SectionTool action={() => setDisplay({ ...display, experience: false })} />
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
                                        </>}
                                        {display.activity && <>
                                            <div className="section">
                                                <SectionTool action={() => setDisplay({ ...display, activity: false })} />
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
                                        </>}

                                        {display.skill && <>
                                            <div className="section">
                                                <SectionTool action={() => setDisplay({ ...display, skill: false })} />
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
                                        </>}
                                        {display.favorite && <>
                                            <div className="section">
                                                <SectionTool action={() => setDisplay({ ...display, favorite: false })} />
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
                                        </>}

                                    </Form>
                                </div>
                            </div>
                        </Col>
                        <Col sm={7}>
                            <div className="mb-3">
                                {/* <Button color="primary" onClick={() => {
                                    printJS({
                                        printable: 'html2canvas',
                                        type: 'html',
                                        targetStyles: ['*'],
                                        style: `@page {
                                size: A4;
                              }`,
                                        header: null,
                                        footer: null,
                                    });
                                }}>Tạo phiếu in</Button> */}
                                {/* <Space>
                                    <Button type="primary" size="small" icon={<i className="fas fa-exchange-alt light-icon"></i>}>&nbsp;Đổi mẫu</Button>
                                    <Button type="primary" size="small" icon={<i className="far fa-eye light-icon"></i>} onClick={() => generate()}>&nbsp;Xem trước</Button>
                                    <Button type="primary" size="small" icon={<i className="fas fa-download light-icon"></i>}>&nbsp;Tải xuống</Button>
                                    <Button type="primary" size="small" icon={<i className="far fa-save light-icon"></i>}>&nbsp;Lưu</Button>
                                </Space> */}

                                <Space>
                                    <Button type="primary" size="small" >&nbsp;Đổi mẫu</Button>
                                    <Button type="primary" size="small" onClick={() => generate()}>&nbsp;Tải xuống</Button>
                                    <Button type="primary" size="small" onClick={() => form.submit()}>&nbsp;Lưu</Button>
                                </Space>
                            </div>
                            {/* <div style={{ backgroundColor: "#fff" }} className="p-2">
                                <Title level={4}>Tùy chỉnh CV</Title>
                                <div className=" pl-3 mb-3">
                                    <Row>
                                        <Col span={8}>
                                            Chọn màu
                                        </Col>
                                        <Col>
                                            <Radio.Group name="radiogroup" defaultValue={1}>
                                                <Radio value={1} id="red"></Radio>
                                                <Radio value={2} id="white"></Radio>
                                                <Radio value={3} id="pink"></Radio>
                                                <Radio value={4} id="orange"></Radio>
                                            </Radio.Group>
                                        </Col>
                                    </Row>
                                </div>
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
                            </div> */}
                            <div className="bg-white mt-3 p-3">
                                <Title level={4}>Đề mục hiển thị</Title>
                                <Space direction="vertical">
                                    <Checkbox defaultChecked={display.objective} checked={display.objective} onChange={(value) => setDisplay({ ...display, objective: value.target.checked })}>Mục tiêu nghề nghiệp</Checkbox>
                                    <Checkbox defaultChecked={display.education} checked={display.education} onChange={(value) => setDisplay({ ...display, education: value.target.checked })}>Học vấn</Checkbox>
                                    <Checkbox defaultChecked={display.experience} checked={display.experience} onChange={(value) => setDisplay({ ...display, experience: value.target.checked })}>Kinh nghiệm làm việc</Checkbox>
                                    <Checkbox defaultChecked={display.activity} checked={display.activity} onChange={(value) => setDisplay({ ...display, activity: value.target.checked })}>Hoạt động</Checkbox>
                                    <Checkbox defaultChecked={display.skill} checked={display.skill} onChange={(value) => setDisplay({ ...display, skill: value.target.checked })}>Kỹ năng</Checkbox>
                                    <Checkbox defaultChecked={display.favorite} checked={display.favorite} onChange={(value) => setDisplay({ ...display, favorite: value.target.checked })}>Sở thích</Checkbox>
                                </Space>

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
                {/* <Button type="primary"><i className="fas fa-arrow-up light-icon"></i></Button>
                <Button type="primary"><i className="fas fa-arrow-down light-icon"></i></Button> */}
                <Button onClick={() => props.action()} type="primary"><i className="fas fa-minus light-icon"></i></Button>
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


export default Home