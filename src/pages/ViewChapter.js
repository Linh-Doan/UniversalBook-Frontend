import React, { useEffect, useState } from 'react';
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

const Chapters = [
    { id: 1, imageUrl: Book4, content: "Content of Chapter 1..." },
    { id: 2, imageUrl: Book5, content: "Content of Chapter 2..." },
    { id: 3, imageUrl: Book6, content: "Content of Chapter 3..." },
    { id: 4, imageUrl: Book7, content: "Content of Chapter 4..." },
    { id: 5, imageUrl: Book8, content: "Content of Chapter 5..." },
    { id: 6, imageUrl: Book9, content: "Content of Chapter 6..." },
    { id: 7, imageUrl: Book10, content: "Content of Chapter 7..." },
    { id: 8, imageUrl: Book11, content: "Content of Chapter 8..." },
    { id: 9, imageUrl: Book12, content: "Content of Chapter 9..." },
    { id: 10, imageUrl: Book13, content: "Content of Chapter 10..." },
];

export const ViewChapter = () => {
    const { id } = useParams();
    const chapter = Chapters.find(chapter => chapter.id === parseInt(id));
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        // Disable right-click
        const handleContextMenu = (event) => {
            event.preventDefault();
        };
        document.addEventListener('contextmenu', handleContextMenu);

        // Disable PrintScreen and screenshot shortcuts
        const handleKeyDown = (event) => {
            if (event.key === 'PrintScreen' || (event.ctrlKey && event.shiftKey && event.key === 'S')) {
                event.preventDefault();
                showNotification();
            }
              if (event.key === 'PrintScreen' || (event.ctrlKey && event.shiftKey && event.key === 'S')) {
                event.preventDefault();
                showNotification();
            }
            if ((event.key === 'I' && event.ctrlKey && event.shiftKey) || event.key === 'F12') {
                event.preventDefault();
                showNotification();
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        // Repeatedly clear clipboard content
        const clipboardInterval = setInterval(() => {
            navigator.clipboard.writeText('').catch(err => console.error('Clipboard access error:', err));
        }, 300);

        const showNotification = () => {
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 2000);
        };

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
            clearInterval(clipboardInterval);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8" style={{ backgroundColor: '#555555' }}>
            {showPopup && (
                <div className="popup-notification">
                    <p>No screenshots allowed!</p>
                </div>
            )}
            <div className="bg-white p-8 rounded shadow-lg max-w-4xl mx-auto prevent-screenshot">
                <h1 className="text-3xl font-bold mb-4">View Chapter</h1>
                {chapter ? (
                    <>
                        <img src={chapter.imageUrl} alt={`Chapter ${id}`} className="w-full h-auto object-cover mb-4 rounded" />
                        <p>{chapter.content}</p>
                    </>
                ) : (
                    <p>Chapter content not found.</p>
                )}
            </div>
        </div>
    );
};

// CSS for the popup notification
const popupStyle = document.createElement('style');
popupStyle.innerHTML = `
.popup-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    z-index: 1000;
    font-size: 16px;
}
`;
document.head.appendChild(popupStyle);
