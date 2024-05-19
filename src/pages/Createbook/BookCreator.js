import { Link } from 'react-router-dom';

export const BookCreator = () => {
  return (
    <div className="bookcreator">
        <p>abc</p>
        <Link to="/bookeditor" className="my-5">
            <button type="button" className="my-5 py-4 px-5 me-2 mb-2 text-lg font-medium text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">GET STARTED</button>
        </Link>
    </div>
  )
}
