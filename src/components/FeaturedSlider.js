// FeaturedSlider.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import SliderItem from "./SliderItem";
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
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow custom-prev-arrow`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  );
};

const getItemUrl = (itemType, id) => {
  if (itemType === 'book') {
    return `/books/${id}`;
  }
  if (itemType === 'genre') {
    return `/genres/${id}`;
  } 

  // if (itemType === 'chapter'){
  //   return `/chapters/${id}`;
  // }

  if (itemType === 'authorGroup') {
    return `/group/${id}`
  }
 
  return null;
};

const FeaturedSlider = ({ SliderItems, itemType }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: SliderItems.length > 6,
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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleItemClick = (item) => {
    if (itemType === 'chapter') {
      setSelectedItem(item);
      setShowModal(true);
    } else {
      navigate(getItemUrl(itemType, item.id));
    }
  };

  const handleViewBookSummary = () => {
    setShowModal(false);
    navigate(`/books/${selectedItem.bookId}`);
  };

  const handleViewChapter = () => {
    setShowModal(false);
    navigate(`/chapters/${selectedItem.id}`);
  };

  return (
    <div>
      <Slider {...settings}>
        {SliderItems.map((item) => (
          <SliderItem
            key={item.id}
            imageUrl={item.imageUrl}
            heading={item.heading}
            onClickUrl={getItemUrl(itemType, item.id)}
            onClick={itemType === 'chapter' ? () => handleItemClick(item) : undefined}
          />
        ))}
      </Slider>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
                  <p className="select-option-text">Select an option:</p>
                  <button className="view-button" onClick={handleViewBookSummary}>
                    View Book Summary
                  </button>
                  <button className="view-button" onClick={handleViewChapter}>
                    View Chapter
                  </button>
                  <button className="cancel-button" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
            </div>
          </div>
      )}
    </div>
  );
};

export default FeaturedSlider;
