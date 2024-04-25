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
    <main className="flex flex-col items-start w-full md:w-3/4 mx-auto sm:px-4 px-6">
    <div className="text-sm font-medium text-left text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 w-full mt-4 overflow-x-auto overflow-y-hidden">
        <ul className="flex space-x-4 -mb-px">
            <li>
                <button type="button"  className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">All</button>
            </li>
            <li>
                <button type="button" className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-current="page">Books</button>
            </li>
            <li>
                <button type="button" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Chapters</button>
            </li>
            <li>
                <button type="button" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Genres</button>
            </li>
            <li>
                <button type="button" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">People</button>
            </li>
        </ul>
    </div>

    <section className="py-7 w-full">
        <p className="text-2xl text-gray-700 dark:text-white">{ results.length === 0 ? `No result found for '${queryTerm}'` : `Results for '${queryTerm}'` }</p>
    </section>

    <section className="py-7 w-full">
        <div className="flex flex-wrap gap-4">       
            { results.map((item) => (
                <CarouselItem key={item.id} imageUrl={item.imageUrl} />
            )) }          
        </div>
    </section>
</main>






  )
}
