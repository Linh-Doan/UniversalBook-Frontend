import React from "react";
import Slider from "react-slick";
import PropTypes from 'prop-types';
import "./BookSlider.css";

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

const Book = ({ imageUrl }) => (
  <div className="book-container rounded-lg overflow-hidden mx-1 transition-transform ease-in-out duration-300 hover:scale-110 cursor-pointer">
    <img src={imageUrl} alt="Book cover" className="w-40 h-60 rounded-lg" />
  </div>
);

const BookSlider = ({ books }) => {
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
      {books.map((book) => (
        <Book key={book.id} imageUrl={book.imageUrl} />
      ))}
    </Slider>
  );
}

BookSlider.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  })).isRequired,
};

export default BookSlider;
