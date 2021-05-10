import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, Collapse, Card, Typography, List, Checkbox, Switch, Space, message } from 'antd';
import { useCookies } from 'react-cookie'
import desireApi from '../../../api/desireApi'
import profileApi from '../../../api/profileApi'
import cvApi from '../../../api/cvApi'
import { province, career, tag } from '../../../Constances/const'
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

const SettingJob = (props) => {
    return (
        <>
            <Card>

                <Demo></Demo>
            </Card>
        </>
    )
}
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
    console.log(`selected ${value}`);
}

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const Demo = () => {
    const [cookies] = useCookies(['user'])
    const [desire, setDesire] = useState({})
    const [profile, setProfile] = useState({})
    const [cvList, setCvList] = useState([])
    const [form] = Form.useForm()

    useEffect(() => {
        console.log(cookies.user)
        desireApi.getDesire({ applicant_id: cookies.user.id }).then((res) => {
            console.log(res)
            setDesire(res.data)
        })

        profileApi.getProfile({ id: cookies.user.profile_id }).then((res) => {
            console.log(res)
            setProfile(res.data)
        })

        cvApi.getCvList({ applicant_id: cookies.user.id }).then((res) => {
            console.log(res)
            setCvList(res.data)
        })
    }, [])

    useEffect(() => { form.resetFields() }, [desire, profile]);

    const onFinish = (values) => {
        console.log('Success:', values);
        console.log(desire)
        profileApi.editProfile({ ...profile, ...values.profile })
        if (desire.id) {
            desireApi.editDesire({ ...desire, ...values.desire }).then(res => {
                message.success("Cập nhật thành công!")
            })
        } else {
            desireApi.postDesire({ ...values.desire, applicant_id: cookies.user.id }).then(res => {
                message.success("Cập nhật thành công!")
            })
        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ profile, desire }}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <div className="d-flex">
                <Title level={4} className="mr-3">Chế độ tìm việc</Title>
                <Form.Item
                    name={['desire', 'enable']}
                >
                    <Switch defaultChecked={!!desire.enable} />
                </Form.Item>

            </div>

            <Title level={5}>Thông tin cơ bản</Title>
            <Row gutter={30}>
                <Col span={12}>
                    <Form.Item
                        label="Họ tên"
                        name={['profile', 'name']}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Ngày sinh"
                        name={['profile', 'birthday']}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Giới tính"
                        name={['profile', 'gender']}
                    >
                        <Select>
                            <Option value={2}>Nam</Option>
                            <Option value={3}>Nữ</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Điện thoại"
                        name={['profile', 'phoneNumber']}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name={['profile', 'email']}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name={['profile', 'address']}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={30}>
                <Col span={12}>
                    <Title level={5}>Giới thiệu bản thân</Title>
                    <Form.Item
                        label="CV cá nhân"
                        name={['desire', 'cv_id']}
                    >
                        <Select >
                            {cvList.map(item => (
                                <Option value={item.id} key={item.id}>{item.jobPosition}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Ngành nghề"
                        name={['desire', 'field']}
                    >
                        <Select>
                            {career.map(item => (
                                <Option value={item} key={item}>{item}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Kỹ năng"
                        name={['desire', 'skill']}
                    >
                        <Select mode="tags" tokenSeparators={[',']}>
                            {tag.map((item) => (
                                <Option value={item} key={item}>{item}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Kinh nghiệm"
                        name={['desire', 'experience']}
                    >
                        <Select >
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
                        name={['desire', 'level']}
                    >
                        <Select>
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
                        label="Trình độ tiếng Anh"
                        name={['desire', 'english']}
                    >
                        <Select>
                            <Option value="1">Không biết</Option>
                            <Option value="2">Đọc hiểu cơ bản</Option>
                            <Option value="3">Đọc/ viết tốt tài liệu chuyên môn</Option>
                            <Option value="4">Giao tiếp tốt</Option>
                            <Option value="5">Thành thạo mọi kỹ năng</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Title level={5}>Mong muốn của bạn</Title>
                    <Form.Item
                        label="Địa điểm làm việc"
                        name={['desire', 'address']}
                    >
                        <Select>
                            {province.map(item => (
                                <Option value={item} key={item}>{item}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Loại hình làm việc"
                        name={['desire', 'workType']}
                    >
                        <Select >
                            <Option value="1">Toàn thời gian</Option>
                            <Option value="2">Bán thời gian</Option>
                            <Option value="3">Thực tập</Option>
                            <Option value="4">Remote (làm việc từ xa)</Option>
                        </Select>
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Lương từ"
                                name={['desire', 'salary', 'from']}
                            >
                                <Input></Input>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Lên đến"
                                name={['desire', 'salary', 'to']}
                            >
                                <Input></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                <Button type="primary" htmlType="submit">
                    Cập nhật
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SettingJob;