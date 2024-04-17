import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages";

export const AllRoutes = () => {
  return (
    <main>
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
        </Routes>
    </main>
  )
}
