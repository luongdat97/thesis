import styled from "styled-components";

const StyleList = styled.div`
  .container {
    background: #f0f2f5;
  }
  .slick-slide img {
    margin: auto;
  } 
  .slick-prev::before, .slick-next::before{
    font-size: 40px;
    color: #ddd;
  }
  .slick-prev {
    left: 0px;
  }
  .slick-next {
    right: 20px;
  }
`;
export default StyleList;