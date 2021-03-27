import React, { useState, useEffect } from 'react';
import { Card, Avatar, Tabs, Select, Row, Col, Table, Tag, Typography, Space, Checkbox, Button } from 'antd';
const { Title, Text } = Typography
const CandidateCard = (props) => {
    return (
        <>
            <Card style={{ width: "100%" }}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Avatar size="large" style={{ width: "100%", height: "auto" }} src="https://static.topcv.vn/avatars/igIjdWH406MoINsnj8Lr_605cb62f670b2_cvtpl.jpg" />
                    </Col>
                    <Col span={18}>
                        <Row>
                            <Col span={18}>
                                <Title level={3}>Nguyễn Hải Anh</Title>
                                <Title level={5}> Vị trí ứng tuyển: Chuyên viên tiếng Trung</Title>
                            </Col>
                            <Col span={6}>
                                <div className="">
                                    <Text>Cập nhật 10 ngày trước</Text><br />
                                    <Text>2 người đã xem</Text>
                                </div>


                            </Col>
                        </Row>


                        <Text> Nhân viên bán hàng - Bán hàng online</Text><br />
                        <Text>Nhân viên parttime - Phiên dỊch và edit video</Text><br />
                        <Text>Nhân viên đặt hàng fulltime - Nhân viên đặt hàng</Text><br />
                        <Text>Chuyên ngành: Giáo dục Hán ngữ Quốc tế - Đại học Tây nam trùng khánh</Text><br />
                        <div style={{ border: "1px dashed #52c41a", borderRadius: 3, padding: 3, margin: 5, display: "inline-block" }}> Địa điểm: Hà Nội</div>
                        <div style={{ border: "1px dashed #52c41a", borderRadius: 3, padding: 3, margin: 5, display: "inline-block" }}>Thời gian làm việc thực tế: 2 tháng</div>
                        <div style={{ border: "1px dashed #52c41a", borderRadius: 3, padding: 3, margin: 5 }}>Mục tiêu: Gắn bó với công việc và phát triển bản thân, tích cực hoàn thành công việc được giao, có trách nhiệm với công việc cũng như tập thể công ty.</div>
                        <Space size="small">
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