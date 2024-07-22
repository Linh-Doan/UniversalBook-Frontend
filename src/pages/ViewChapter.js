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
import ZoomInIcon from "../assets/zoom-in.png";
import ZoomOutIcon from "../assets/zoom-out.png";
import BlueLightIcon from "../assets/lightbulb.png";
import FullscreenIcon from "../assets/fullscreen.png";

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

const fetchWordDetails = async (word) => {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (response.ok) {
        const data = await response.json();
        const { definition, example, partOfSpeech } = data[0].meanings[0].definitions[0];
        return { definition, example, partOfSpeech };
    } else {
        return { definition: "No definition found.", example: "", partOfSpeech: "" };
    }
};

const fetchTranslation = async (word) => {
    // Replace this with a call to a real translation API
    return { translation: `${word} translated` };
};

export const ViewChapter = () => {
    const { id } = useParams();
    const chapter = Chapters.find(chapter => chapter.id === parseInt(id));
    const [showPopup, setShowPopup] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [blueLightFilter, setBlueLightFilter] = useState(false);
    const [firstZoomDone, setFirstZoomDone] = useState(false);
    const [highlightedWord, setHighlightedWord] = useState("");
    const [wordDetails, setWordDetails] = useState({ definition: "", example: "", partOfSpeech: "" });
    const [translation, setTranslation] = useState("");
    const [showMeaningPopup, setShowMeaningPopup] = useState(false);
    const [showDictionaryPopup, setShowDictionaryPopup] = useState(false);
    const [showTranslatePopup, setShowTranslatePopup] = useState(false);
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

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

    useEffect(() => {
        const handleTextSelection = (event) => {
            const selectedText = window.getSelection().toString().trim();
            if (selectedText) {
                const range = window.getSelection().getRangeAt(0).getBoundingClientRect();
                setHighlightedWord(selectedText);
                setContextMenuPosition({ x: range.left + window.scrollX, y: range.top + window.scrollY });
                setShowContextMenu(true);
            } else {
                setShowContextMenu(false);
            }
        };

        document.addEventListener('mouseup', handleTextSelection);

        return () => {
            document.removeEventListener('mouseup', handleTextSelection);
        };
    }, []);

    const handleZoomIn = () => {
        if (!firstZoomDone) {
            setZoomLevel(prevZoom => Math.min(prevZoom + 0.7, 3));
            setFirstZoomDone(true);
        } else {
            setZoomLevel(prevZoom => Math.min(prevZoom + 0.1, 3));
        }
    };

    const handleZoomOut = () => {
        setZoomLevel(prevZoom => Math.max(prevZoom - 0.1, 0.5));
        setFirstZoomDone(true);
    };

    const handleResetZoom = () => {
        setZoomLevel(1);
        setFirstZoomDone(false);
    };

    const toggleBlueLightFilter = () => {
        setBlueLightFilter(prevState => !prevState);
    };

    const handleFullscreen = () => {
        const elem = document.querySelector('.prevent-screenshot');
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { // Firefox
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, and Opera
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { // IE/Edge
            elem.msRequestFullscreen();
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
                document.querySelector('.prevent-screenshot').classList.add('fullscreen');
            } else {
                document.querySelector('.prevent-screenshot').classList.remove('fullscreen');
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('msfullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('msfullscreenchange', handleFullscreenChange);
        };
    }, []);

    const fetchAndShowWordDetails = async () => {
        const details = await fetchWordDetails(highlightedWord);
        setWordDetails(details);
        setShowDictionaryPopup(true);
        setShowContextMenu(false);
    };

    const fetchAndShowTranslation = async () => {
        const translation = await fetchTranslation(highlightedWord);
        setTranslation(translation.translation);
        setShowTranslatePopup(true);
        setShowContextMenu(false);
    };

    const closeMeaningPopup = () => {
        setShowMeaningPopup(false);
    };

    const closeDictionaryPopup = () => {
        setShowDictionaryPopup(false);
    };

    const closeTranslatePopup = () => {
        setShowTranslatePopup(false);
    };

    const closeContextMenu = () => {
        setShowContextMenu(false);
    };

    return (
        <div className="min-h-screen p-8" style={{ backgroundColor: '#555555' }}>
            {showPopup && (
                <div className="popup-notification">
                    <p>No screenshots allowed!</p>
                </div>
            )}
            {showMeaningPopup && (
                <div className="meaning-popup">
                    <button className="close-popup" onClick={closeMeaningPopup}>&times;</button>
                    <div className="meaning-popup-content">
                        <p><strong>{highlightedWord}:</strong> {wordDetails.definition}</p>
                        {wordDetails.partOfSpeech && <p><strong>Part of Speech:</strong> {wordDetails.partOfSpeech}</p>}
                        {wordDetails.example && <p><strong>Example:</strong> {wordDetails.example}</p>}
                    </div>
                </div>
            )}
            {showDictionaryPopup && (
                <div className="dictionary-popup">
                    <button className="close-popup" onClick={closeDictionaryPopup}>&times;</button>
                    <div className="dictionary-popup-content">
                        <p><strong>{highlightedWord}:</strong> {wordDetails.definition}</p>
                        {wordDetails.partOfSpeech && <p><strong>Part of Speech:</strong> {wordDetails.partOfSpeech}</p>}
                        {wordDetails.example && <p><strong>Example:</strong> {wordDetails.example}</p>}
                    </div>
                </div>
            )}
            {showTranslatePopup && (
                <div className="translate-popup">
                    <button className="close-popup" onClick={closeTranslatePopup}>&times;</button>
                    <div className="translate-popup-content">
                        <p><strong>{highlightedWord}:</strong> {translation}</p>
                    </div>
                </div>
            )}
            {showContextMenu && (
                <div className="context-menu" style={{ top: `${contextMenuPosition.y}px`, left: `${contextMenuPosition.x}px`, zIndex: 1000 }}>
                    <button className="close-popup" onClick={closeContextMenu}>&times;</button>
                    <div className="context-menu-content">
                        <button onClick={fetchAndShowWordDetails}>Dictionary</button>
                        <button onClick={fetchAndShowTranslation}>Translate</button>
                    </div>
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
                <button onClick={handleFullscreen} className="zoom-button fullscreen-button" title="Fullscreen">
                    <img src={FullscreenIcon} alt="Fullscreen" className="zoom-icon" />
                </button>
            </div>
        </div>
    );
};

// CSS for the popup notification, zoom buttons, blue light filter, fullscreen button, context menu, and centered meaning popup
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

.meaning-popup, .dictionary-popup, .translate-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 20px;
    border-radius: 5px;
    z-index: 1000;
    font-size: 16px;
    width: 600px;
    max-width: 90%;
    height: 200px;
    max-height: 60%;
    overflow-y: auto;
}

.meaning-popup .close-popup, .dictionary-popup .close-popup, .translate-popup .close-popup {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    outline: none;
}

.meaning-popup .close-popup:hover, .dictionary-popup .close-popup:hover, .translate-popup .close-popup:hover {
    color: #ff0000;
}

.meaning-popup-content, .dictionary-popup-content, .translate-popup-content {
    max-height: 140px; 
    overflow-y: auto;
}

.context-menu {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 20px;
    border-radius: 5px;
    z-index: 1000;
    font-size: 16px;
    width: 200px;
}

.context-menu .close-popup {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    outline: none;
}

.context-menu .close-popup:hover {
    color: #ff0000;
}

.context-menu-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.context-menu-content button {
    background: none;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
    text-align: left;
    color: white;
    background-color: #007bff;
    border-radius: 5px;
}

.context-menu-content button:hover {
    background-color: #0056b3;
}

.zoom-buttons {
    position: fixed;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 1000;
}

.zoom-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 24px;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.zoom-icon {
    width: 24px;
    height: 24px;
}

.zoom-button.reset-button {
    font-size: 14px;
}

.zoom-button.blue-light-button {
    font-size: 14px;
    background-color: #007bff;
}

.zoom-button.fullscreen-button {
    font-size: 14px;
    background-color: #007bff;
}

.zoom-button:hover {
    background-color: #0056b3;
}

.blue-light-filter {
    filter: sepia(1) brightness(1) contrast(1);
}

.prevent-screenshot {
    overflow: hidden;
}

.prevent-screenshot.fullscreen {
    overflow-y: auto;
    max-height: 100vh;
}
`;
document.head.appendChild(popupStyle);
