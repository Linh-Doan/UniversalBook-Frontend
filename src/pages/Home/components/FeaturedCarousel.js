import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Book1 from "../../../assets/book1.jpeg";
import Book2 from "../../../assets/book2.avif";
import Book3 from "../../../assets/book3.jpeg";
export const FeaturedCarousel = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800">
      <Carousel autoPlay showThumbs={false} showStatus={false} infiniteLoop={true}>
        <div>
          <img src={Book1} alt="Introduction" style={{height:"60vh", width: "fit-content"}}/>
        </div>
        <div>
          <img src={Book2} alt="Writer" style={{height:"60vh", width: "fit-content"}}/>
        </div>
        <div>
          <img src={Book3} alt="Reader" style={{height:"60vh", width: "fit-content"}}/>
        </div>
      </Carousel>
    </div>
    
    
  )
}
