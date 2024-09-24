import Book1 from "../../../assets/book1.jpeg";
import Image from "../../../assets/long_pic.jpg";
import Image2 from "../../../assets/background-desktop-2500w.jpg"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ImageCard } from "./ImageCard";
import { Link } from 'react-router-dom';

export const FeaturedCarousel = () => {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true
  };
  const generalText = <div>
      <p className="text-4xl py-2 font-bold text-white drop-shadow-lg">A place for people to</p>
      <p className="text-7xl py-2 font-bold text-white drop-shadow-lg">Read, write, discuss and share</p>
    </div>
  const writerText = <div>
  <p className="text-7xl py-2 font-bold text-white drop-shadow-lg">Writers</p>
  <p className="text-4xl py-2 font-bold text-white drop-shadow-lg">Create your own books here</p>
  <Link to="/bookcreator" className="my-5">
  <button type="button" className="my-5 py-4 px-5 me-2 mb-2 text-lg font-medium text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">GET STARTED</button>
  </Link>
</div>
  const readerText = <div>
  <p className="text-7xl py-2 font-bold text-white drop-shadow-lg">Readers</p>
  <p className="text-4xl py-2 font-bold text-white drop-shadow-lg">Discover our books</p>
  <Link to="/books">
  <button type="button" className="my-5 py-4 px-5 me-2 mb-2 text-lg font-medium text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">GET STARTED</button>
  </Link>
</div>
  return (
    <div>
      <Slider {...settings}>
        <div>
          <ImageCard source={Image} children={generalText}/>
        </div>
        <div>
          <ImageCard source={Image2} children={writerText}/>
        </div>
        <div>
          <ImageCard source={Book1} children={readerText}/>
        </div>
      </Slider>
    </div>
    
    
  )
}
