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
import ZoomInIcon from "../assets/zoom-in.png"; // Import your custom zoom-in icon
import ZoomOutIcon from "../assets/zoom-out.png"; // Import your custom zoom-out icon
import BlueLightIcon from "../assets/lightbulb.png"; // Import your custom blue light filter icon

const Chapters = [
    { id: 1, imageUrl: Book4, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Chapter 1 content goes here..." },
    { id: 2, imageUrl: Book5, content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Chapter 2 content goes here..." },
    { id: 3, imageUrl: Book6, content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Chapter 3 content goes here..." },
    { id: 4, imageUrl: Book7, content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Chapter 4 content goes here..." },
    { id: 5, imageUrl: Book8, content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Chapter 5 content goes here..." },
    { id: 6, imageUrl: Book9, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Chapter 6 content goes here..." },
    { id: 7, imageUrl: Book10, content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Chapter 7 content goes here..." },
    { id: 8, imageUrl: Book11, content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Chapter 8 content goes here..." },
    { id: 9, imageUrl: Book12, content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Chapter 9 content goes here..." },
    { id: 10, imageUrl: Book13, content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Chapter 10 content goes here..." },
];

export const ViewChapter = () => {
    const { id } = useParams();
    const chapter = Chapters.find(chapter => chapter.id === parseInt(id));
    const [showPopup, setShowPopup] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [blueLightFilter, setBlueLightFilter] = useState(false);
    const [firstZoomDone, setFirstZoomDone] = useState(false);

    useEffect(() => {
        const handleContextMenu = (event) => {
            event.preventDefault();
        };
        document.addEventListener('contextmenu', handleContextMenu);

        const handleKeyDown = (event) => {
            const winShiftS = event.key === 'S' && event.shiftKey && event.metaKey;
            const prohibitedKeys = ['PrintScreen', 'I', 'F12'];
            const ctrlShiftCombos = event.ctrlKey && event.shiftKey && (event.key === 'S' || event.key === 'I');

            if (event.key === 'PrintScreen' || winShiftS || prohibitedKeys.includes(event.key) || ctrlShiftCombos) {
                event.preventDefault();
                showNotification();
            }
        };
        document.addEventListener('keydown', handleKeyDown);

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

    const handleZoomIn = () => {
        if (!firstZoomDone) {
            setZoomLevel(prevZoom => Math.min(prevZoom + 0.7, 3)); // Increase by 0.7 for the first click
            setFirstZoomDone(true); // Mark that the significant zoom has occurred
        } else {
            setZoomLevel(prevZoom => Math.min(prevZoom + 0.1, 3)); // Normal zoom increment for subsequent clicks
        }
    };

    const handleZoomOut = () => {
        setZoomLevel(prevZoom => Math.max(prevZoom - 0.1, 0.5));
        setFirstZoomDone(true); // Allow normal increments on zoom out as well
    };

    const handleResetZoom = () => {
        setZoomLevel(1);
        setFirstZoomDone(false); // Reset zoom to initial state
    };

    const toggleBlueLightFilter = () => {
        setBlueLightFilter(prevState => !prevState);
    };

    return (
        <div className="min-h-screen p-8" style={{ backgroundColor: '#555555' }}>
            {showPopup && (
                <div className="popup-notification">
                    <p>No screenshots allowed!</p>
                </div>
            )}
            <div className={`bg-white p-8 rounded shadow-lg max-w-4xl mx-auto prevent-screenshot ${blueLightFilter ? 'blue-light-filter' : ''}`} style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}>
                {chapter ? (
                    <>
                        <img src={chapter.imageUrl} alt={`Chapter ${id}`} className="w-full h-auto object-cover mb-4 rounded" />
                        <p>{chapter.content}</p>
                    </>
                ) : (
                    <p>Chapter content not found.</p>
                )}
            </div>
            <div className="zoom-buttons">
                <button onClick={handleZoomIn} className="zoom-button" title="Zoom In">
                    <img src={ZoomInIcon} alt="Zoom In" className="zoom-icon" />
                </button>
                <button onClick={handleZoomOut} className="zoom-button" title="Zoom Out">
                    <img src={ZoomOutIcon} alt="Zoom Out" className="zoom-icon" />
                </button>
                <button onClick={handleResetZoom} className="zoom-button reset-button">Reset Zoom</button>
                <button onClick={toggleBlueLightFilter} className="zoom-button blue-light-button" title="Blue Light Filter">
                    <img src={BlueLightIcon} alt="Blue Light Filter" className="zoom-icon" />
                </button>
            </div>
        </div>
    );
};

// CSS for the popup notification, zoom buttons, and blue light filter
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

.zoom-buttons {
    position: fixed;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.zoom-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 24px; /* Increase font size for + and - signs */
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.zoom-icon {
    width: 24px; /* Adjust icon size */
    height: 24px; /* Adjust icon size */
}

.zoom-button.reset-button {
    font-size: 14px; /* Smaller font size for Reset Zoom button */
}

.zoom-button.blue-light-button {
    font-size: 14px; /* Smaller font size for Blue Light Filter button */
    background-color: #007bff; /* Different color for Blue Light Filter button */
}

.zoom-button:hover {
    background-color: #0056b3;
}

.blue-light-filter {
    filter: sepia(1) brightness(1) contrast(1);
}
`;
document.head.appendChild(popupStyle);
