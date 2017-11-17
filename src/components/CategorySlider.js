// @flow

import React, { Component } from "react";
import Slider from "react-slick";
import { Image } from "react-bootstrap";

class CategorySlider extends Component {
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
        <Image src={this.props.image} />
      </Slider>
    );
  };
}

export default CategorySlider;
