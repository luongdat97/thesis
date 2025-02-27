import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Row, Col, Collapse, Card, Typography, Button, Space, Slider, Radio, Divider } from 'antd';
import cvApi from '../../../api/cvApi'
import StyleCv from "./index.style"
import UploadAvatar from './UploadAvatar'
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"
import printJS from 'print-js'
import { useParams } from 'react-router-dom'
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
    const [avatar, setAvatar] = useState({})
    const [cvData, setCvData] = useState({})
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
    const id = useParams().id || props.cvId
    useEffect(() => {
        cvApi.getCvById(id).then(res => {
            console.log(res.data)
            setAvatar(res.data.avatar)
            setCvData(res.data)
            if (res.data.display) setDisplay(res.data.display)
        })
    }, [])

    useEffect(() => { form.resetFields() }, [cvData]);

    const onSubmit = (values) => {
        console.log(values)
        values.applicant_id = "324234v"
        cvApi.postCv(values).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <div >
                <StyleCv>
                    <div className="d-flex">
                        <Title level={5}>CV cá nhân </Title>
                        <Button type="primary" size="small" onClick={() => generate(props.scrollP)} className="mb-3 ml-3" >&nbsp;Tải xuống</Button>
                    </div>
                    <Row gutter={30}>
                        <Col>
                            <div id="html2canvas" style={{ width: 794, minHeight: 1123, backgroundColor: "#fff", paddingTop: 25  }}>

                                <Form
                                    {...layout}
                                    onFinish={(values) => onSubmit(values)}
                                    form={form}
                                    initialValues={cvData}
                                >
                                    <Row>
                                        <Col span={6} className="px-3"><img src={avatar?.url} alt="avatar" style={{ width: 160, height: 180, objectFit: 'cover' }}></img></Col>
                                        <Col span={18}>
                                            <Form.Item
                                                name="name"
                                            >
                                                <Input readOnly style={{ fontSize: 22, fontWeight: "bold" }} placeholder="Họ và tên" defaultValue="Lương Mạnh Đạt" />
                                            </Form.Item>

                                            <Form.Item
                                                name="jobPosition"
                                            >
                                                <Input readOnly style={{ fontSize: 18, fontWeight: "bold" }} placeholder="Vị trí bạn muốn ứng tuyển" defaultValue="Thực tập sinh React" />
                                            </Form.Item>

                                            <Row>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Ngày sinh"
                                                        name="birthday"
                                                    >
                                                        <Input readOnly bordered={false} defaultValue="30/01/1997" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Giới tính"
                                                        name="gender"
                                                    >
                                                        <Input readOnly defaultValue="Nam" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Điện thoại"
                                                        name="phoneNumber"
                                                    >
                                                        <Input readOnly defaultValue="0981988997" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Email"
                                                        name="email"
                                                    >
                                                        <Input readOnly defaultValue="luongdat97@gmail.com" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Địa chỉ"
                                                        name="address"
                                                    >
                                                        <Input readOnly defaultValue="Kim Xa, Vinh Phúc" />
                                                    </Form.Item>
                                                </Col>
                                            </Row>


                                        </Col>

                                    </Row>
                                    <Divider className="my-0 mt-3" />
                                    {display.objective && <>
                                        <div className="section">
                                            <div className="d-flex align-items-center section-title">

                                                <span className="section-title">Mục tiêu nghề nghiệp</span>
                                            </div>
                                            <div className="ml-4">
                                                <Form.Item
                                                    name="objective"
                                                >
                                                    <TextArea readOnly
                                                        placeholder={`-Môi trường chuyên nghiệp\n-Cống hiến hết mình`}
                                                        autoSize={{ minRows: 1, maxRows: 20 }}
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <Divider className="my-0 mt-3" />
                                    </>}

                                    {display.education && <>
                                        <div className="section">
                                            <div className="d-flex align-items-center section-title">

                                                <span className="section-title">Học vấn</span>
                                            </div>
                                            <div className="ml-4">
                                                <Form.List name="education" initialValue={[{}]}>
                                                    {(fields, { add, remove, move }) => (
                                                        <>
                                                            {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                                                <div className="section-item">
                                                                    <Row>
                                                                        <Col span={5}>
                                                                            <Form.Item
                                                                                {...restField}
                                                                                name={[name, 'duration']}
                                                                                fieldKey={[fieldKey, 'duration']}
                                                                            >
                                                                                <Input readOnly placeholder="10/2021 - hiện tại" />
                                                                            </Form.Item>

                                                                        </Col>
                                                                        <Col span={19}>
                                                                            <Form.Item

                                                                                name={[name, 'schoolName']}
                                                                                fieldKey={[fieldKey, 'schoolName']}
                                                                            >
                                                                                <Input readOnly placeholder="Đại học TOPCV" style={{ fontWeight: 'bold' }} />
                                                                            </Form.Item>
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
                                            <div className="d-flex align-items-center section-title">

                                                <span className="section-title">Kinh nghiệm làm việc</span>
                                            </div>
                                            <div className="ml-4">
                                                <Form.List name="experience" initialValue={[{}]}>
                                                    {(fields, { add, remove, move }) => (
                                                        <>
                                                            {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                                                <div className="section-item">
                                                                    <Row>
                                                                        <Col span={5}>
                                                                            <Form.Item
                                                                                {...restField}
                                                                                name={[name, 'duration']}
                                                                                fieldKey={[fieldKey, 'duration']}
                                                                            >
                                                                                <Input readOnly placeholder="10/2021 - hiện tại" />
                                                                            </Form.Item>

                                                                        </Col>
                                                                        <Col span={19}>
                                                                            <Form.Item

                                                                                name={[name, 'workplace']}
                                                                                fieldKey={[fieldKey, 'workplace']}
                                                                            >
                                                                                <Input readOnly placeholder="Công ty Vietel" style={{ fontWeight: 'bold' }} />
                                                                            </Form.Item>
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
                                                                                <TextArea readOnly
                                                                                    placeholder={`- Hỗ trợ viết bài quảng cáo sản phẩm qua kênh facebook, các forum,...\n- Giới thiệu, tư vấn sản phẩm, giải đáp các vấn đề thắc mắc của khách hàng qua điện thoại và email.`}
                                                                                    autoSize={{ minRows: 1, maxRows: 20 }}
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
                                            <div className="d-flex align-items-center section-title">

                                                <span className="section-title">Hoạt động</span>
                                            </div>
                                            <div className="ml-4">
                                                <Form.List name="activity" initialValue={[{}]}>
                                                    {(fields, { add, remove, move }) => (
                                                        <>
                                                            {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                                                <div className="section-item">
                                                                    <Row>
                                                                        <Col span={5}>
                                                                            <Form.Item
                                                                                {...restField}
                                                                                name={[name, 'duration']}
                                                                                fieldKey={[fieldKey, 'duration']}
                                                                            >
                                                                                <Input readOnly placeholder="10/2021 - hiện tại" />
                                                                            </Form.Item>

                                                                        </Col>
                                                                        <Col span={19}>
                                                                            <Form.Item

                                                                                name={[name, 'name']}
                                                                                fieldKey={[fieldKey, 'name']}
                                                                            >
                                                                                <Input readOnly placeholder="Nhóm tình nguyện hiến máu nhân đạo" style={{ fontWeight: 'bold' }} />
                                                                            </Form.Item>
                                                                            <Form.Item
                                                                                {...restField}
                                                                                name={[name, 'description']}
                                                                                fieldKey={[fieldKey, 'description']}
                                                                            >
                                                                                <TextArea readOnly
                                                                                    placeholder={`-Tập hợp các món quà và phân phát tới người vô gia cư.\n- Chia sẻ, động viên họ vượt qua giai đoạn khó khăn, giúp họ có những suy nghĩ lạc quan.`}
                                                                                    autoSize={{ minRows: 1, maxRows: 20 }}
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
                                            <div className="d-flex align-items-center section-title">

                                                <span className="section-title">Kỹ năng</span>
                                            </div>
                                            <div className="ml-4">
                                                <Form.List name="skill" initialValue={[{}]}>
                                                    {(fields, { add, remove, move }) => (
                                                        <>
                                                            {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                                                <div className="section-item">
                                                                    <Row>
                                                                        <Col span={5}>
                                                                            <Form.Item
                                                                                {...restField}
                                                                                name={[name, 'name']}
                                                                                fieldKey={[fieldKey, 'name']}
                                                                            >
                                                                                <Input readOnly placeholder="Tin học văn phòng" />
                                                                            </Form.Item>

                                                                        </Col>
                                                                        <Col span={19}>
                                                                            <Form.Item

                                                                                name={[name, 'description']}
                                                                                fieldKey={[fieldKey, 'description']}
                                                                            >
                                                                                <Input readOnly placeholder="Sử dụng thành thạo các công cụ Word, Excel, Power Point" />
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
                                            <div className="d-flex align-items-center section-title">

                                                <span className="section-title">Sở thích</span>
                                            </div>
                                            <div className="ml-4">
                                                <Form.Item
                                                    name="favorite"
                                                >
                                                    <TextArea readOnly
                                                        placeholder={`-Đá bóng \n-Đọc sách`}
                                                        autoSize={{ minRows: 1, maxRows: 20 }}
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </>}
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