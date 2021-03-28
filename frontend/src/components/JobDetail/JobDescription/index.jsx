import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, Collapse, Card, Typography, Space } from 'antd';
import styled from 'styled-components'
const { Option } = Select;
const { Panel } = Collapse;
const { Meta } = Card;
const { Title, Text } = Typography;

export default function JobDescription() {
    return (
        <>
            <Space direction="vertical" size="large" className="px-5">
                <div>
                    <Title level={3}>Mô tả công việc</Title>
                    <Space direction="vertical">
                        <Text>- Tư vấn về nhãn hàng; tìm hiểu nhu cầu và giới thiệu mỹ phẩm đến khách hàng; hướng dẫn khách hàng sử dụng sản phẩm phù hợp.</Text>
                        <Text>- Cung cấp thông tin và dịch vụ ưu đãi theo chương trình chăm sóc khách hàng độc quyền của nhãn hàng.</Text>
                        <Text>- Cố gắng hoàn thành chỉ tiêu doanh số.</Text>
                        <Text>- Trưng bày và bảo quản sản phẩm trong cửa hàng; giữ gìn vệ sinh quầy kệ; kiểm kê và đảm bảo số lượng hàng hóa phụ trách.</Text>
                        <Text>- Thực hiện các nhiệm vụ khác theo phân công của cấp quản lý.</Text>
                    </Space>
                </div>
                <div>
                    <Title level={3}>YÊU CẦU ỨNG VIÊN</Title>
                    <Space direction="vertical">
                        <Text>- Ứng viên từ 18 tuổi trở lên, đã tốt nghiệp cấp 3 và có bằng THPT.</Text>
                        <Text>- Ngoại hình dễ nhìn, da mặt đẹp.</Text>
                        <Text>- Yêu thích mỹ phẩm và làm đẹp là một lợi thế.</Text>
                        <Text>- Có tinh thần phục vụ khách hàng.</Text>
                        <Text>- Ứng viên có từ 6 tháng kinh nghiệm bán hàng mỹ phẩm, ưu tiên kinh nghiệm tại các thương hiệu / cửa hàng mỹ phẩm lớn.</Text>
                    </Space>
                </div>
                <div>
                    <Title level={3}>Quyền lợi được hưởng</Title>
                    <Space direction="vertical">
                        <Text>- Thu nhập hàng tháng hấp dẫn bao gồm lương cơ bản + phụ cấp + thưởng doanh thu (trung bình khoảng 12-20 triệu tùy năng lực cá nhân).</Text>
                        <Text>- Cam kết lương tháng 13.</Text>
                        <Text>- Ngày nghỉ: 1 ngày / tuần + 12 ngày phép năm.</Text>
                        <Text>- Chế độ bảo hiểm XH, YT, TN đúng và đầy đủ theo Luật lao động.</Text>
                        <Text>- Chế độ bảo hiểm tai nạn 24/24 ngay trong thời gian thử việc.</Text>
                        <Text>- Chế độ bảo hiểm sức khỏe cho nhân viên chính thức.</Text>
                        <Text>- Chế độ mỹ phẩm quý và mua hàng giảm giá dành cho nhân viên.</Text>
                    </Space>
                </div>
                <div>
                    <Title level={3}>Cách thức ứng tuyển</Title>
                        Ứng viên nộp hồ sơ trực tuyến bằng cách bấm Ứng tuyển ngay dưới đây.<br/>
                        <div className="pt-3">
                            <div className="d-flex justify-content-center">
                                <Button size="large" type="primary" style={{ background: "#73d13d", borderColor: "#73d13d" }}>Ứng tuyển ngay</Button>
                            </div>
                            <div className="d-flex justify-content-center">Hạn nộp hồ sơ: 08/04/2021</div>
                        </div>
                        
                                                
            </div>
            </Space>



        </>

    )
}
