import React, { Component } from "react";
import Slider from "react-slick";
import StyleSlider from "./index.style"

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block"}}
      onClick={onClick}
    > 
    <i class="fas fa-chevron-circle-right"></i> 
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", zIndex: 1}}
      onClick={onClick}
    >
      <i class="fas fa-chevron-circle-right"></i>
    </div>
  );
}

export default class ReactSlickDemo extends React.Component {
  render() {
    var settings = {
      dots: false,
      adaptiveHeight: true,
      autoplay: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    return (
      <StyleSlider>
        <div className="container">
          <Slider {...settings}>
            <div>
              <img class="w-100" src="https://res.cloudinary.com/project0407/image/upload/v1615340717/project/novaon-tuyen-dung-telesale_umsfqd.webp"/>
            </div>
            <div>
              <img class="w-100" src="https://res.cloudinary.com/project0407/image/upload/v1615340717/project/educa-tuyen-dung_pgrxp5.jpg" />
            </div>
          </Slider>
        </div>
      </StyleSlider>

    );
  }
}