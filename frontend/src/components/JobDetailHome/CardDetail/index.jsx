import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, Collapse, Card, Typography, List } from 'antd';
import styled from 'styled-components'
import util from '../../../helper/util'
import * as constance from '../../../Constances/const'
const { Option } = Select;
const { Panel } = Collapse;
const { Meta } = Card;
const { Title, Text } = Typography;

const CardDetail = (props) => {
    const job = props.job
    return (
        <>
            <Card title="Thông tin tuyển dụng" className="w-100" headStyle={{backgroundColor: "#b5f5ec"}}>
                <p><Text strong>Mức lương:</Text> {!!job.salary && util.toSalaryString(job.salary)}</p>
                <p><Text strong>Hình thức làm việc:</Text> {constance.workType.find(item => item.code === job.workType)?.label}</p>
                <p><Text strong>Số lượng cần tuyển:</Text> {job.numberHire} người</p>
                <p><Text strong>Chức vụ:</Text> {constance.level.find(item => item.code === job.level)?.label}</p>
                <p><Text strong>Yêu cầu kinh nghiệm:</Text> {constance.experienceRequire.find(item => item.code === job.experienceRequire)?.label}</p>
                <p><Text strong>Yêu cầu giới tính:</Text> {constance.genderRequire.find(item => item.code === job.genderRequire)?.label}</p>
                <p><Text strong>Địa điểm làm việc:</Text> {job.workplace}</p>
            </Card>

        </>

    );
};

export default CardDetail