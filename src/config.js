const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const apiBaseUrlRoot = process.env.REACT_APP_API_BASE_URL_ROOT;
const endpoints = {
  getBooks: '/books',
  getUsers: '/users',
  authorGroup: '/authorgroup',
  getTopRatedBooks: '/books/top-rated',
  getNewBooks: '/books/latest'
  // add more endpoints here
};

export { apiBaseUrl, apiBaseUrlRoot, endpoints };