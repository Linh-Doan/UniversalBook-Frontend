import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { endpoints } from '../../config';
import axiosInstance from '../../api/axiosInstance';
import backgroundImage from '../../assets/BookEditorBackground2.png';
import "./BookCreator.css"

export const BookCreator = () => {
  const [bookDetails, setBookDetails] = useState({
    name: '',
    description: '',
    authorGroup: '',
    genres: [],
  });
  const [authorGroups, setAuthorGroups] = useState([])
  const [genres, setGenres] = useState([])
  const accountId = "3c23729a-820b-4cfe-9b29-70132bac0c74"
  useEffect(() => {
    async function fetchAuthorGroups(){
      const response = await axiosInstance.get(`${endpoints.authorGroup}?account_id=${accountId}`);
      setAuthorGroups(response.data.data.authorGroups);
    }
    fetchAuthorGroups();
  }, [accountId]);
  useEffect(() => {
    async function fetchGenres(){
      const response = await axiosInstance.get(`${endpoints.genres}`);
      setGenres(response.data.data.genres);
    }
    fetchGenres();
  }, [accountId]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({ ...bookDetails, [name]: value });
  };

  const handleGenreChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const genre = [selectedOption.getAttribute("id"), e.target.value];
    if (genre[1] && !bookDetails.genres.map(i => i[1]).includes(genre[1])) {
      setBookDetails({ ...bookDetails, genres: [...bookDetails.genres, genre] });
    }
  };

  const removeGenre = (genreToRemove) => {
    setBookDetails({
      ...bookDetails,
      genres: bookDetails.genres.filter((genre) => genre[0] !== genreToRemove),
    });
  };

  const handleSubmit = async () => {
    try{
      await axiosInstance.post(`${endpoints.getBooks}`,
      {
        book_name: bookDetails.name,
        author_group_id: bookDetails.authorGroup,
        summary_text: bookDetails.description,
        genres: bookDetails.genres.map(genre => genre[0])
      }, 
      {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
      });
      navigate('/chaptercreator', { state: { bookDetails } });
    } catch (err) {
      alert("Error creating book, try again later");
    }
  };

  return (
    <div
      className="bookcreator p-8 min-h-screen flex flex-col items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-4xl font-bold mb-8 text-white animate-fadeIn poetic-title">Craft Your Own Tale</h1>
      <div className="w-full max-w-2xl bg-white/[.55] bg-opacity-90 p-6 rounded-lg shadow-md animate-slideIn">
        <p className="text-lg font-medium text-gray-800 mb-4 poetic-subtitle">Light the Way for Your Tale with These Details:</p>
        <form className="space-y-6">
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              value={bookDetails.name}
              onChange={handleChange}
              className="peer mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="font-merriweather absolute left-3 -top-2.5 text-gray-700 bg-white px-1 text-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
            >
              Book Name
            </label>
          </div>
          <div className="relative">
            <textarea
              id="description"
              name="description"
              value={bookDetails.description}
              onChange={handleChange}
              className="peer mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder=" "
            />
            <label
              htmlFor="description"
              className="font-merriweather absolute left-3 -top-2.5 text-gray-700 bg-white px-1 text-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
            >
              Book summary
            </label>
          </div>
          <div className="relative">
            <label htmlFor="authorGroup" className="font-merriweather block text-lg font-medium text-gray-700">Author group</label>
            <select
              id="authorGroup"
              name="authorGroup"
              onChange={handleChange}
              className="font-merriweather mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
            >
              <option value="">Select author group</option>
              {authorGroups.map(authorGroup => <option key={authorGroup.author_group_id} value={authorGroup.author_group_id}>{authorGroup.author_group_name}</option>)}
            </select>
          </div>
          <div className="relative">
            <label htmlFor="genre" className="font-merriweather block text-lg font-medium text-gray-700">Genres</label>
            <select
              id="genre"
              name="genre"
              onChange={handleGenreChange}
              className="font-merriweather mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
            >
              <option key="" value="">Select genre</option>
              {genres.map(genre => <option key={genre.genre_id} id={genre.genre_id} value={genre.genre_name}>{genre.genre_name}</option>)}
            </select>
            <div className="mt-2 flex flex-wrap">
              {bookDetails.genres.map((genre) => (
                <span
                  key={genre[0]}
                  className="m-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full cursor-pointer animate-bounce"
                  onClick={() => removeGenre(genre[0])}
                >
                  {genre[1]} &times;
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="font-merriweather self-end w-40 py-2 px-4 text-md font-medium text-white bg-amber-800 hover:bg-amber-900 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-300 animate-bounce"
              onClick={handleSubmit}
            >
              Get Started
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
