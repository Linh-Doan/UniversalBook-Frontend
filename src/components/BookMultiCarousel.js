import MultiCarousel from "react-multi-carousel";
import { CarouselItem } from "./CarouselItem";

import "react-multi-carousel/lib/styles.css";
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: {max: 4000, min: 3000},
        items: 7
    },
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 5
    },
    tablet: {
        breakpoint: {max: 1024, min: 464},
        items: 4
    },
    mobile: {
        breakpoint: {max: 464, min: 0},
        items: 3
    }
};

export const CustomMultiCarousel = ({title, itemsToDisplay}) => {
    return (
        <div>
            <h1 className="text-xl font-semibold px-3 py-1 justify-center"> {title} </h1>
            <MultiCarousel responsive={responsive} className="px-3 py-1">
                {itemsToDisplay.map((obj, idx) => { return <CarouselItem title={obj.title} imageUrl={obj.imageUrl}/> } )}
            </MultiCarousel> 
        </div>
        
    );
}

