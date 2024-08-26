const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const apiBaseUrlRoot = process.env.REACT_APP_API_BASE_URL_ROOT;

const endpoints = {
    getBooks: '/books',
    getUsers: '/users',
    authorGroup: '/authorgroup',
    getTopRatedBooks: '/books/top-rated',
    getNewBooks: '/books/latest',
    followBook: '/follow/book',
    bookComments: '/comment/book',
    genres: '/genres',
    getTopRatedGenres: '/genres/top-rated',  // Endpoint to get top-rated genres
    getLatestGenres: '/genres/latest',       // Endpoint to get latest genres
    getTrendingGenres: '/genres/trending',   // Endpoint to get trending genres
    getDiscoverGenres: '/genres/discover',   // Endpoint to get discover genres
    getMostFollowedGenres: '/genres/most-followed',  // Endpoint to get most-followed genres
    isUserFollowingGenre: '/genres/is-following', // Endpoint to check if a user is following a specific genre
    getChapters: '/chapters',  
    getTopRatedChapters: '/chapters/top-rated', 
    getNewChapters: '/chapters/latest'  
};

export { apiBaseUrl, apiBaseUrlRoot, endpoints };
