import React, { useState, useEffect } from 'react';
import {Row, Col, Card, Typography} from 'antd';
const { Title, Text } = Typography;

const AreaJobList = () => {
    return (
        <Card
            title="Việc làm mới nhất"
            extra={<a href="#" className="text-white">Xem tất cả</a>}
            style={{ width: "100%" }}
            headStyle={{ backgroundColor: "#1890ff", color: "#fff" }}
        >
            <Row gutter={[16, 16]}>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                        <Col span={8}>
                            Kinh doanh <Text type="danger">(567)</Text>
                        </Col>
                    ))
                }
            </Row>
        </Card>
    )
}

export default AreaJobList