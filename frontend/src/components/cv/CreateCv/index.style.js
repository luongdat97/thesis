import styled from "styled-components";

const StyleList = styled.div`
  .ant-input {
    border: 1px solid #fff;
    transition: none;
    padding: 0px 11px;
  }
  .ant-form-item {
    margin-bottom: 0px;
  }
  .ant-input:hover {
    border: 1px dashed #000;
  }
  
  .avatar-uploader > .ant-upload {
    width: 140px;
    height: 160px;
  }
  .section-title {
    font-size: 18px;
    font-weight: bold;
  }
  .section:hover {
    border: 2px solid #bae7ff;
  }
  .section {
    border: 2px solid #fff;
    position: relative;
  }
  .section-item{
    position: relative;
  }
  .section-tool {
    position: absolute;
    z-index: 1;
    right: 0px;
    top: -33px;
    visibility: hidden;
  }
  .section-item-tool {
    position: absolute;
    z-index: 1;
    right: 0px;
    top: -24px;
    visibility: hidden;
  }
  .section-item:hover .section-item-tool {
    visibility: visible;
  }
  .section:hover .section-tool {
    visibility: visible;
  }
  .ant-btn {
    -webkit-transition: none;
    transition: none;
  }
  .light-icon {
    color: inherit;
  }
  .section-item-tool .ant-btn {
    background: #69c0ff;
    border-color: #69c0ff;
  }
  #red + .ant-radio-inner {
   background: #f5222d;
  }
  #white + .ant-radio-inner {
    background: #fff;
  }
  #pink + .ant-radio-inner {
    background: #eb2f96;
  }
  #orange + .ant-radio-inner {
    background: #ffa940;
  }
  .ant-radio-inner::after {
    background: inherit;
    border-radius: 24px;
    top: -6px;
    left: -6px;
    border: 3px solid #999;
    width: 24px;
    height: 24px;
  }
  .ant-btn.btn-success {
    background: #52c41a;
    border-color: #52c41a;
  }
  .ant-col-18 {
    max-width: 100%;
  }
  .ant-upload.ant-upload-select-picture-card {
    border: none;
  }
  img {
    width:100%;
    height:100%;
    object-fit:cover;
  }

  input, label, textarea {
    font-size: ${props => props.size ? props.size : "1.1em"};
    height: fit-content;
  }
`;
export default StyleList;