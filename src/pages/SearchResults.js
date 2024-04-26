import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CarouselItem } from '../components'
import Book1 from "../assets/book1.jpeg";
import Book2 from "../assets/book2.avif";
import Book3 from "../assets/book3.jpeg";
export const SearchResults = () => {
	const [activeTab, setActiveTab] = useState(0);
	const [searchParams] = useSearchParams()
	const queryTerm = searchParams.get("q")
	const tabs = [
		// {
		// 	tabDisplay: 'All',
		// 	patternMatching: /.*.*/
		// },
		{
			tabDisplay: 'Books',
			patternMatching: /^Book$/
		},
		{
			tabDisplay: 'Chapters',
			patternMatching: /^Chapter$/
		},
		{
			tabDisplay: 'Genres',
			patternMatching: /^Genre$/
		},
		{
			tabDisplay: 'People',
			patternMatching: /^People$/
		}
	]
	const inactiveClass = "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
	const activeClass = "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active"
	// API call
	const results = [  
		{
			id: 1,
			imageUrl: Book1,
			category: "Book"
		},
		{
			id: 2,
			imageUrl: Book1, 
			category: "Book"
		},
		{
			id: 3,
			imageUrl: Book1, 
			category: "Book"
		},
		{
			id: 4,
			imageUrl: Book2,
			category: "Chapter"
		},
		{
			id: 5,
			imageUrl: Book2, 
			category: "Chapter"
		},
		{
			id: 6,
			imageUrl: Book2, 
			category: "Chapter"
		},
		{
			id: 7,
			imageUrl: Book3,
			category: "People"
		},
		{
			id: 8,
			imageUrl: Book3, 
			category: "People"
		},
		{
			id: 9,
			imageUrl: Book3, 
			category: "People"
		}
	];
  return (
    <main className="flex flex-col items-start w-full md:w-3/4 mx-auto sm:px-4 px-6">
			<section className="py-7 w-full">
        <p className="text-2xl text-gray-700">{ results.length === 0 ? `No result found for '${queryTerm}'` : `Results for '${queryTerm}'` }</p>
    </section>
			<div className="text-sm font-medium text-left text-gray-500 border-b border-gray-200 w-full mt-4 overflow-x-auto overflow-y-hidden">
					<ul className="flex space-x-4 -mb-px">
						{tabs.map((item, index) => (
							<li key={item.tabDisplay}>
								<button 
									type="button"  
									className={index === activeTab ? activeClass : inactiveClass}
									onClick={() => setActiveTab(index)}
								>
									{item.tabDisplay}
								</button>
							</li>
					))}
					</ul>
			</div>
			<section className="py-7 w-full">
					<div className="flex flex-wrap gap-4">       
							{ 
								results.filter((item) => item.category.match(tabs[activeTab].patternMatching)).map((item) => (
									<CarouselItem key={item.id} imageUrl={item.imageUrl} />
								))
							}
							{ 
								results.filter((item) => item.category.match(tabs[activeTab].patternMatching)).length ===  0? 
								<p className="text-large text-gray-700">{`No ${tabs[activeTab].tabDisplay.toLowerCase()} results found`}</p> : ""
							}       
					</div>
			</section>
		</main>
  )
}
