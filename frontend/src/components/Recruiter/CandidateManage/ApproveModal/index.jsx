import React, { useState } from 'react';
import { Modal, Button, DatePicker, Input } from 'antd';

const ApproveModal = (props) => {
    const {dayMeet, setDayMeet, message, setMessage, handleApprove} = props
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        handleApprove()
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button type="primary" size="small" onClick={showModal}>
                Duyệt
            </Button>
            <Modal title="Duyệt ứng viên" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Thoát
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Duyệt ứng viên
                    </Button>,
                ]}
            >
                <div className="mb-3">
                    Lịch phỏng vấn: <DatePicker showTime value={dayMeet} onChange={(date) => setDayMeet(date)}></DatePicker>
                </div>

                Tin nhắn:
                <Input.TextArea rows={4} value={message} onChange={(e)=> setMessage(e.target.value)} />
            </Modal>
        </>
    );
};

export default ApproveModal