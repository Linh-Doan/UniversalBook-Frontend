import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SliderItem } from '../components';
import { apiBaseUrl, endpoints } from '../config.js';

const tabs = [
    {
        tabDisplay: 'Books',
        category: 'books',
    },
    {
        tabDisplay: 'Chapters',
        category: 'chapters',
    },
    {
        tabDisplay: 'Genres',
        category: 'genres',
    },
    {
        tabDisplay: 'People',
        category: 'people', // Only if implemented on the backend
    },
];

export const SearchResults = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [searchParams] = useSearchParams();
    const queryTerm = searchParams.get("q");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const inactiveClass = "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300";
    const activeClass = "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active";

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            setError(null);
            try {
                const category = tabs[activeTab].category;
                const response = await fetch(`${apiBaseUrl}${endpoints.search}?q=${queryTerm}&category=${category}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Search Results:', data.results);
                setResults(data.results || []);
            } catch (error) {
                console.error('Failed to fetch search results:', error);
                setError('Failed to fetch search results.');
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [queryTerm, activeTab]);

    const filteredResults = results.filter(item => {
        if (tabs[activeTab].category === 'books') {
            return item.book_name;
        } else if (tabs[activeTab].category === 'chapters') {
            return item.chapter_name;
        } else if (tabs[activeTab].category === 'genres') {
            return item.genre_name && item.genre_image_url;
        } else if (tabs[activeTab].category === 'people') {
            return item.person_name && item.person_image_url;
        }
        return false;
    });

    return (
        <main className="flex flex-col items-start w-full md:w-3/4 mx-auto sm:px-4 px-6">
            <section className="py-7 w-full">
                <p className="text-2xl text-gray-700">
                    {loading
                        ? `Searching for '${queryTerm}'...`
                        : filteredResults.length === 0
                        ? `No result found for '${queryTerm}'`
                        : `Results for '${queryTerm}'`}
                </p>
            </section>
            <div className="text-sm font-medium text-left text-gray-500 border-b border-gray-200 w-full mt-4 overflow-x-auto overflow-y-hidden">
                <ul className="flex space-x-4 -mb-px">
                    {tabs.map((item, index) => (
                        <li key={item.tabDisplay}>
                            <button
                                type="button"
                                className={index === activeTab ? activeClass : inactiveClass}
                                onClick={() => setActiveTab(index)}
                            >
                                {item.tabDisplay}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <section className="py-7 w-full">
                <div className="flex flex-wrap gap-4">
                    {loading ? (
                        <p className="text-large text-gray-700">Loading...</p>
                    ) : error ? (
                        <p className="text-large text-red-500">{error}</p>
                    ) : filteredResults.length === 0 ? (
                        <p className="text-large text-gray-700">{`No ${tabs[activeTab].tabDisplay.toLowerCase()} results found`}</p>
                    ) : (
                        filteredResults.map((item) => (
                            <SliderItem
                                key={item.book_id || item.chapter_id || item.genre_id || item.person_id}
                                imageUrl={item.book_image_url || item.chapter_image_url || item.genre_image_url || item.person_image_url}
                                title={item.book_name || item.chapter_name || item.genre_name || item.person_name}
                                description={item.summary_text || item.person_description || ""}
                            />
                        ))
                    )}
                </div>
            </section>
        </main>
    );
};
