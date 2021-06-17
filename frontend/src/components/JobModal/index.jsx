import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import JobDetailHome from '../JobDetailHome'
const JobModal = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      <a onClick={showModal}>
        {props.title}
      </a>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1000} title={null} footer={null}>
        <JobDetailHome noAction jobId={props.jobId}></JobDetailHome>
      </Modal>
    </>
  );
};

export default JobModal