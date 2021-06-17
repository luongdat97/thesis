import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Row, Col, Collapse, Card, Typography, Button, Space, Slider, Radio, Popconfirm } from 'antd';
import { Link } from 'react-router-dom'
import StyleManageCv from './index.style'
import cvApi from '../../../api/cvApi'
import { useCookies } from 'react-cookie'
import moment from 'moment'
import CvModal from '../../CvModal'
const { Option } = Select;
const { Panel } = Collapse;
const { Meta } = Card;
const { Title, Text } = Typography;
const { TextArea } = Input
const cvCovers = [
    { cover: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.1/onepage_impressive.png?v=1.0.3', url: '/cv/create' },
    { cover: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.1/default.png?v=1.0.3', url: '/cv1/create' },
]

function CvCard(props) {
    let cv = props.data
    if (!cv.cvType) cv.cvType = 0
    return (
        <>
            <Row gutter={16} className="border p-3">
                <Col span={8}>
                    <img className="w-100" alt="cv cover" src={cvCovers[cv.cvType].cover}></img>
                </Col>
                <Col span={16}>
                    <div className="d-flex justify-content-between">
                        <Title level={4}>{cv.jobPosition}</Title>
                    </div>


                    <Text>Ngày tạo: {moment(cv.ctime).format("DD/MM/YYYY")}</Text>
                    <br></br>
                    <Space className="mt-2">
                        {/* <CvModal cvType={cv.cvType} cvId={cv.id}/> */}
                        <Link to={`/applicant/individual/edit-cv${cv.cvType ? cv.cvType : ''}/${props.cvId}`}><Button type="primary">Cập nhật</Button></Link>
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

                </Col>
            </Row>
        </>
    )
}

export default function ManageCv() {
    const [cvList, setCvList] = useState([])
    const [cookies] = useCookies(["user"])
    let applicant_id = cookies.user.id
    useEffect(() => {
        fetchCv()
    }, [])

    const fetchCv = () => {
        console.log("l.=............", applicant_id)
        cvApi.getCvList({ applicant_id }).then((res) => {
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
                <div className="bg-white px-5 pt-4">
                    <Title level={3}>Danh sách CV đã tạo</Title>
                    <Row gutter={[70, 32]}>
                        {cvList.map(item => (
                            <Col span={12}>
                                <CvCard key={item.id} cvId={item.id} deleteCv={deleteCv} data={item}></CvCard>
                            </Col>

                        ))}
                    </Row>


                </div>
            </StyleManageCv>
        </>
    )
}