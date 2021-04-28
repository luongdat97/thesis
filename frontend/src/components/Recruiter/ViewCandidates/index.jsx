import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, Row, Col, InputNumber, Card, Typography, List, Checkbox, Button } from 'antd';
import DetailCv from "../../cv/ViewCv"
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

const SettingJob = (props) => {
    return (
        <>
            <Title level={3}>Tìm kiếm ứng viên</Title>
            <Row gutter={16}>
                <Col>


                    <DetailCv></DetailCv>
                </Col>
                <Col xs={8}>
                    <p>Xem thông tin liên hệ</p>
                    <p>Mời ứng tuyển</p>
                    <p>Lưu vào danh sách theo dõi</p>
                    <p>Tải cv pdf</p>
                    <div>
                        <Button>Cv trước</Button>
                        <Button>Cv kế tiếp</Button>
                        <Button>Đóng lại</Button>
                    </div>
                </Col>
            </Row>

        </>
    )
}


export default SettingJob;