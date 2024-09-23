import { useState } from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom';
import backgroundImage from '../../assets/ChapterCreatorBackground.png';
import "./ChapterCreator.css";

export const ChapterCreator = () => {
  const [chapterName, setChapterName] = useState('');
  const [chapters, setChapters] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { bookCreated } = location.state || { bookCreated: {} };
  const { authorGroupName } = location.state || { authorGroupName: ""};

  const handleChapterNameChange = (e) => {
    setChapterName(e.target.value);
  };

  const addChapter = () => {
    // Add the new chapter only if the name is not empty
    if (chapterName && chapterName.trim()) {
      // Create a new chapter object
      const newChapter = {
        chapter_name: chapterName,
        chapter_sequence: chapters.length + 1,
        chapter_content: "",
        book_id: bookCreated.book_id
      };

      // Add the new chapter to the chapters array
      setChapters([...chapters, newChapter]);
      setChapterName(''); // Clear the input after adding
    } else {
      alert("Chapter name cannot be empty.");
    }
  };

  const startWriting = (chapter, index) => {
    navigate('/bookeditor', { state: { bookCreated, chapter, index, authorGroupName } });
  };

  return (
    <div
      className="chaptercreator p-8 min-h-screen flex flex-col items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-4xl font-bold mb-4 mt-14 text-white animate-fadeIn">Create chapters for {bookCreated.book_name}</h1>
      <div className="w-full max-w-2xl bg-white/[.75] p-6 rounded-lg shadow-md animate-slideIn">
        <p className="text-lg font-medium text-gray-800 mb-4">Add chapters for your book:</p>
        <div className="flex mb-4">
          <input
            type="text"
            value={chapterName}
            onChange={handleChapterNameChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Chapter Name"
          />
          <button
            type="button"
            className="ml-4 py-2 px-4 text-md font-medium text-white bg-amber-800 hover:bg-amber-900 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-300 animate-bounce"
            onClick={addChapter}
          >
            Add Chapter
          </button>
        </div>

        {/* Render list of chapters */}
        <ul className="list-decimal list-inside">
          {chapters.map((chapter, index) => (
            <li key={index} className="flex justify-between items-center mb-2 animate-fadeIn">
              {/* Display the chapter name correctly */}
              <span>{index + 1}. {chapter.chapter_name}</span>
              <button
                type="button"
                className="ml-4 py-1 px-3 text-md font-medium text-white bg-blue-600 hover:bg-blue-800 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-300"
                onClick={() => startWriting(chapter, index)}
              >
                Start Writing
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
