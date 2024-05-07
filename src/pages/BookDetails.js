import React, { useState } from 'react';
import FeaturedSlider from "../components/FeaturedSlider";
import { useParams } from 'react-router-dom'
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
    {
        id: 1,
        imageUrl: Book4,
    },
    {
        id: 2,
        imageUrl: Book5,
    },
    {
        id: 3,
        imageUrl: Book6,
    },
    {
        id: 4,
        imageUrl: Book7,
    },
    {
        id: 5,
        imageUrl: Book8,
    },
    {
        id: 6,
        imageUrl: Book9,
    },
    {
        id: 7,
        imageUrl: Book10,
    },
    {
        id: 8,
        imageUrl: Book11,
    },
    {
        id: 9,
        imageUrl: Book12,
    },
    {
        id: 10,
        imageUrl: Book13,
    },
];

export const BookDetails = () => {
    const { id } = useParams();
    const chapter = Chapters.find(chapter => chapter.id === parseInt(id));

    return (
        <main className="bg-[#515375]">
            <div className="flex justify-center items-center h-full">
                {chapter ? (
                    // Display the book details
                    <div className="mr-2">
                        <img
                            src={chapter.imageUrl}
                            alt={`Book ${id}`}
                            style={{ maxWidth: '400px', maxHeight: '400px' }} // Adjust the values as needed
                        />
                        {/* Add more details as needed */}
                    </div>


                ) : (
                    <p>Book details page</p>
                )}
            </div>

            <div className="flex justify-center items-center my-4">
                <p className="text-white text-xl font-semibold px-3 py-1 rounded">
                    Book summary: sagjha gkjhlfijgyfiugj aeori apyoei nga;ejyg p9arngh;aoegy pd9fng aei;rjg h9ng [azoghapoing - ighaoig ynpdiubhdflkjb hsdfiub lxkbnkv h9udh]
                    s dljh dfnjsjdfhgal kdfn                </p>
            </div>

            <div className="flex justify-center items-center my-4">
                <p className="text-white text-xl font-semibold px-3 py-1 rounded">
                    Chapter List
                </p>
            </div>

            <div className="px-16">
                <FeaturedSlider SliderItems={Chapters} />
            </div>

            <br></br>
            <br></br>
            <div className="flex justify-center items-center h-full">
                <div className="checkboxes">


                    <button
                        className="btn-create-chapter mt-4"
                        style={{
                            fontSize: '1.5rem',
                            backgroundColor: '#4CAF50',
                            border: 'none',
                            color: 'white',
                            padding: '15px 32px',
                            textAlign: 'center',
                            textDecoration: 'none',
                            display: 'inline-block'
                        }}
                    >
                        Create Chapter
                    </button>


                    <div>
                        <label style={{ fontSize: '25px' }}>
                            <input type="checkbox" style={{ width: '24px', height: '24px' }} /> Like Book
                        </label>
                    </div>
                    <div>
                        <label style={{ fontSize: '25px' }}>
                            <input type="checkbox" style={{ width: '24px', height: '24px' }} /> Follow Book
                        </label>
                    </div>
                    <div>
                        <label style={{ fontSize: '25px' }}>
                            <input type="checkbox" style={{ width: '24px', height: '24px' }} /> Follow Author
                        </label>
                    </div>
                </div>


            </div>

        </main>
    );
}



