import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCallback, useState  } from "react";
import { useLocation } from "react-router-dom";
import "./BookEditor.css";
import backgroundImage from '../../assets/bookeditorbackground3.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

function publishBook() {
  console.log("abc")
}

export const BookEditor = () => {
  const location = useLocation();
  const { bookDetails } = location.state || { bookDetails: {} };
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const quill = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS }
    });

  quill.clipboard.dangerouslyPasteHTML(0, `
    <div style="text-align: center; margin-bottom: 20px;">
      <h1 style="font-family: 'Merriweather', serif; color: #563b23; font-size: 2.5em; margin-bottom: 0.5em;">
        ${bookDetails.name}
      </h1>
      <h3 style="font-family: 'Merriweather', serif; color: #563b23; font-size: 1.5em;">
        Author: ${bookDetails.author}
      </h3>
    </div>
  `);
  }, [bookDetails]);

  return (
    <div
      className="bookeditor flex justify-center items-center min-h-screen relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="w-7/12 container bg-opacity-70 p-6 rounded-lg shadow-md relative"
        ref={wrapperRef}
      ></div>

      <FontAwesomeIcon
        icon={faBookOpen}
        className="w-8 h-8 text-orange-400 cursor-pointer hover:text-orange-600 absolute top-5 right-4"
        onClick={toggleSidebar}
      />

      {isExpanded && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay background
          }}
          onClick={toggleSidebar} // Close popup when clicking outside
        >
          <div
            className="book-details w-11/12 lg:w-6/12 p-8 rounded-lg shadow-md bg-opacity-90 relative"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              zIndex: 1001, // Ensures it is above the overlay
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <h2 className="text-2xl font-bold mb-4 font-merriweather text-gray-800">
              {bookDetails.name}
            </h2>
            <p className="font-merriweather text-gray-800">
              <strong>Description:</strong> {bookDetails.description}
            </p>
            <p className="font-merriweather text-gray-800">
              <strong>Author:</strong> {bookDetails.author}
            </p>
            <p className="font-merriweather text-gray-800">
              <strong>Genres:</strong>
            </p>
            <div className="flex flex-wrap mb-4">
              {bookDetails.genres?.map((genre, index) => (
                <span
                  key={index}
                  className="m-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                className="font-merriweather text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg px-4 py-2 transition duration-200 transform hover:scale-105"
                onClick={publishBook}
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};