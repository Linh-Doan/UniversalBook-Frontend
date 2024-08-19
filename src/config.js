const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const apiBaseUrlRoot = process.env.REACT_APP_API_BASE_URL_ROOT;

const endpoints = {
  getBooks: '/books',
  getTopRatedBooks: '/books/top-rated',
  getNewBooks: '/books/latest',
  getChapters: '/chapters',  
  getTopRatedChapters: '/chapters/top-rated', 
  getNewChapters: '/chapters/latest'  
};

export { apiBaseUrl, apiBaseUrlRoot, endpoints };
