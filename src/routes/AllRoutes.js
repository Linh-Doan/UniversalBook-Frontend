import { Routes, Route } from "react-router-dom";
import { HomePage, GenreList, BookList, ChapterList, Login, Register, PageNotFound, SearchResults, DashboardPage, BookDetails, Dashboard, Profile, MembershipDetails, CreateChapter } from "../pages";

export const AllRoutes = () => {
  return (
    <main>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="genres" element={<GenreList />} />
            <Route path="books" element={<BookList />} />
            <Route path="chapters" element={<ChapterList />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="bookdetails/:id" element={<BookDetails />} />
            <Route path="create-chapter" element={<CreateChapter />} />
            <Route path="dashboard" element={<DashboardPage />}>
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="membership" element={<MembershipDetails />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    </main>
  );
};
