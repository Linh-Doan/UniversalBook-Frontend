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
				<div className="flex flex-row justify-between items-end py-10 w-4/5 mx-auto">
					<div className="flex flex-col items-center">
						<img className="w-40 h-40 mb-3 rounded-full shadow-lg" src={UserProfile} alt="User profile" />
						<h5 className="mb-1 text-xl font-medium text-gray-900">Bonnie Green</h5>
						<span className="text-sm text-gray-500">3.9M followers • 155 following</span>
					</div>
					<div className="flex flex-row mt-4 md:mt-6 pr-10">
						{/* <Link to="#" className="inline-flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Follow</Link>
						<Link to="#" className="inline-flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Message</Link> */}
						<Link to="#" className="inline-flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Edit intro</Link>
					</div>
			</div>
			</div>
			<div>
				<div className="flex flex-row justify-between items-center">
					<h2 className="px-3 py-4 text-xl">Books</h2>
					<Link to="#" className="inline-flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">Create book</Link>
				</div>
				
				<div className="px-3 w-full">  
					{/* <FeaturedSlider SliderItems={books} /> */}
				</div>
			</div>

			<div>
				<div className="flex flex-row justify-between items-center">
					<h2 className="px-3 py-4 text-xl" >Groups</h2>
					<Link to="#" className="inline-flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Create group</Link>
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
