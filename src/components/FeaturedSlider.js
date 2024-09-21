import React from "react";
import Slider from "react-slick";
import SliderItem from "./SliderItem"; // Renamed the import
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

const getItemUrl = (itemType, id) => {
  if (itemType === 'book') {
    return `/books/${id}`;
  }
  if (itemType === 'genre') {
    return `/genres/${id}`;
  } 

  if (itemType === 'chapter'){
    return `/chapters/${id}`;
  }
}

const FeaturedSlider = ({ SliderItems, itemType }) => {
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
        <SliderItem key={item.id} imageUrl={item.imageUrl} onClickUrl={getItemUrl(itemType, item.id)} heading={item.heading}/> 
      ))}
    </Slider>
  );
}


export default FeaturedSlider;
