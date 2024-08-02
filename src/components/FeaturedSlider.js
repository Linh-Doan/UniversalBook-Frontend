import React from "react";
import Slider from "react-slick";
import PropTypes from 'prop-types';
import SliderItem from "./SliderItem"; // Renamed the import

import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "./FeaturedSlider.css";

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow custom-next-arrow`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  );
}

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow custom-prev-arrow`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  );
}

const FeaturedSlider = ({ SliderItems }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {SliderItems.map((item) => ( 
        <Link to={`/bookdetails/${item.book_id}`} key={item.book_id}> 
          <SliderItem imageUrl={item.book_image_url} /> 
        </Link>
      ))}
    </Slider>
  );
}

FeaturedSlider.propTypes = {
  SliderItems: PropTypes.arrayOf(PropTypes.shape({
    book_id: PropTypes.string.isRequired,
    book_image_url: PropTypes.string.isRequired,
    heading: PropTypes.string
  })).isRequired,
};

export default FeaturedSlider;
