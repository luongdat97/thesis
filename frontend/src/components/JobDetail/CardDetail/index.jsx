import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, Collapse, Card, Typography, List } from 'antd';
import styled from 'styled-components'
const { Option } = Select;
const { Panel } = Collapse;
const { Meta } = Card;
const { Title, Text } = Typography;

const CardDetail = (props) => {
    const job = props.job
    return (
        <>
            <Card title="Thông tin tuyển dụng" className="w-100" headStyle={{backgroundColor: "#b5f5ec"}}>
                <p><Text strong>Mức lương:</Text> {job.salary?.from} - {job.salary?.to} triệu</p>
                <p><Text strong>Hình thức làm việc:</Text> Toàn thời gian</p>
                <p><Text strong>Số lượng cần tuyển:</Text> {job.numberHire} người</p>
                <p><Text strong>Chức vụ:</Text> Nhân viên</p>
                <p><Text strong>Yêu cầu kinh nghiệm:</Text> 1 năm</p>
                <p><Text strong>Yêu cầu giới tính:</Text> Không yêu cầu</p>
                <p><Text strong>Địa điểm làm việc:</Text> Hà Nội, Long Biên, Từ Liêm</p>
            </Card>

        </>

    );
};

export default CardDetail