import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiBaseUrlRoot, endpoints } from '../config.js';
import { PageNotFound } from './PageNotFound.js';
import { Loading } from '../components/';
import axiosInstance from '../api/axiosInstance.js';
import background_img from '../assets/login_page.jpg';

export const DraftDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loadingBook, setLoadingBooking] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchBook(){
            try{
                const response = await axiosInstance.get(`${endpoints.getBooks}/${id}`);
                setBook(response.data.data.book);
                if (response.data.data.book.is_published) {
                    navigate(`/books/${id}`)
                }
            } catch (err) {
                alert('Fail to load book');
            } finally {
                setLoadingBooking(false);
            }
        }
        fetchBook();
    }, [id, navigate]);

    const image = book ? `${apiBaseUrlRoot}${book.book_image_url}`: '';
    
    const handleViewContent = () => {
        navigate(`/books/${id}/chapters`);
    };

    return (
        <main>
            {loadingBook? <Loading/> : book ?
            <div className="relative bg-cover bg-center min-h-screen p-8" style={{ backgroundImage: `url(${background_img})` }}>
                <div className="flex h-full">
                    {/* Book Details Section */}
                    <div className="flex flex-col items-center bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-1/4">
                        <>
                            <img
                                src={`${image}`}
                                alt={`Book ${book.book_id}`}
                                className="w-96 h-96 object-cover mb-4 rounded"
                            />
                            <div className="flex flex-col space-y-4 w-full">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                                    onClick={handleViewContent}
                                >
                                    Continue editing
                                </button>
                            </div>
                        </>
                    </div>
    
                    {/* Summary and Author Information Section */}
                    <div className="flex-grow flex flex-col justify-start items-center mx-8 bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
                        <div className="mb-8 w-full">
                            <h1 className="text-gray-800 text-3xl font-bold mb-4">
                                Draft
                            </h1>
                            <h2 className="text-gray-800 text-3xl font-bold mb-4">
                                {book.book_name}
                            </h2>
                            <p className="text-gray-800 text-xl mb-4">
                                {book.author_group? book.author_group.author_group_name : ''}
                            </p>
                            <p className="text-gray-700 mb-4">
                                {book.summary_text}
                            </p>
                            <p className="my-7 flex flex-wrap gap-2">
                                {book.genres ? book.genres.map(genre => {
                                    return <span className="mr-2 border border-gray-400 rounded p-2" key={genre.genre_id}>{genre.genre_name}</span>
                                }) : ''}
                            </p>
                        </div>
                    </div>
                </div>
            </div> : 
            <PageNotFound/>}
        </main>
        
    );
}
