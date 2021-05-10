import React, { useState, useEffect } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ImageCloud from '../../../../../helper/ImageCloud'

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error('Image must smaller than 5MB!');
  }
  return false;
}

export default class Avatar extends React.Component {
  state = {
    loading: false,
    imageUrl: this.props.avatar.url
  };

  handleChange = async (info) => {
    let { signature, timestamp } = (await ImageCloud.getSignature()).data
    console.log(signature, timestamp)
    if (this.props.avatar.public_id) {
      ImageCloud.remove(this.props.avatar.public_id)
    }


    getBase64(info.file.originFileObj, imageUrl => {
      this.setState({
        imageUrl,
        loading: false,
      })
      ImageCloud.postImage({ file: imageUrl, timestamp, signature }).then((res) => {
        console.log(res)
        this.props.setAvatar({url: res.data.url, public_id: res.data.public_id})
      })
    },
    );

  };

  render() {
    let { loading, imageUrl } = this.state;
    const {avatar, setAvatar} = this.props
    if (!imageUrl) imageUrl=avatar.url
    const uploadButton = (
      <div>
        <div style={{ marginTop: 8, fontSize: 70 }}><i className="fas fa-camera"></i></div>
        {loading ? <LoadingOutlined /> : "Click để đăng ảnh"}

      </div>
    );
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}

      </Upload>
    );
  }
}
