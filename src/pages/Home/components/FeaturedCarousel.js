import Book1 from "../../../assets/book1.jpeg";
import Book2 from "../../../assets/book2.avif";
import Book3 from "../../../assets/book3.jpeg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ImageCard } from "./ImageCard";
export const FeaturedCarousel = () => {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <div className="bg-gray-100 dark:bg-gray-800">
      <Slider {...settings}>
        <div>
          <ImageCard/>
        </div>
        <div>
          <ImageCard />
        </div>
        <div>
          <ImageCard />
        </div>
      </Slider>
    </div>
    
    
  )
}
