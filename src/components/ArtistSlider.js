// @flow

import React, { Component } from "react";
import Slider from "react-slick";
import { Image } from "react-bootstrap";
import logo from "../assets/home.jpg";

class ArtistSlider extends Component {
  styles = () => {
    return {
      slider: {
        display: "flex"
      }
    };
  };
  render = () => {
    const settings = {
      dots: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true
    };

    return (
      <div style={this.styles().slider}>
        <Slider {...settings}>
          <Image src={logo} circle />
        </Slider>
      </div>
    );
  };
}

export default ArtistSlider;
