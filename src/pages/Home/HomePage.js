import React from "react";
import { FeaturedCarousel } from "./components/FeaturedCarousel"
import FeaturedSlider from "../../components/FeaturedSlider";

import Book4 from "../../assets/book4.jpg";
import Book5 from "../../assets/book5.jpg";
import Book6 from "../../assets/book6.jpg";
import Book7 from "../../assets/book7.jpg";
import Book8 from "../../assets/book8.jpg";
import Book9 from "../../assets/book9.jpg";
import Book10 from "../../assets/book10.jpg";
import Book11 from "../../assets/book11.jpg";
import Book12 from "../../assets/book12.jpg";
import Book13 from "../../assets/book13.jpg";

// Array of book details
const books = [
  {
    id: 1,
    imageUrl: Book4, 
  },
  {
    id: 2,
    imageUrl: Book5, 
  },
  {
    id: 3,
    imageUrl: Book6, 
  },
  {
    id: 4,
    imageUrl: Book7, 
  },
  {
    id: 5,
    imageUrl: Book8, 
  },
  {
    id: 6,
    imageUrl: Book9, 
  },
  {
    id: 7,
    imageUrl: Book10, 
  },
  {
    id: 8,
    imageUrl: Book11, 
  },
  {
    id: 9,
    imageUrl: Book12, 
  },
  {
    id: 10,
    imageUrl: Book13, 
  },
];

export const HomePage = () => {
  return (
    <main className="bg-[#515375]">
      <FeaturedCarousel />
      <div className="flex justify-center items-center my-4">
        <p className="text-white text-xl font-semibold px-3 py-1 rounded">
          Top picks
        </p>
      </div>
      <div className="px-16">
        <FeaturedSlider SliderItems={books} />
      </div>
    </main>
  );
}
