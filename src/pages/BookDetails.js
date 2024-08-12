import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiBaseUrl, apiBaseUrlRoot, endpoints } from '../config.js';
import FeaturedSlider from "../components/FeaturedSlider";
import background_img from '../assets/login_page.jpg';


export const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState({});
   
    useEffect(() => {
        async function fetchBook(){
            const response = await fetch(`${apiBaseUrl}${endpoints.getBooks}/${id}`);
            const json = await response.json()
            setBook(json.data.book);
            console.log(json);
        }
        fetchBook();
    }, [id]);
    const image = `${apiBaseUrlRoot}${book.book_image_url}`;
    const navigate = useNavigate();
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

    const handleViewContent = () => {
        navigate(`/viewchapter/${id}`);
    };

    return (
        <main
            className="relative bg-cover bg-center min-h-screen p-8"
            style={{ backgroundImage: `url(${background_img})` }}
        >
            <div className="flex h-full">
                {/* Book Details Section */}
                <div className="flex flex-col items-center bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-1/4">
                    <>
                        <img
                            src={`${image}`}
                            alt={`Book ${book.book_id}`}
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
                                onClick={handleViewContent}
                            >
                                View Book
                            </button>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <button
                                className={`py-2 px-4 rounded text-white font-bold transition duration-300 ${liked ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-500 hover:bg-gray-700'}`}
                                onClick={() => setLiked(!liked)}
                            >
                                {liked ? 'Liked' : 'Like Book'}
                            </button>
                            <button
                                className={`py-2 px-4 rounded text-white  font-bold transition duration-300 ${followedBook ? 'bg-red-500 hover:bg-green-700' : 'bg-gray-500 hover:bg-gray-700'}`}
                                onClick={() => setFollowedBook(!followedBook)}
                            >
                                {followedBook ? 'Following Book' : 'Follow Book'}
                            </button>
                            <button
                                className={`py-2 px-4 rounded text-white font-bold transition duration-300 ${followedAuthor ? 'bg-yellow-500 hover:bg-green-700' : 'bg-gray-500 hover:bg-gray-700'}`}
                                onClick={() => setFollowedAuthor(!followedAuthor)}
                            >
                                {followedAuthor ? 'Following Author' : 'Follow Author'}
                            </button>
                        </div>
                    </>
                </div>

                {/* Summary and Author Information Section */}
                <div className="flex-grow flex flex-col justify-start items-center mx-8 bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
                    <div className="mb-8 w-full">
                        <h2 className="text-gray-800 text-3xl font-bold mb-4">
                            {book.book_name}
                        </h2>
                        <p className="text-gray-800 text-xl mb-4">
                            {book.author_group? book.author_group.author_group_name : ''}
                        </p>
                        <p className="text-gray-700">
                            {book.summary_text}
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

            {/* <div className="px-16 mb-8">
                <FeaturedSlider SliderItems={Chapters} />
            </div> */}
        </main>
    );
};
