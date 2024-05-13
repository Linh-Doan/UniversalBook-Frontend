import {  Link } from "react-router-dom";
import FeaturedSlider from "../../components/FeaturedSlider";
import Book4 from "../../assets/book4.jpg";
import Book5 from "../../assets/book5.jpg";
import Book6 from "../../assets/book6.jpg";
import GroupImg from "../../assets/GroupImage.jpeg"
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
export const GroupDashboard = () => {
  return (
    <div className="mx-auto px-8">
			<div className="border border-gray-200 rounded-lg w-full">
				<img className="object-cover w-full h-[50vh]" src={GroupImg} alt="Group Image"></img>
				<div className="flex flex-row justify-between items-end py-6 px-16 mx-auto">
					<div className="flex flex-col">
						<h5 className="text-xl font-medium text-gray-900">Scribble Squad</h5>
						<span className="text-sm text-gray-500">1234 members</span>
					</div>
					<div className="flex flex-row mt-4 md:mt-6 pr-10">
						<Link to="#" className="inline-flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Join group</Link>
						<Link to="#" className="inline-flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Follow group</Link>
					</div>
				</div>
			</div>
			<div className="border border-gray-200 rounded-lg w-full my-8">
				<div className="flex flex-row justify-between items-end py-6 px-16 mx-auto">
					<div className="flex flex-col">
						<h5 className="text-xl font-medium text-gray-900">About</h5>
						<span className="text-sm text-gray-500">We're a vibrant online community of writers, bound together by our love for storytelling and collaborative creativity. Whether you're a seasoned wordsmith or just starting out, you'll find a warm welcome here. Join us in exploring the endless possibilities of the written word!</span>
					</div>
				</div>
			</div>
			<div>
				<h2 className="px-3 py-4 text-xl">Books</h2>
				<FeaturedSlider SliderItems={books} />
			</div>
    </div>
  )
}
