import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Typography, Row, Col } from 'antd';
const { Title } = Typography;

const { Content, Footer } = Layout;

function MainLayout(props) {
    const url = props.url
    return (

        <Footer className="mt-5" style={{ background: '#282c2f', color: "#aaa" }}>
            <Row className="bootstrap-container">
                <Col className="pr-5" span={12}>
                    <Title style={{ color: "#aaa" }} level={5}><i className="fas fa-map-marker-alt mr-2"></i> Số 1 Nguyễn Huy Tưởng, p. Thanh Xuân Trung, quận Thanh Xuân, Hà Nội.</Title>
                    <Title style={{ color: "#aaa" }} level={5}><i className="fas fa-phone-alt mr-2"></i> 0981988254</Title>
                    <Title style={{ color: "#aaa" }} level={5}><i className="fas fa-envelope mr-2"></i> vieclam@job.com</Title>
                </Col>
                <Col span={12}>
                    <Title style={{ color: "#fff" }} level={4}>Giới thiệu về công ty</Title>
                    Tại vieclam.com, bạn có thể tìm thấy những tin tuyển dụng việc làm với mức lương vô cùng hấp dẫn. Những nhà tuyển dụng kết nối với TopCV đều là những công ty lớn tại Việt Nam, nơi bạn có thể làm việc trong một môi trường chuyên nghiệp, năng động, trẻ trung.
                    <br />
                    <br />
                    <i className="fab fa-twitter-square mr-3" style={{fontSize: "2.5em"}}></i>
                    <i className="fab fa-facebook-square mr-3" style={{fontSize: "2.5em"}}></i>
                    <i className="fab fa-linkedin mr-3" style={{fontSize: "2.5em"}}></i>
                    <i className="fab fa-google-plus-square mr-3" style={{fontSize: "2.5em"}}></i>
                </Col>

            </Row>
        </Footer>

    )
}

export default MainLayout