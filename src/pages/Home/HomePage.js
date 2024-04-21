import { FeaturedCarousel } from "./components/FeaturedCarousel"
import Book4 from "../../assets/book4.jpg";
import Book5 from "../../assets/book5.jpg";
import Book6 from "../../assets/book6.jpg";
import Book7 from "../../assets/book7.jpg";
import Book8 from "../../assets/book8.jpg";
import Book9 from "../../assets/book9.jpg";
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
];

// Book component
const Book = ({ title, imageUrl }) => (
  <div className="rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
    <img src={imageUrl} alt="Book cover" className="w-40 h-60" />
  </div>
);

export const HomePage = () => {
  return (
    <main className="bg-[#515375]">
      <FeaturedCarousel />
      {/* Flex container with centering */}
      <div className="flex justify-center items-center my-4">
        <p className="text-white text-xl font-semibold px-3 py-1 rounded">
          Top pick
        </p>
      </div>
      <div className="flex justify-center overflow-x-auto py-4 px-16 space-x-12">
          {books.map((book) => (
            <Book key={book.id} imageUrl={book.imageUrl} />
          ))}
      </div>
    </main>
  )
}
