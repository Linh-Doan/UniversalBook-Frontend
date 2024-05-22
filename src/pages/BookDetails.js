import React, { useState } from 'react';
import FeaturedSlider from "../components/FeaturedSlider";
import { useParams } from 'react-router-dom';
import Book4 from "../assets/book4.jpg";
import Book5 from "../assets/book5.jpg";
import Book6 from "../assets/book6.jpg";
import Book7 from "../assets/book7.jpg";
import Book8 from "../assets/book8.jpg";
import Book9 from "../assets/book9.jpg";
import Book10 from "../assets/book10.jpg";
import Book11 from "../assets/book11.jpg";
import Book12 from "../assets/book12.jpg";
import Book13 from "../assets/book13.jpg";
import background_img from '../assets/login_page.jpg';

const Chapters = [
    { id: 1, imageUrl: Book4 },
    { id: 2, imageUrl: Book5 },
    { id: 3, imageUrl: Book6 },
    { id: 4, imageUrl: Book7 },
    { id: 5, imageUrl: Book8 },
    { id: 6, imageUrl: Book9 },
    { id: 7, imageUrl: Book10 },
    { id: 8, imageUrl: Book11 },
    { id: 9, imageUrl: Book12 },
    { id: 10, imageUrl: Book13 },
];

export const BookDetails = () => {
    const { id } = useParams();
    const chapter = Chapters.find(chapter => chapter.id === parseInt(id));
    const [comment, setComment] = useState('');
    const [commentsList, setCommentsList] = useState([]);
    const [liked, setLiked] = useState(false);
    const [followedBook, setFollowedBook] = useState(false);
    const [followedAuthor, setFollowedAuthor] = useState(false);

    const handleCommentChange = (event) => setComment(event.target.value);
    const handleAddComment = () => {
        if (comment.trim() !== '') {
            setCommentsList([...commentsList, comment]);
            setComment('');
        }
    };

    return (
        <main
            className="relative bg-cover bg-center min-h-screen p-8"
            style={{ backgroundImage: `url(${background_img})` }}
        >
            <div className="flex h-full">
                {/* Book Details Section */}
                <div className="flex flex-col items-center bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-1/4">
                    {chapter ? (
                        <>
                            <img
                                src={chapter.imageUrl}
                                alt={`Book ${id}`}
                                className="w-96 h-96 object-cover mb-4 rounded"
                            />
                            <div className="flex space-x-4 mb-4">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                                >
                                    Share book
                                </button>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                                >
                                    View Book
                                </button>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <button
                                    className={`py-2 px-4 rounded text-white font-bold transition duration-300 ${
                                        liked ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-500 hover:bg-gray-700'
                                    }`}
                                    onClick={() => setLiked(!liked)}
                                >
                                    {liked ? 'Liked' : 'Like Book'}
                                </button>
                                <button
                                    className={`py-2 px-4 rounded text-white  font-bold transition duration-300 ${
                                        followedBook ? 'bg-red-500 hover:bg-green-700' : 'bg-gray-500 hover:bg-gray-700'
                                    }`}
                                    onClick={() => setFollowedBook(!followedBook)}
                                >
                                    {followedBook ? 'Following Book' : 'Follow Book'}
                                </button>
                                <button
                                    className={`py-2 px-4 rounded text-white font-bold transition duration-300 ${
                                        followedAuthor ? 'bg-yellow-500 hover:bg-green-700' : 'bg-gray-500 hover:bg-gray-700'
                                    }`}
                                    onClick={() => setFollowedAuthor(!followedAuthor)}
                                >
                                    {followedAuthor ? 'Following Author' : 'Follow Author'}
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-white text-xl">Book details page</p>
                    )}
                </div>

                {/* Summary and Author Information Section */}
<div className="flex-grow flex flex-col justify-start items-center mx-8 bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
    <div className="mb-8 w-full text-center">
        <p className="text-gray-800 text-2xl font-semibold">
            Book Summary:
        </p>
        <p className="text-gray-700">
            The Summary goes here...
        </p>
    </div>
    <div className="w-full text-center">
        <p className="text-gray-800 text-2xl font-semibold">
            Author Information:
        </p>
        <p className="text-gray-700">
            Author details go here...
        </p>
    </div>
</div>

                {/* Comments Section */}
                <div className="w-1/4 bg-white bg-opacity-90 p-4 rounded-lg shadow-lg">
                    <h2 className="text-gray-800 text-xl font-semibold mb-4">Comments:</h2>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={comment}
                            onChange={handleCommentChange}
                            placeholder="Write your comment"
                            className="border border-gray-400 p-2 w-full rounded"
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 w-full transition duration-300"
                            onClick={handleAddComment}
                        >
                            Add Comment
                        </button>
                    </div>
                    <ul className="space-y-2">
                        {commentsList.map((comment, index) => (
                            <li key={index} className="text-gray-800 bg-gray-200 p-2 rounded">
                                {comment}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="flex justify-center items-center my-8">
                <p className="text-white text-2xl font-semibold">
                    Chapter List
                </p>
            </div>

            <div className="px-16 mb-8">
                <FeaturedSlider SliderItems={Chapters} />
            </div>
        </main>
    );
};