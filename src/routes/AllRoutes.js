import { Routes, Route } from "react-router-dom";
import { HomePage, GenreList, BookList, ChapterList, PageNotFound, SearchResults } from "../pages";

export const AllRoutes = () => {
  return (
    <main>
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="genres" element={<GenreList />}></Route>
            <Route path="books" element={<BookList />}></Route>
            <Route path="chapters" element={<ChapterList />}></Route>
            <Route path="search" element={<SearchResults />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
    </main>
  )
}
