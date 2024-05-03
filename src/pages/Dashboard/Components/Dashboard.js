import {  Link } from "react-router-dom";
import UserProfile from "../../../assets/userProfile.png"
import FeaturedSlider from "../../../components/FeaturedSlider";
import Book4 from "../../../assets/book4.jpg";
import Book5 from "../../../assets/book5.jpg";
import Book6 from "../../../assets/book6.jpg";
const books = [
    {
      id: 1,
      imageUrl: Book4, 
    },
    {
      id: 2,
      imageUrl: Book5, 
    },
    {
      id: 3,
      imageUrl: Book6, 
    }
  ];
export const Dashboard = () => {
  return (
    <>
			<div className="bg-gray-100 border border-gray-200 rounded-lg">
					<div className="flex justify-end px-4 pt-4">
							<button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
									<span className="sr-only">Open dropdown</span>
									<svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
											<path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
									</svg>
							</button>
							{/* <!-- Dropdown menu --> */}
							<div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
									<ul className="py-2" aria-labelledby="dropdownButton">
									<li>
											<Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</Link>
									</li>
									<li>
											<Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</Link>
									</li>
									<li>
											<Link to="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</Link>
									</li>
									</ul>
							</div>
					</div>
					<div className="flex flex-row justify-between items-end pb-10 w-4/5 mx-auto">
						<div className="flex flex-col items-center">
								<img className="w-40 h-40 mb-3 rounded-full shadow-lg" src={UserProfile} alt="User profile" />
								<h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
								<span className="text-sm text-gray-500 dark:text-gray-400">3.9M followers • 155 following</span>
						</div>
						<div className="flex flex-row mt-4 md:mt-6 pr-10">
								{/* <Link to="#" className="inline-flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Follow</Link>
								<Link to="#" className="inline-flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 ">Message</Link> */}
								<Link to="#" className="inline-flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 ">Edit intro</Link>
						</div>
				</div>
			</div>
			<div>
				<div className="flex flex-row justify-between items-center">
					<h2 className="px-3 py-4 text-xl">Books</h2>
					<Link to="#" className="inline-flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Create book</Link>
				</div>
				
				<div className="px-3 w-full">  
					{/* <FeaturedSlider SliderItems={books} /> */}
				</div>
			</div>

			<div>
				<div className="flex flex-row justify-between items-center">
					<h2 className="px-3 py-4 text-xl" >Groups</h2>
					<Link to="#" className="inline-flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Create group</Link>
				</div>
					{/* <FeaturedSlider SliderItems={books} /> */}
			</div>
			<div>
				<h2 className="px-3 py-4 text-xl" >Following</h2>
					{/* <FeaturedSlider SliderItems={books} /> */}
			</div>
			<div>
			<h2 className="px-3 py-4 text-xl" >Followers</h2>
					{/* <FeaturedSlider SliderItems={books} /> */}
			</div>
    </>
    
  )
}
