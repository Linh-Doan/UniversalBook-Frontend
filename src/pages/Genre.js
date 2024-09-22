import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Added useHistory to navigate
import { endpoints } from '../config.js';
import axiosInstance from '../api/axiosInstance.js';

export const Genre = () => {
    const { id } = useParams();  // Assuming id is the genre ID
    const [genre, setGenre] = useState({});
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    // Fetch genre details
    useEffect(() => {
        const fetchGenre = async () => {
            try {
                const response = await axiosInstance.get(`${endpoints.genres}/${id}`);
                const fetchedGenre = response.data.data.genre;
                setGenre(fetchedGenre);
            } catch (err) {
                console.error(err);
            }
        };

        fetchGenre();
    }, [id]);

    // Fetch books by genre
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axiosInstance.get(`${endpoints.getBooks}/genre/${id}`);
                setBooks(response.data.data.books);
            } catch (err) {
                console.error(err);
            }
        };

        fetchBooks();
    }, [id]);

    // Handle book click
    const handleBookClick = (bookId) => {
        // You can navigate to a book detail page or log the book ID
        navigate(`/books/${bookId}`);  // Navigating to the book's details page
    };

    return (
        <div 
            className="min-h-screen bg-cover bg-center relative"  // Background on the entire page
            style={{
                backgroundImage: `url(${process.env.REACT_APP_API_BASE_URL_ROOT}${genre.genre_image_url || ''})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 30px',
            }}
        >
            {/* Opacity Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>

            {/* Main Content */}
            <div className="relative z-10 max-w-6xl mx-auto p-6 text-white">
                {/* Genre Section */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-6">{genre.name}</h1>
                    <p className="text-xl">{genre.description || "Discover the best books in this genre."}</p>
                </div>

                {/* Books Section */}
                <div>
                    <h2 className="text-3xl font-semibold mb-6">{genre.genre_name}</h2>
                    {books.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {books.map((book) => (
                                <div 
                                    key={book.book_id} 
                                    onClick={() => handleBookClick(book.book_id)}  // Adding click handler here
                                    className="bg-gray-800 bg-opacity-90 p-4 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-200 cursor-pointer"
                                >
                                    <img
                                        src={`${process.env.REACT_APP_API_BASE_URL_ROOT}${book.book_image_url}`}
                                        alt={book.title}
                                        className="w-full h-48 object-cover rounded-md mb-4"
                                    />
                                    <h3 className="text-xl font-semibold">{book.book_name}</h3>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-lg text-gray-400">No books available in this genre at the moment.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
