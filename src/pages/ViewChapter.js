import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import backgroundImage from '../assets/ChapterCreatorBackground.png';
import "./Createbook/ChapterCreator.css";
import { endpoints } from '../config.js';
import axiosInstance from '../api/axiosInstance.js';
import { useUser } from '../hooks/useUser.js';

export const ViewChapter = () => {
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([]);
  const [bookCreated, setBookCreated] = useState({});
  const { id } = useParams(); 
  const { user, userId } = useUser();
  const [authorGroups, setAuthorGroups] = useState([]);

  // Fetch author groups associated with the user
  useEffect(() => {
    const fetchAuthorGroup = async () => {
      if (userId) {
        try {
          const response = await axiosInstance.get(`${endpoints.authorGroup}/account/${userId}`);
          setAuthorGroups(response.data.data.authorGroups);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchAuthorGroup();
  }, [userId]);

  // Fetch chapters for the book
  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await axiosInstance.get(`${endpoints.getBooks}/${id}/chapters`);
        setChapters(response.data.data.chapter);
      } catch (err) {
        console.log(err);
      }
    };

    fetchChapter();
  }, [id]);

  // Fetch book details
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axiosInstance.get(`${endpoints.getBooks}/${id}`);
        setBookCreated(response.data.data.book);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBookDetails();
  }, [id]);

  // Check if the book's author_group_id exists in the user's author groups
  const canStartWriting = authorGroups.some(group => group.author_group_id === bookCreated.author_group_id);

  const startViewing = (chapter, index) => {
    navigate(`/chapters/${chapter.chapter_id}`, { state: { bookCreated, chapter } });
  };

  const addNewChapter = () => {
    navigate(`/books/${id}/add-chapter`, { state: { bookCreated } });
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
      <h1 className="text-4xl font-bold mb-4 mt-14 text-white animate-fadeIn">View chapter list of {bookCreated.book_name}</h1>
      <div className="w-full max-w-2xl bg-white/[.75] p-6 rounded-lg shadow-md animate-slideIn">
        <ul className="list-decimal list-inside">
          {chapters.map((chapter, index) => (
            <li key={index} className="flex justify-between items-center mb-2 animate-fadeIn">
              <span>{index + 1}. {chapter.chapter_name}</span>

              <div className="flex space-x-2">
                {/* Differentiated buttons */}

                {/* Start Writing button */}
                {canStartWriting && (
                  <button
                    type="button"
                    className="py-2 px-4 text-md font-medium text-white bg-green-600 hover:bg-green-800 rounded-md focus:outline-none focus:ring-4 focus:ring-green-300"
                  >
                    ✍️ Start Writing
                  </button>
                )}

                {/* View Chapter button */}
                <button
                  type="button"
                  className="py-1 px-3 text-md font-medium text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded-md focus:outline-none focus:ring-4 focus:ring-blue-300"
                  onClick={() => startViewing(chapter, index)}
                >
                  📖 View Chapter
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Add New Chapter button */}
        {canStartWriting && (
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={addNewChapter}
              className="py-2 px-5 text-md font-medium text-white bg-purple-600 hover:bg-purple-800 rounded-md focus:outline-none focus:ring-4 focus:ring-purple-300"
            >
              ➕ Add New Chapter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
