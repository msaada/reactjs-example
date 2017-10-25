// @flow

import React, { Component } from "react";
import Slider from "react-slick";
import { Image } from "react-bootstrap";
import logo from "../assets/home.jpg";

class ArtistSlider extends Component {
  render = () => {
    const settings = {
      dots: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      adaptiveHeight: true,
      infinite: true
    };

    return (
      <Slider {...settings}>
        <Image src={logo} circle />
      </Slider>
    );
  };
}

export default ArtistSlider;
