import { useEffect, useState } from "react";
import { apiBaseUrl, endpoints } from '../config.js';
import FeaturedSlider from "../components/FeaturedSlider";

const genresToSliderItems = (genres) => {
    return genres.map(genre => ({
        id: genre.genre_id,
        imageUrl: genre.genre_image_url,
        heading: genre.genre_name
    }));
};

export const GenreList = () => {
    const [topRatedGenres, setTopRatedGenres] = useState([]);
    const [latestGenres, setLatestGenres] = useState([]);
    const [trendingGenres, setTrendingGenres] = useState([]);
    const [discoverGenres, setDiscoverGenres] = useState([]);

    useEffect(() => {
        async function fetchTopRatedGenres() {
            const response = await fetch(`${apiBaseUrl}${endpoints.getTopRatedGenres}`);
            const data = await response.json();
            setTopRatedGenres(data.data.genres);
        }
        fetchTopRatedGenres();
    }, []);

    useEffect(() => {
        async function fetchLatestGenres() {
            const response = await fetch(`${apiBaseUrl}${endpoints.getLatestGenres}`);
            const data = await response.json();
            setLatestGenres(data.data.genres);
        }
        fetchLatestGenres();
    }, []);

    useEffect(() => {
        async function fetchTrendingGenres() {
            const response = await fetch(`${apiBaseUrl}${endpoints.getTrendingGenres}`);
            const data = await response.json();
            setTrendingGenres(data.data.genres);
        }
        fetchTrendingGenres();
    }, []);

    useEffect(() => {
        async function fetchDiscoverGenres() {
            const response = await fetch(`${apiBaseUrl}${endpoints.getDiscoverGenres}`);
            const data = await response.json();
            setDiscoverGenres(data.data.genres);
        }
        fetchDiscoverGenres();
    }, []);

    return (
        <main>
            <section className="bg-[#969fac] pb-8">
                <div className="flex justify-center items-center py-4">
                    <p className="text-white text-xl font-semibold px-3 py-1 rounded">
                        Top Rated Genres
                    </p>
                </div>
                <FeaturedSlider SliderItems={genresToSliderItems(topRatedGenres)} itemType='genre'/>
            </section>
            <section className="bg-[#6f7588] pb-8">
                <div className="flex justify-center items-center py-4">
                    <p className="text-white text-xl font-semibold px-3 py-1 rounded">
                        Latest Genres
                    </p>
                </div>
                <FeaturedSlider SliderItems={genresToSliderItems(latestGenres)} itemType='genre'/>
            </section>
            <section className="bg-[#5c5d72] pb-8">
                <div className="flex justify-center items-center py-4">
                    <p className="text-white text-xl font-semibold px-3 py-1 rounded">
                        Trending Genres
                    </p>
                </div>
                <FeaturedSlider SliderItems={genresToSliderItems(trendingGenres)} itemType='genre'/>
            </section>
            <section className="bg-[#6781a1] pb-8">
                <div className="flex justify-center items-center py-4">
                    <p className="text-white text-xl font-semibold px-3 py-1 rounded">
                        Discover Genres
                    </p>
                </div>
                <FeaturedSlider SliderItems={genresToSliderItems(discoverGenres)} itemType='genre'/>
            </section>
        </main>
    );
};
