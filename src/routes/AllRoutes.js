import { Routes, Route } from "react-router-dom";



import { HomePage, GenreList, BookList, ChapterList, Login, Register, PageNotFound, SearchResults, BookDetails, PublicProfile, Profile, BookEditor, BookCreator, CreateGroup, GroupDashboard } from "../pages";


export const AllRoutes = () => {
  return (
    <main>
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="genres" element={<GenreList />}></Route>
            <Route path="books" element={<BookList />}></Route>
            <Route path="chapters" element={<ChapterList />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="search" element={<SearchResults />}></Route>
            <Route path="bookcreator" element={<BookCreator />}></Route>
            <Route path="bookeditor" element={<BookEditor />}></Route>
            <Route path="bookdetails/:id" element={<BookDetails />} />
            <Route path="register" element={<Register />}></Route>
            <Route path="profile/:id" element={<Profile />}/>
            <Route path="user" element={<PublicProfile />}></Route>
            <Route path ="/creategroup" element={<CreateGroup></CreateGroup>} />
            <Route path="group" element={<GroupDashboard />}></Route>

            <Route path="*" element={<PageNotFound />}></Route>

        </Routes>
    </main>
  )
}