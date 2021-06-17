import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import ViewCv0 from '../cv/ViewCv'
import ViewCv1 from '../cv1/ViewCv'
import cvApi from '../../api/cvApi'

const CvModal = (props) => {
    let { cvId } = props
    const [cvType, setCvType] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [scrollP, setScrollP] = useState({ x: 0, y: 0 })
    useEffect(async () => {
        let cvType = (await cvApi.getCvById(cvId)).data.cvType
        setCvType(cvType || 0)
    }, [])
    const showModal = () => {
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
            <Button style={{ width: 110 }} size={props.smallButton ? "small" : "middle"} type="primary" onClick={() => { setScrollP({ x: window.scrollX, y: window.scrollY }); showModal(); }}>
                Xem CV
            </Button>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} width={840} title={null} bodyStyle={{ background: "#f0f2f5" }} destroyOnClose>
                {cvType === 0 && <ViewCv0 cvId={cvId} scrollP={scrollP}></ViewCv0>}
                {cvType === 1 && <ViewCv1 cvId={cvId}></ViewCv1>}
            </Modal>
        </>
    );
};

export default CvModal