import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import backgroundImage from '../assets/ChapterCreatorBackground.png';
import "./Createbook/ChapterCreator.css";
import { endpoints } from '../config.js';
import axiosInstance from '../api/axiosInstance.js';

export const ViewChapter = () => {
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([]);
  const [bookCreated, setbookCreated] = useState([]);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchChapter = async () => {
        try{
            const response = await axiosInstance.get(`${endpoints.getBooks}/${id}/chapters`);
            setChapters(response.data.data.chapter);
        } catch (err) {
        }
    };

    fetchChapter();
}, [id]);

    useEffect(() => {
        const fetchChapter = async () => {
            try{
                const response = await axiosInstance.get(`${endpoints.getBooks}/${id}`);
                setbookCreated(response.data.data.book);
            } catch (err) {
            }
        };

        fetchChapter();
    }, [id]);

    const startViewing = (chapter , index) => {
        navigate(`/chapters/${chapter.chapter_id}`, { state: { bookCreated, chapter } });
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
                <button
                    type="button"
                    className="py-1 px-3 text-md font-medium text-white bg-blue-600 hover:bg-blue-800 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    Start Writing
                </button>
                <button
                    type="button"
                    className="py-1 px-3 text-md font-medium text-white bg-blue-600 hover:bg-blue-800 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-300"
                    onClick={() => startViewing(chapter, index)}
                >
                    View Chapter
                </button>
                </li>
            ))}
            </ul>
        </div>
    </div>
  );
};
