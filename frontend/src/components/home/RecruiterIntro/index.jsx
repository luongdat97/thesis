import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Form, Input, Space } from 'antd';
import {Link} from 'react-router-dom'
const { Title, Text } = Typography;
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
const tailLayout = {
    wrapperCol: { offset: 6, span: 18 },
};
const GeneralJobCard = (props) => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="bg-white mt-5">
            <Row style={{height: 476}}>
                <Col sm={12} >
                    <div className="d-flex align-items-center h-100" style={{background: "#4080ed"}}>
                        <img className="w-100" alt="img" src="https://res.cloudinary.com/project0407/image/upload/v1618105031/project/09170499_Applicant-Tracking-Software-la-gi-2_oma6ba.png"></img>
                    </div>

                </Col>
                <Col sm={12} className="p-5">
                    <Space direction="vertical" >
                        <Title level={3}>Nhà tuyển dụng</Title>
                        <Text><i className="fas fa-check text-success"></i> Ứng viên sẵn sàng tiếp cận thông tin tuyển dụng</Text>
                        <Text><i className="fas fa-check text-success"></i> Không giới hạn tương tác với ứng viên qua hệ thống nhắn tin nội bộ MIỄN PHÍ</Text>
                        <Text><i className="fas fa-check text-success"></i> Quảng cáo thông minh giúp tin tuyển dụng được phủ rộng trên toàn bộ hệ thống</Text>
                        <Text><i className="fas fa-check text-success"></i> Quảng cáo công ty trên Fanpage số 1 về việc làm – tuyển dụng</Text>
                    </Space>
                
                    <Space className="mt-5">
                        <Link to="recruiter-register"><Button type="primary" size="large">Đăng ký</Button></Link> 
                        <Link to="recruiter-login"><Button type="primary" size="large">Đăng nhập</Button></Link>
                    </Space>
                    



                </Col>
            </Row>
        </div>

    )
}

export default GeneralJobCard