import { CustomMultiCarousel } from "../components/BookMultiCarousel.js"
import Book1 from "../assets/book1.jpeg";

const genres = [
    {
      id: 1,
      title: "test genre",
      imageUrl: Book1, 
    },
    {
      id: 2,
      title: "test genre",
      imageUrl: Book1, 
    },
    {
      id: 3,
      title: "test genre",
      imageUrl: Book1, 
    },
    {
      id: 4,
      title: "test genre",
      imageUrl: Book1, 
    },
    {
      id: 5,
      title: "test genre",
      imageUrl: Book1, 
    },
    {
      id: 6,
      title: "test genre",
      imageUrl: Book1, 
    },
];

export const GenreList = () => {
  return (
    <main>
      <CustomMultiCarousel title={"Trending Genres"} itemsToDisplay={genres}/>
      <CustomMultiCarousel title={"Top Genres"} itemsToDisplay={genres}/>
      <CustomMultiCarousel title={"New Genres"} itemsToDisplay={genres}/>
      <CustomMultiCarousel title={"Random Genres"} itemsToDisplay={genres}/>
    </main>
  )
}