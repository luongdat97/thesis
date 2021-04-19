import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Row, Col, Collapse, Card, Typography, Button, Space, Slider, Radio, Popconfirm } from 'antd';
import { Link } from 'react-router-dom'
import StyleManageCv from './index.style'
import cvApi from '../../../api/cvApi'
const { Option } = Select;
const { Panel } = Collapse;
const { Meta } = Card;
const { Title, Text } = Typography;
const { TextArea } = Input

function CvCard(props) {
    return (
        <>
            <Row gutter={16}>
                <Col span={4}>
                    <img className="w-100" alt="cv cover" src="https://res.cloudinary.com/project0407/image/upload/v1615735746/project/CV%20cover/modern_5_cktoed.webp"></img>
                </Col>
                <Col span={20}>
                    <div className="d-flex justify-content-between">
                        <Title level={4}>Tên file CV</Title>
                        <Space>
                            <Link to={`/applicant/individual/view-cv/${props.cvId}`}><Button type="primary">Xem</Button></Link>
                            <Link to={`/applicant/individual/edit-cv/${props.cvId}`}><Button type="primary">Sửa</Button></Link>
                            <Popconfirm
                                title="Bạn có muốn xóa cv này?"
                                onConfirm={() => props.deleteCv(props.cvId)}
                                // onCancel={}
                                okText="Đồng ý"
                                cancelText="Thoát"
                            >
                                <Button type="primary">Xóa</Button>
                            </Popconfirm>
                            
                        </Space>
                    </div>


                    <Text>Ngày tạo: 14-03-2021 16:31 PM</Text>
                    <br></br>
                    <Text>Link CV: https://i.topcv.vn/nguyenvana?ref=3881639</Text>
                    <br></br>

                </Col>
            </Row>
        </>
    )
}

export default function ManageCv() {
    const [cvList, setCvList] = useState([])
    useEffect(() => {
        fetchCv()
    }, [])

    const fetchCv = () => {
        cvApi.getCvList().then((res) => {
            console.log(res.data)
            setCvList(res.data)
        })
    }

    const deleteCv = (id) => {
        cvApi.delCv(id).then((res) => {
            fetchCv()
        })
    }

    return (
        <>
            <StyleManageCv>
                <div className="bg-white p-3">
                    <Space direction="vertical" size="large">
                        {cvList.map(item => (
                            <CvCard key={item.id} cvId={item.id} deleteCv={deleteCv}></CvCard>
                        ))}
                    </Space>
                </div>


            </StyleManageCv>



        </>
    )
}