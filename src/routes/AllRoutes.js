import { Routes, Route } from "react-router-dom";

import { HomePage, GenreList, BookList, ChapterList, Login, Register, PageNotFound, SearchResults, DashboardPage, BookDetails, Dashboard, Profile, MembershipDetails, CreateChapter } from "../pages";


export const AllRoutes = () => {
  return (
    <main>
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="genres" element={<GenreList />}></Route>
            <Route path="books" element={<BookList />}></Route>
            <Route path="chapters" element={<ChapterList />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="search" element={<SearchResults />}></Route>

            <Route path="bookdetails/:id" element={<BookDetails />} />
            <Route path="create-chapter" element={<CreateChapter />} />
            <Route path="dashboard" element={<DashboardPage />}>
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="membership" element={<MembershipDetails />} />
              </Route>
            <Route path="*" element={<PageNotFound />}></Route>

        </Routes>
    </main>
  )
}
