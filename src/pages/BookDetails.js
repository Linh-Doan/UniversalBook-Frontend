import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiBaseUrlRoot, endpoints } from '../config.js';
import { PageNotFound } from './PageNotFound.js';
import { Comment, Modal } from '../components/';
import axiosInstance from '../api/axiosInstance.js';
// import FeaturedSlider from "../components/FeaturedSlider";
import background_img from '../assets/login_page.jpg';
import { useUser } from '../hooks/useUser.js';


export const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [followedBook, setFollowedBook] = useState(false);
    const [commentList, setCommentsList] = useState([]);
    const [showAddComment, setShowAddComment] = useState(false);
    const [isAddingComment, setIsAddingComment] = useState(false);
    const { user, userId } = useUser();
    useEffect(() => {
        async function fetchBook(){
            try{
                const response = await axiosInstance.get(`${endpoints.getBooks}/${id}`);
                setBook(response.data.data.book);
            } catch (err) {
            }
        }
        fetchBook();
    }, [id]);
    useEffect(() => {
        async function checkFollowingBook(){
            if (userId) {
                const response = await axiosInstance.get(`${endpoints.followBook}?account_id=${userId}&book_id=${id}`);
                setFollowedBook(response.data.data.relationship ? true : false)
            }
        }
        checkFollowingBook();
    }, [id, userId]); 
    useEffect(() => {
        async function fetchComments(){
            const response = await axiosInstance.get(`${endpoints.bookComments}?book_id=${id}`);
            setCommentsList(response.data.data.comments)
        }
        fetchComments();
    }, [id]);

    const image = book ? `${apiBaseUrlRoot}${book.book_image_url}`: '';
    const navigate = useNavigate();
    
    const handleFollow = async () => {
        if (userId) {
            await axiosInstance.post(`${endpoints.followBook}`, 
                {
                    account_id: userId,
                    book_id: id
                },
                {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }
            )
            setFollowedBook(true);
        }
    }

    const handleUnfollow = async () => {
        if (userId) {
            await axiosInstance.delete(`${endpoints.followBook}?account_id=${userId}&book_id=${id}`);
            setFollowedBook(false);
        }
    }

    const handleAddComment = async (newComment) => {
        try {
            setIsAddingComment(true);
            const response = await axiosInstance.post(`${endpoints.bookComments}`, 
            {
                account_id: user.account_id,
                book_id: id,
                book_rating: newComment.rating,
                book_comment_text: newComment.text
            },
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            let createdComment = {...response.data.data.comment, account: {account_name: user.account_name}}
            setCommentsList([...commentList, createdComment])
        } catch (error) {
            alert("Error adding comment, please try again later")
        } finally {
            setIsAddingComment(false);
            setShowAddComment(false);
        }
    }

    const handleViewContent = () => {
        navigate(`/viewchapter/${id}`);
    };

    return (
        <main>
            {book ? 
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
                                    View Book
                                </button>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                                    onClick={followedBook ? handleUnfollow : handleFollow}
                                >
                                    {followedBook ? 'Following Book' : 'Follow Book'}
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
                            <p className="text-gray-700 mb-4">
                                {book.summary_text}
                            </p>
                            <p className="my-7 flex flex-wrap gap-2">
                                {book.genres ? book.genres.map(genre => {
                                    return <span className="mr-2 border border-gray-400 rounded p-2" key={genre.genre_id}>{genre.genre_name}</span>
                                }) : ''}
                            </p>
                            <div className="flex items-center">
                                <svg aria-hidden="true" className="w-5 h-5 text-grey-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <p className="ml-2 text-gray-900">{book.rating}/5</p>
                                <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
                                <span className="text-gray-900">{book.rating_count} reviews</span>
                            </div>
                        </div>
                    </div>
    
                    {/* Comments Section */}
                    <div className="w-1/4 bg-white bg-opacity-90 p-4 rounded-lg shadow-lg">
                        <h2 className="text-gray-800 text-xl font-semibold mb-4">Comments:</h2>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mt-2 w-full transition duration-300"
                            onClick={() => setShowAddComment(true)}
                        >
                            Add Comment
                        </button>
                        {showAddComment && (
                            <Modal onClose={() => setShowAddComment(false)} onAddComment={handleAddComment} isLoading={isAddingComment}/>
                        )}
                        <ul className="space-y-2">
                            {commentList.map((comment, index) => (
                                <li key={index}>
                                    <Comment userName={comment.account.account_name} commentText={comment.book_comment_text} rating={comment.book_rating}/>
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
            </div> : 
            <PageNotFound/>}
        </main>
        
    );
    
};
