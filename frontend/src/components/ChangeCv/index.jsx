import React, { useState, useEffect } from 'react';
import { Form, Input, Tabs, Select, Row, Col, Table, Tag, Typography, Space, Checkbox, Button, Card, Modal } from 'antd';
import { Link } from 'react-router-dom'

const { TabPane } = Tabs;
const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

const cvCovers = [
    { cover: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.1/onepage_impressive.png?v=1.0.3', url: '/cv/create' },
    { cover: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.1/default.png?v=1.0.3', url: '/cv1/create' },
    // {cover: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.1/timeline_clean_2.png?v=1.0.3', url: '/cv/create'},
    // {cover: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.1/default.png?v=1.0.3', url: '/cv/create'},
]


const ChangeCv = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        props.init()
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button type="primary" size="small" onClick={showModal}>
                Đổi mẫu
            </Button>
            <Modal title="Chọn mẫu CV" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Card className="bg-white">
                    <Row gutter={[16, 16]}>
                        {cvCovers.map((data, index) => {
                            if (index != props.cvType) {
                                return (<Col span={8}>
                                    <CvCard cover={data.cover} index={index} url={data.url} data={props.initial}></CvCard>
                                </Col>)
                            }
                        }
                        )}
                    </Row>
                </Card>
            </Modal>
        </>
    );
};

const CvCard = (props) => {
    console.log(props.data)
    return (
        <Link
            to={{
                pathname: props.url,
                state: props.data
            }}
        >
            <Card
                hoverable
                className='w-100'
                cover={<img alt="example" src={props.cover} />}
            >
                <Title level={5}>Mẫu CV sinh viên</Title>
            </Card>
        </Link>
    )
}

export default ChangeCv;