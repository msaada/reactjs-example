// @flow

import React, { Component } from "react";
import Slider from "react-slick";
import { Image } from "react-bootstrap";
import logo from "../assets/home.jpg";

class HomeSlider extends Component {
  render = () => {
    const settings = {
      dots: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      adaptiveHeight: true,
      infinite: false
    };

    return (
      <Slider {...settings}>
        <Image src={logo} />
      </Slider>
    );
  };
}

export default HomeSlider;
