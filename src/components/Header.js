import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { HeaderDropdown } from "./HeaderDropdown";
import logo from "../assets/logo.png"

export const Header = () => {
  const [hidden, setHidden] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const activeClass = "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0";
  const inActiveClass = "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0";

  const handleSubmit = (event) => {
    event.preventDefault();
    const queryTerm = event.target.search.value;
    event.target.reset();
    return navigate(`/search?q=${queryTerm}`);
  };

  const handleSubmitChangeState = (event) => {
    setHidden(true);
    event.preventDefault();
    const queryTerm = event.target.search.value;
    event.target.reset();
    return navigate(`/search?q=${queryTerm}`);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    setDropdownVisible(false);
  }, [location]);

  return (
    <header>
      <nav className="bg-gray-50 border-gray-200">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4 px-6">
          <section className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={logo} className="h-8" alt="Universal Book Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap">Universal Book</span>
            </Link>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 ps-6" id="navbar-search">
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-50">
                <li>
                  <NavLink to="/" className={({ isActive }) => isActive ? activeClass : inActiveClass}>Home</NavLink>
                </li>
                <li>
                  <NavLink to="/genres" className={({ isActive }) => isActive ? activeClass : inActiveClass}>Genres</NavLink>
                </li>
                <li>
                  <NavLink to="/books" className={({ isActive }) => isActive ? activeClass : inActiveClass}>Books</NavLink>
                </li>
                <li>
                  <NavLink to="/chapters" className={({ isActive }) => isActive ? activeClass : inActiveClass}>Chapters</NavLink>
                </li>
              </ul>
            </div>
          </section>

          <div className="flex items-center justify-between">
            {/* Search icon small screen */}
            <button onClick={() => setHidden(!hidden)} type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-black hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5 me-1">
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Search</span>
            </button>

            {/* Search full screen */}
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <form onSubmit={handleSubmit}>
                <input type="text" id="search-navbar" name="search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 " placeholder="Search..." />
              </form>
            </div>
            <div className="relative">
              <button onClick={toggleDropdown} className="bi bi-person-circle cursor-pointer text-2xl text-gray-700 px-3"></button>
              {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <HeaderDropdown setDropdownVisible={setDropdownVisible}/>
                </div>
              )}
            </div>
            {/* Burger icon small screen */}
            <button onClick={() => setHidden(!hidden)} data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-search" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          {/* Search field small screen */}
          <div className={`items-center ${hidden ? "hidden" : ""} justify-between w-full md:hidden md:w-auto md:order-1 ps-6" id="navbar-search`}>
            <div className="relative mt-3">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <form onSubmit={handleSubmitChangeState}>
                <input type="text" name="search" id="search-navbar-small" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search..." />
              </form>
            </div>
            <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-200 rtl:space-x-reverse">
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? activeClass : inActiveClass}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/genres" className={({ isActive }) => isActive ? activeClass : inActiveClass}>Genres</NavLink>
              </li>
              <li>
                <NavLink to="/books" className={({ isActive }) => isActive ? activeClass : inActiveClass}>Books</NavLink>
              </li>
              <li>
                <NavLink to="/chapters" className={({ isActive }) => isActive ? activeClass : inActiveClass}>Chapters</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
