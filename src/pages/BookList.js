import { useEffect, useState } from "react";
import { apiBaseUrl, endpoints } from '../config.js';
import FeaturedSlider from "../components/FeaturedSlider";

const booksToSliderItems = (books) => {
    let newList = []
    for (let i = 0; i < books.length; i++) {
        newList.push({
            id: books[i].book_id,
            imageUrl: books[i].book_image_url,
            heading: books[i].book_name
        })
    }
    return newList
}

export const BookList = () => {
    const [topRatedBook, setTopRatedBooks] = useState([]);
    const [newBooks, setNewBooks] = useState([]);
    const [discoverBooks, setDiscoverBooks] = useState([]);
    useEffect(() =>{
        async function fetchTopRatedBooks() {
            const response = await fetch(`${apiBaseUrl}${endpoints.getTopRatedBooks}`);
            const data = await response.json();
            setTopRatedBooks((data.data.books).filter((book)=>book.is_published))
        }
        fetchTopRatedBooks();
    }, [])
    useEffect(() =>{
        async function fetchTopRatedBooks() {
            const response = await fetch(`${apiBaseUrl}${endpoints.getNewBooks}`);
            const data = await response.json();
            setNewBooks((data.data.books).filter((book)=>book.is_published))
        }
        fetchTopRatedBooks();
    }, [])
    useEffect(() =>{
        async function fetchTopRatedBooks() {
            const response = await fetch(`${apiBaseUrl}${endpoints.getBooks}`);
            const data = await response.json();
            setDiscoverBooks((data.data.books).filter((book)=>book.is_published))
        }
        fetchTopRatedBooks();
    }, [])
    return (
        <main>
            <section className="bg-[#969fac] pb-8">
                <div className="flex justify-center items-center py-4">
                    <p className="text-white text-xl font-semibold px-3 py-1 rounded">
                        Top Rated Books
                    </p>
                </div>
                <FeaturedSlider SliderItems={booksToSliderItems(topRatedBook)} itemType='book'/>
            </section>
            <section className="bg-[#6f7588] pb-8">
                <div className="flex justify-center items-center py-4">
                    <p className="text-white text-xl font-semibold px-3 py-1 rounded">
                        New Books
                    </p>
                </div>
                <FeaturedSlider SliderItems={booksToSliderItems(newBooks)} itemType='book' />
            </section>
            <section className="bg-[#5c5d72] pb-8">
                <div className="flex justify-center items-center py-4" >
                    <p className="text-white text-xl font-semibold px-3 py-1 rounded">
                    Discover Books
                    </p>
                </div>
                <FeaturedSlider SliderItems={booksToSliderItems(discoverBooks)} itemType='book' />
            </section>
        </main>
    );
};
