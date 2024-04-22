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
