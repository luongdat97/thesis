import React, { useState, useEffect } from 'react';
import { Card, Avatar, Tabs, Select, Row, Col, Table, Tag, Typography, Space, Checkbox, Button } from 'antd';
const { Title, Text } = Typography
const CandidateCard = (props) => {
    return (
        <>
            <Card style={{ width: "100%" }}>
                <Row gutter={16}>
                    <Col span={4}>
                        <Avatar size="large" style={{ width: "100%", height: "auto" }} src={props.avatar} />
                    </Col>
                    <Col span={20}>
                        <Row>
                            <Col span={18}>
                                <Title level={4} className="m-0">Nguyễn Hải Anh</Title>
                                <Title level={5} className="m-0"> Vị trí ứng tuyển: Chuyên viên tiếng Trung</Title>
                            </Col>
                            <Col span={6}>
                                <div className="font-weight-bold">
                                    Mức lương: Thỏa thuận
                                </div>


                            </Col>
                        </Row>

                        <Space size="large" className="mt-1">
                            <Text>20 tuổi</Text>
                            <Text>Kinh nghiệm: chưa có</Text>
                            <Text>Địa điểm: hà nội</Text>
                        </Space>
                        <br />
                        <Text><i className="fas fa-briefcase"></i> Nhân viên parttime - Phiên dịch và edit video</Text><br />
                        <Text><i className="fas fa-briefcase"></i> Nhân viên đặt hàng fulltime - Nhân viên đặt hàng</Text><br />
                        <Text><i className="fas fa-graduation-cap"></i>Chuyên ngành: Giáo dục Hán ngữ Quốc tế - Đại học Tây nam trùng khánh</Text><br />


                        <Space size="small" className="mt-1">
                            <Button style={{ width: 110 }} size="small" type="primary">Mời ứng tuyển</Button>
                            <Button style={{ width: 110 }} size="small" type="primary">Lưu ứng viên</Button>
                            <Button style={{ width: 110 }} size="small" type="primary">Xem CV</Button>
                        </Space>
                    </Col>

                </Row>


            </Card>
        </>
    )
}

export default CandidateCard