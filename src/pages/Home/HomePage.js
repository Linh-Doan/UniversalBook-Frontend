import React, { useEffect, useState } from "react";
import { FeaturedCarousel } from "./components/FeaturedCarousel"
import FeaturedSlider from "../../components/FeaturedSlider";
import { apiBaseUrl, endpoints } from '../../config.js';

export const HomePage = () => {
  const [books, setBooks] = useState([]);
  useEffect(() =>{
    async function fetchBooks() {
      const response = await fetch(`${apiBaseUrl}${endpoints.getBooks}`);
      const data = await response.json();
      setBooks(data.data.books)
    }
    fetchBooks();
  }, [])
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
