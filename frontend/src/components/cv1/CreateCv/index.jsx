import React, { useState } from 'react';
import { Form, Input, Row, Col, Typography, Button, Space, Divider, Checkbox, message } from 'antd';
import cvApi from '../../../api/cvApi'
import StyleCv from "./index.style"
import UploadAvatar from '../UploadAvatar'
import { useCookies } from "react-cookie"
import Util from '../../../helper/util'
import ChangeCv from '../../ChangeCv'
const generate = Util.generate

const { Title } = Typography;
const { TextArea } = Input
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const Home = (props) => {
    const [cv, setCv] = useState(props.location.state?.cv || {})
    const [cookies] = useCookies(["user"])
    const [avatar, setAvatar] = useState(props.location.state?.avatar || {})
    const [display, setDisplay] = useState(props.location.state?.display ||{
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
            cvApi.postCv({ ...values, display, cvType: 1 }).then((res) => {
                console.log(res)
                message.success("Bạn đã tạo CV thành công!")
            }).catch((err) => {
                console.log(err)
            })
        } else {
            message.warn("Bạn phải đăng nhập để sử dụng chức năng này!")
        }
    }

    console.log(cv)
    return (
        <>
            <div style={{ backgroundColor: "#f0f2f5" }}>
                <StyleCv>
                    <Title level={3}>Tạo CV cá nhân</Title>
                    <Row gutter={30}>
                        <Col>
                            <div id="html2canvas" style={{ width: 794, height: 1123, backgroundColor: "#fff", paddingTop: 25 }}>

                                <Form
                                    {...layout}
                                    onFinish={(values) => onSubmit(values)}
                                    form={form}
                                    initialValues={cv}
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
                                    <div className="section" style={{ display: display.objective ? "block" : "none" }}>
                                        <SectionTool action={() => setDisplay({ ...display, objective: false })} />
                                        <div className="d-flex align-items-center section-title">

                                            <span className="section-title">Mục tiêu nghề nghiệp</span>
                                        </div>
                                        <div className="ml-4">
                                            <Form.Item
                                                name="objective"
                                            >
                                                <TextArea
                                                    placeholder={`-Môi trường chuyên nghiệp\n-Cống hiến hết mình`}
                                                    autoSize={{ minRows: 1, maxRows: 20 }}
                                                />
                                            </Form.Item>
                                        </div>
                                        <Divider className="my-0 mt-3" />
                                    </div>

                                    <div className="section" style={{ display: display.education ? "block" : "none" }}>
                                        <SectionTool action={() => setDisplay({ ...display, education: false })} />
                                        <div className="d-flex align-items-center section-title">

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
                                        <Divider className="my-0 mt-3" />
                                    </div>

                                    <div className="section" style={{ display: display.experience ? "block" : "none" }}>
                                        <SectionTool action={() => setDisplay({ ...display, experience: false })} />
                                        <div className="d-flex align-items-center section-title">
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
                                        <Divider className="my-0 mt-3" />
                                    </div>

                                    <div className="section" style={{ display: display.activity ? "block" : "none" }}>
                                        <SectionTool action={() => setDisplay({ ...display, activity: false })} />
                                        <div className="d-flex align-items-center section-title">

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
                                        <Divider className="my-0 mt-3" />
                                    </div>

                                    <div className="section" style={{ display: display.skill ? "block" : "none" }}>
                                        <SectionTool action={() => setDisplay({ ...display, skill: false })} />
                                        <div className="d-flex align-items-center section-title">

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
                                        <Divider className="my-0 mt-3" />
                                    </div>

                                    <div className="section" style={{ display: display.favorite ? "block" : "none" }}>
                                        <SectionTool action={() => setDisplay({ ...display, favorite: false })} />
                                        <div className="d-flex align-items-center section-title">

                                            <span className="section-title">Sở thích</span>
                                        </div>
                                        <div className="ml-4">
                                            <Form.Item
                                                name="favorite"
                                            >
                                                <TextArea
                                                    placeholder={`-Đá bóng \n-Đọc sách`}
                                                    autoSize={{ minRows: 1, maxRows: 20 }}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>

                                </Form>
                            </div>

                        </Col>
                        <Col sm={7}>
                            <div className="mb-3">
                                <Space>
                                    <ChangeCv init={() => setCv(form.getFieldsValue())} initial={{ cv, avatar, display }} cvType={1} />
                                    <Button type="primary" size="small" onClick={() => generate()}>&nbsp;Tải xuống</Button>
                                    <Button type="primary" size="small" onClick={() => form.submit()}>&nbsp;Lưu</Button>
                                </Space>
                            </div>
                            
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