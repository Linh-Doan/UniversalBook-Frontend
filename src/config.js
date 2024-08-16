const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const apiBaseUrlRoot = process.env.REACT_APP_API_BASE_URL_ROOT;

const endpoints = {
  getBooks: '/books',
  getTopRatedBooks: '/books/top-rated',
  getNewBooks: '/books/latest',
  getChapters: '/chapters',  // New endpoint for fetching all chapters
  getTopRatedChapters: '/chapters/top-rated',  // New endpoint for top-rated chapters
  getNewChapters: '/chapters/latest'  // New endpoint for latest chapters
};

export { apiBaseUrl, apiBaseUrlRoot, endpoints };
