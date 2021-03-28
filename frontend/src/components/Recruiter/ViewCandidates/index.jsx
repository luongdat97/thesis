import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, Row, Col, InputNumber, Card, Typography, List, Checkbox, Button } from 'antd';
import DetailCv from "../../cv/DetailCv"
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select
const companyLogo = [
    'https://res.cloudinary.com/project0407/image/upload/v1615347249/project/company%20logo/cong-ty-co-phan-dau-tu-phat-trien-anh-va-em-59db4c9957711_rs_abw9g7.jpg',
    'https://res.cloudinary.com/project0407/image/upload/v1615347249/project/company%20logo/cong-ty-co-phan-replus-5b504e7e8b74f_ka2czs.webp',
    'https://res.cloudinary.com/project0407/image/upload/v1615347249/project/company%20logo/cong-ty-co-phan-dich-vu-di-dong-truc-tuyen-vi-momo-5f55a14a178cc_mekeqf.webp',
    'https://res.cloudinary.com/project0407/image/upload/v1615347249/project/company%20logo/cong-ty-bds-tan-hoang-gia-60470624a2f64_wgstim.jpg',
    'https://res.cloudinary.com/project0407/image/upload/v1615347249/project/company%20logo/cong-ty-tnhh-oh-vacation-5b0fb1bd69cdf_rs_xojube.jpg',
    'https://res.cloudinary.com/project0407/image/upload/v1615347249/project/company%20logo/ngan-hang-thuong-mai-co-phan-ky-thuong-viet-nam-5e7c8a9259ddc_rvysrd.webp',
]

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