import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import EditJob from '../../EditJob'
const PostJobModal = (props) => {
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
      <Button type="primary" size="small" onClick={showModal}>
        Sửa
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={850} footer={null} title={null}>
        <EditJob fetchJobList={props.fetchJobList} handleCancel={handleCancel} jobId={props.jobId}></EditJob>
      </Modal>
    </>
  );
};

export default PostJobModal