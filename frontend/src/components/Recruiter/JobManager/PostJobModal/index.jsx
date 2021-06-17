import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import PostJob from '../../PostJob'
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
      <Button type="primary" onClick={showModal}>
        Đăng tin mới
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={850} footer={null} title={null}>
        <PostJob fetchJobList={props.fetchJobList} handleCancel={handleCancel}></PostJob>
      </Modal>
    </>
  );
};

export default PostJobModal