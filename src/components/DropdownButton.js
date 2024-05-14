import { useState } from "react"
export const DropdownButton = () => {
	const [clicked, setClicked] = useState(false);
  return (
    <div>

			<button id="dropdownDefaultButton" onClick={()=>setClicked(!clicked)} data-dropdown-toggle="dropdown" class="inline-flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100" type="button">Joined<svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
			<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
			</svg>
			</button>

			<div id="dropdown" class={`z-10 bg-white ${clicked? '' : 'hidden'} divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700`}>
					<ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
						<li>
							<a href="#" class="block px-4 py-2  hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Leave group</a>
						</li>
					</ul>
			</div>

    </div>
  )
}
