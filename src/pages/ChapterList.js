import { CustomMultiCarousel } from "../components/BookMultiCarousel.js"
import Book1 from "../assets/book1.jpeg";

const chapters = [
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

export const ChapterList = () => {
  return (
    <main>
      <CustomMultiCarousel title={"Hot Chapters"} itemsToDisplay={chapters}/>
      <CustomMultiCarousel title={"Top Chapters"} itemsToDisplay={chapters}/>
      <CustomMultiCarousel title={"New Chapters"} itemsToDisplay={chapters}/>
    </main>
  )
}
