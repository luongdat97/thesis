import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, Row, Col, InputNumber, Card, Typography, List, Checkbox, Space } from 'antd';
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
            <Card>
                <Title level={3}>Thông tin công ty</Title>

                <Space direction="vertical">
                    <Row>
                        <Col span={4}>Logo</Col>
                        <Col span={20}><img src="https://static.topcv.vn/company_logos/fpt-software-5f7b5509924a3.jpg"></img></Col>
                    </Row>
                    <Row>
                        <Col span={4}>Tên công ty</Col>
                        <Col span={20}>FPT Software</Col>
                    </Row>
                    <Row>
                        <Col span={4}>Mã số thuế</Col>
                        <Col span={20}>0101601092</Col>
                    </Row>
                    <Row>
                        <Col span={4}>Lĩnh vực hoạt động</Col>
                        <Col span={20}>IT - Phần mềm, IT - Phần cứng</Col>
                    </Row>
                    <Row>
                        <Col span={4}>Địa chỉ</Col>
                        <Col span={20}>FPT Building, 17 Duy Tân Str., Cầu Giấy District, Hanoi,</Col>
                    </Row>
                    <Row>
                        <Col span={4}>Số điện thoại</Col>
                        <Col span={20}>0969125248</Col>
                    </Row>
                    <Row>
                        <Col span={4}>Email</Col>
                        <Col span={20}>bachdv1@fsoft.com.vn</Col>
                    </Row>
                    <Row>
                        <Col span={4}>Website</Col>
                        <Col span={20}>	https://www.fpt-software.com/</Col>
                    </Row>
                    <Row>
                        <Col span={4}>Quy mô</Col>
                        <Col span={20}>10000+ nhân viên</Col>
                    </Row>
                    <Row>
                        <Col span={4}>Mô tả</Col>
                        <Col span={20}>FPT Software là công ty thành viên thuộc Tập đoàn FPT. Được thành lập từ năm 1999, FPT Software hiện là công ty chuyên cung cấp các dịch vụ và giải pháp phần mềm cho các khách hàng quốc tế, với hơn 16.000 nhân viên, hiện diện tại 25 quốc gia trên toàn cầu.
                        Nhiều năm liền, FPT Software được bình chọn là Nhà Tuyển dụng được yêu thích nhất và nằm trong TOP các công ty có môi trường làm việc tốt nhất Việt Nam.

</Col>
                    </Row>
                </Space>


            </Card>


        </>
    )
}


export default SettingJob;