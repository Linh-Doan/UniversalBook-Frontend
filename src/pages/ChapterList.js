import { useEffect, useState } from "react";
import { apiBaseUrl, endpoints } from '../config.js';
import FeaturedSlider from "../components/FeaturedSlider";

const chaptersToSliderItems = (chapters) => {
    let newList = [];
    for (let i = 0; i < chapters.length; i++) {
        newList.push({
            id: chapters[i].chapter_id,
            bookId: chapters[i].book_id,
            imageUrl: chapters[i].chapter_image_url,
            heading: `Chapter ${chapters[i].chapter_sequence}: ${chapters[i].chapter_name || 'Untitled'}`
        });
    }
    return newList;
};


export const ChapterList = () => {
    const [topRatedChapters, setTopRatedChapters] = useState([]);
    const [newChapters, setNewChapters] = useState([]);
    const [discoverChapters, setDiscoverChapters] = useState([]);

    useEffect(() => {
        const fetchChapters = async (endpoint, setChapters) => {
            try {
                const response = await fetch(`${apiBaseUrl}${endpoint}`);
                const data = await response.json();
                setChapters(data.data.chapters);
            } catch (error) {
                console.error('Failed to fetch chapters:', error);
            }
        };

       fetchChapters(endpoints.getTopRatedChapters, setTopRatedChapters);
       fetchChapters(endpoints.getNewChapters, setNewChapters);
       fetchChapters(endpoints.getChapters, setDiscoverChapters);
    }, []);

    return (
        <main>
            <section className="bg-[#969fac] pb-8">
                <div className="flex justify-center items-center py-4">
                    <p className="text-white text-xl font-semibold px-3 py-1 rounded">
                        Top Rated Chapters
                    </p>
                </div>
                <FeaturedSlider SliderItems={chaptersToSliderItems(topRatedChapters)} itemType='chapter' />
            </section>
            <section className="bg-[#6f7588] pb-8">
                <div className="flex justify-center items-center py-4">
                    <p className="text-white text-xl font-semibold px-3 py-1 rounded">
                        New Chapters
                    </p>
                </div>
                <FeaturedSlider SliderItems={chaptersToSliderItems(newChapters)} itemType='chapter' />
            </section>
            <section className="bg-[#5c5d72] pb-8">
                <div className="flex justify-center items-center py-4">
                    <p className="text-white text-xl font-semibold px-3 py-1 rounded">
                        Discover Chapters
                    </p>
                </div>
                <FeaturedSlider SliderItems={chaptersToSliderItems(discoverChapters)} itemType='chapter' />
            </section>
        </main>
    );
};
