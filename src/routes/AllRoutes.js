import { Routes, Route } from "react-router-dom";



import { HomePage, GenreList, BookList, ChapterList, Login, Register, PageNotFound, SearchResults, BookDetails, ViewChapter, Profile, BookEditor, BookCreator, CreateGroup, GroupDashboard} from "../pages";
import { ProtectedRoute } from "./ProtectedRoute";
import { ViewChapterDetails } from "../pages/ViewChapterDetails";
import { Genre } from "../pages/Genre";

export const AllRoutes = () => {
  return (
    <main>
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="genres" element={<GenreList />}></Route>
            <Route path="genres/:id" element={<Genre />}></Route>
            <Route path="books" element={<BookList />}></Route>
            <Route path="chapters" element={<ChapterList />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="search" element={<ProtectedRoute><SearchResults /></ProtectedRoute>}></Route>
            <Route path="bookcreator" element={<ProtectedRoute><BookCreator /></ProtectedRoute>}></Route>
            <Route path="bookeditor" element={<ProtectedRoute><BookEditor /></ProtectedRoute>}></Route>
            <Route path="books/:id" element={<ProtectedRoute><BookDetails /></ProtectedRoute>} />
            <Route path="books/:id/chapters" element={<ProtectedRoute><ViewChapter /></ProtectedRoute>} />
            <Route path="chapters/:id" element={<ProtectedRoute><ViewChapterDetails /></ProtectedRoute>} />
            <Route path="profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
            <Route path ="/creategroup" element={<ProtectedRoute><CreateGroup/></ProtectedRoute>} />
            <Route path="group" element={<ProtectedRoute><GroupDashboard /></ProtectedRoute>}></Route>
            <Route path="group/:id" element={<GroupDashboard />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
    </main>
  )
}
