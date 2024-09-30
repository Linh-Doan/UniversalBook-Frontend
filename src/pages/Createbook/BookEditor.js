import Quill from "quill";
import "quill/dist/quill.snow.css";
import Delta from "quill-delta";
import { useCallback, useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from '../../api/axiosInstance';
import "./BookEditor.css";
import backgroundImage from '../../assets/bookeditorbackground3.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { endpoints } from '../../config';
import { useUser } from "../../hooks/useUser";
import { io } from "socket.io-client";
import { apiBaseUrlRoot } from '../../config.js';

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

export const BookEditor = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { bookCreated } = location.state || { bookCreated: {} };
    const { authorGroupName } = location.state || { authorGroupName: {} };
    const { chapter } = location.state || { chapter: "" };
    const [isExpanded, setIsExpanded] = useState(false);
    const { user, userId } = useUser();

    const [content, setContent] = useState(chapter.chapter_content || ""); // Storing HTML content
    const newOps = useRef(new Delta()); // new local content changes
    const isUpdateChapter = useRef(false);
    const socket = useRef(null);
    const quill = useRef(null);

    useEffect(() => {
        if (isUpdateChapter.current) {
            socket.current = io(apiBaseUrlRoot + '?chapterId=' + chapter.chapter_id);
        }
    }, [chapter]);

    useEffect(() => {
        if (socket.current != null && socket.current.active) {
            socket.current.on("change", (args) => {
                let operation = args;

                if (operation.delta != null) {
                    const transformedDelta = new Delta().transform(operation.delta, true);
                    const composedDelta = quill.current.getContents().compose(transformedDelta);
                    newOps.current = new Delta();
                    quill.current.setContents(composedDelta);
                    setContent(quill.current.root.innerHTML); // Update content state with formatted HTML
                }
            });

            socket.current.on("publish", async (userName) => {
                alert(`Page has been saved by ${userName}, syncing content`);
                try {
                    const response = await axiosInstance.get(`${endpoints.getChapters}/${chapter.chapter_id}`);
                    const updatedContent = response.data.data.chapter.chapter_content;
                    setContent(updatedContent);
                    // Set the HTML content into the editor
                    // quill.current.clipboard.dangerouslyPasteHTML(0, updatedContent);
                } catch (err) {
                    console.log(err);
                }
            });
        }
    }, [chapter]);

    // Handlers
    const handleDebounceChange = (delta, userId) => {
        socket.current.emit("change", { delta: delta, userId: userId ? userId : 'local' });
        newOps.current = new Delta();
    };

    const debounce = (fn, ms = 300) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn.apply(this, args), ms);
        };
    };

    const debouncedHandleChange = useCallback( // eslint-disable-line
        debounce(handleDebounceChange, 500),
        []
    ); // eslint-disable-line

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        const setUpdate = () => {
            if (chapter.chapter_content.length > 0) {
                isUpdateChapter.current = true;
            }
        };
        setUpdate();
    }, [chapter]);

    const wrapperRef = useCallback((wrapper) => {
        function createEditor(wrapper) {
            if (wrapper == null) {
                return;
            }

            wrapper.innerHTML = "";
            const editor = document.createElement("div");
            wrapper.append(editor);
            quill.current = new Quill(editor, {
                theme: "snow",
                modules: { toolbar: TOOLBAR_OPTIONS }
            });

            // If chapter content is not empty, directly load it as HTML
            if (content && content.length > 0) {
                quill.current.clipboard.dangerouslyPasteHTML(0, content);
            } else {
                // Default header if no existing content
                quill.current.clipboard.dangerouslyPasteHTML(0, `
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h1 style="font-family: 'Merriweather', serif; color: #563b23; font-size: 2.5em; margin-bottom: 0.5em;">
                            ${chapter.chapter_name}
                        </h1>
                        <h3 style="font-family: 'Merriweather', serif; color: #563b23; font-size: 1.5em;">
                            Author: ${authorGroupName}
                        </h3>
                    </div>
                `);
            }

            quill.current.on('text-change', (delta, oldContents, source) => {
                if (source === "api") return;
                newOps.current = newOps.current.compose(delta);
                setContent(quill.current.root.innerHTML); // Update the state with the HTML content
                if (socket.current != null) {
                    debouncedHandleChange(newOps.current, userId);
                }
            });
        }
        createEditor(wrapper);
    }, [content, authorGroupName, chapter]); // eslint-disable-line

    const cancel = () => {
        setIsExpanded(false);
    };

    const publishBook = async () => {
        try {
            // Prepare data for the new chapter, get HTML content from Quill
            const newChapter = {
                chapter_name: chapter.chapter_name,
                chapter_sequence: chapter.chapter_sequence,
                chapter_content: quill.current.root.innerHTML, // Get the HTML content
                chapter_rating: 0,
                chapter_image_url: chapter.chapter_image_url,
                created_on: new Date().toISOString(),
                book_id: bookCreated.book_id
            };

            if (isUpdateChapter.current === false) {
                const response = await axiosInstance.post(`${endpoints.getChapters}`, newChapter, {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                });

                if (response.status === 201) {
                    navigate(`/books/${bookCreated.book_id}/chapters`);
                } else {
                    alert("Failed to create chapter.");
                }
            } else {
                const response = await axiosInstance.patch(`${endpoints.getChapters}/${chapter.chapter_id}`, newChapter, {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                });

                if (response.status === 200) {
                    socket.current.emit("publish", user.account_name);
                    socket.current.disconnect();
                    navigate(`/books/${bookCreated.book_id}/chapters`);
                } else {
                    alert("Failed to update chapter.");
                }
            }
        } catch (error) {
            console.error("Error creating chapter:", error);
            alert("Error creating chapter, try again later.");
        }
    };

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
                            {bookCreated.book_name}
                        </h2>
                        <p className="font-merriweather text-gray-800">
                            <strong>Description:</strong> {bookCreated.summary_text}
                        </p>
                        <p className="font-merriweather text-gray-800">
                            <strong>Author:</strong> {authorGroupName}
                        </p>
                        <p className="font-merriweather text-gray-800">
                            <strong>Created on:</strong> {bookCreated.created_on}
                        </p>
                        <p className="font-merriweather text-gray-800">
                            <strong>Genres:</strong>
                        </p>
                        <div className="flex flex-wrap mb-4">
                            {bookCreated.genres?.map((genre, index) => (
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
                                Save and close
                            </button>
                            <button
                                className="font-merriweather text-white bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 rounded-lg px-4 py-2 transition duration-200 transform hover:scale-105 ml-4"
                                onClick={cancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
