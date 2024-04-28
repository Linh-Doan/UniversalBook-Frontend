import { CustomMultiCarousel } from "../components/BookMultiCarousel.js"
import Book1 from "../assets/book1.jpeg";

const books = [
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

export const BookList = () => {
  return (
    <main>
      <CustomMultiCarousel title={"Hot Books"} itemsToDisplay={books}/>
      <CustomMultiCarousel title={"Top Books"} itemsToDisplay={books}/>
      <CustomMultiCarousel title={"New Books"} itemsToDisplay={books}/>
    </main>
  )
}
