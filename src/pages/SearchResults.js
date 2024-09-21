import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SliderItem } from '../components'; // Ensure this is correctly imported from your components directory
import { apiBaseUrl, endpoints } from '../config.js'; // Make sure these are correctly set up in your config file

// Define categories and tabs for search
const tabs = [
  { tabDisplay: 'Books', category: 'books' },
  { tabDisplay: 'Chapters', category: 'chapters' },
  { tabDisplay: 'Genres', category: 'genres' },
  { tabDisplay: 'Groups', category: 'people' },
];

export const SearchResults = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchParams] = useSearchParams();
  const queryTerm = searchParams.get('q'); // Retrieves the search query from the URL parameters
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Class names for active and inactive tabs
  const inactiveClass = 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300';
  const activeClass = 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active';

  // Fetch search results based on the query and active tab
  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const category = tabs[activeTab].category;
        console.log(`Fetching search results for category: ${category} with query: ${queryTerm}`);

        // Fetch search results from the backend API
        const response = await fetch(`${apiBaseUrl}${endpoints.search}?q=${queryTerm}&category=${category}`);
        console.log('API Request URL:', `${apiBaseUrl}${endpoints.search}?q=${queryTerm}&category=${category}`);

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched Search Results:', data.results);
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

  // Filter results based on the current active tab
  const filteredResults = results.filter((item) => {
    console.log('Filtering results for category:', tabs[activeTab].category);

    if (tabs[activeTab].category === 'books') {
      return item.book_name;
    } else if (tabs[activeTab].category === 'chapters') {
      return item.chapter_name;
    } else if (tabs[activeTab].category === 'genres') {
      return item.genre_name && item.genre_image_url;
    } else if (tabs[activeTab].category === 'people') {
      return item.author_group_name; // Adjusted to display groups under People tab
    }
    return false;
  });

  console.log('Filtered Results:', filteredResults);

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
                onClick={() => {
                  console.log(`Switching to tab: ${item.tabDisplay}`);
                  setActiveTab(index);
                }}
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
          ) : activeTab === 3 ? ( // Check if the active tab is "People"
            <ol className="list-decimal list-inside">
              {filteredResults.map((item, index) => (
                <li key={item.author_group_id}>
                  <a
                    href={`/group/${item.author_group_id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {item.author_group_name}
                  </a>
                </li>
              ))}
            </ol>
          ) : (
            filteredResults.map((item) => {
              // Generate the correct onClickUrl based on the type of item
              let onClickUrl = '';
              if (tabs[activeTab].category === 'books') {
                onClickUrl = `/books/${item.book_id}`; // Link to book details page
                console.log(`Generated link for book: ${onClickUrl}`);
              } else if (tabs[activeTab].category === 'chapters') {
                onClickUrl = `/chapters/${item.chapter_id}`; // Link to chapter reading page
                console.log(`Generated link for chapter: ${onClickUrl}`);
              } else if (tabs[activeTab].category === 'genres') {
                onClickUrl = `/genres/${item.genre_id}`; // Link to genre details page
                console.log(`Generated link for genre: ${onClickUrl}`);
              }

              return (
                <SliderItem
                  key={item.book_id || item.chapter_id || item.genre_id || item.author_group_id}
                  imageUrl={
                    item.book_image_url ||
                    item.chapter_image_url ||
                    item.genre_image_url ||
                    item.author_group_image_url // Assuming groups might have images too
                  }
                  heading={item.book_name || item.chapter_name || item.genre_name || item.author_group_name}
                  onClickUrl={onClickUrl} // Passes the correct link to navigate to the appropriate page
                />
              );
            })
          )}
        </div>
      </section>
    </main>
  );
};

export default SearchResults;
