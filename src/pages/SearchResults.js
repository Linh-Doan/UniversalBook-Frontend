import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { CarouselItem } from '../components'
import Book1 from "../assets/book1.jpeg";
import Book2 from "../assets/book2.avif";
import Book3 from "../assets/book3.jpeg";
export const SearchResults = () => {
	const [searchParams] = useSearchParams()
	const queryTerm = searchParams.get("q")
	// API call
	const results = [  
		{
			id: 1,
			imageUrl: Book1, 
		},
		{
			id: 2,
			imageUrl: Book2, 
		},
		{
			id: 3,
			imageUrl: Book3, 
		}
	];
  return (
    <main>
			<div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
					<ul className="flex flex-wrap -mb-px">
							<li className="me-2">
									<a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Profile</a>
							</li>
							<li className="me-2">
									<a href="#" className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-current="page">Dashboard</a>
							</li>
							<li className="me-2">
									<a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Settings</a>
							</li>
							<li className="me-2">
									<a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Contacts</a>
							</li>
							<li>
									<a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">Disabled</a>
							</li>
					</ul>
			</div>
			<section className="py-7">
				<p className="text-2xl text-gray-700 dark:text-white">{ results.length === 0 ? `No result found for '${queryTerm}'` : `Result for '${queryTerm}'` }</p>
			</section>
			<section className="py-7">
				<div className="flex justify-start flex-wrap">       
					{ results.map((item) => (
					<CarouselItem key={item.id} imageUrl={item.imageUrl} />
					)) }          
				</div>
			</section>
    </main>
  )
}
