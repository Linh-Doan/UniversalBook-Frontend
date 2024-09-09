import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FeaturedSlider from "../../components/FeaturedSlider";
import Book4 from "../../assets/book4.jpg";
import Book5 from "../../assets/book5.jpg";
import Book6 from "../../assets/book6.jpg";
import GroupImg from "../../assets/GroupImage.jpeg"
import {apiBaseUrl, endpoints} from '../../config';

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

const accountId = "3c23729a-820b-4cfe-9b29-70132bac0c74" // TODO: replace with getting account id from cookie or session storage

export const GroupDashboard = () => {
    const [authorGroupData, setAuthorGroupData] = useState({
        name: "Loading",
        membersCount: 0,
        books: []
    });
	const [isMember, setIsMember] = useState(true);
	const [following, setFollowing] = useState(false);
	const [joinGroupClicked, setJoinGroupClicked] = useState(false);
	const [followClicked, setFollowClicked] = useState(false);
	const joinGroup = () => {
        const body = JSON.stringify({
            account_author_group_member: {
                create: {
                    account: {
                        connect: {
                            account_id: accountId
                        }
                    }
                }
            }
        });
        fetch(apiBaseUrl + endpoints.authorGroup + '/' + id, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: body
        })
        .then((response)=>(response.ok)? response : alert("Joining group failed!"))
        .then((response)=>response.json()).then((data) => {
            setAuthorGroupData({
				...authorGroupData,
                name: data.data.updatedAuthorGroup.author_group_name,
                membersCount: data.data.updatedAuthorGroup.account_author_group_member.length,
				
            })
            setIsMember(true)
		    setFollowing(true)
        });
		
	}
	const leaveGroup = () => {
        const body = JSON.stringify({
            account_author_group_member: {
                delete: {
                    account: {
                        account_id: accountId
                    }
                }
            }
        });
        fetch(apiBaseUrl + endpoints.authorGroup + '/' + id, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: body
        })
        .then((response)=>(response.ok)? response : alert("Leaving group failed!"))
        .then((response)=>response.json()).then((data) => {
            setAuthorGroupData({
				...authorGroupData,
                name: data.data.updatedAuthorGroup.author_group_name,
                membersCount: data.data.updatedAuthorGroup.account_author_group_member.length
            })
            setIsMember(false)
		    setFollowing(false)
        });
	}

    const { id } = useParams();
    const navigate = useNavigate();
    
    useEffect(()=>{
        fetch(apiBaseUrl + endpoints.authorGroup + '/' + id).then((response)=>response.json()).then((data) => {

            if (data.data.authorGroup.author_group_is_single) {
                navigate("/profile/" + data.data.authorGroup.account_author_group_member[0].account.account_id)
            }

            setAuthorGroupData({
                name: data.data.authorGroup.author_group_name,
                membersCount: data.data.authorGroup.account_author_group_member.length,
                books: data.data.authorGroup.book.map(book => {return {heading: book.book_name, imageUrl: book.book_image_url}})
            });

            if (data.data.authorGroup.account_author_group_member.map(member => member.account.account_id).includes(accountId)) {
                setIsMember(true);
                setFollowing(true);
            } else {
                setIsMember(false);
                setFollowing(false);
            }
        });
        return () => {};
    }, [])

    return (
    <div className="mx-auto px-8">
			<div className="border border-gray-200 h-[65vh] overflow-visible rounded-lg w-full">
				<img className="object-cover w-full h-[50vh]" src={GroupImg} alt="Group Cover"></img>
				<div className="flex flex-row justify-between items-start py-6 px-16 mx-auto">
					<div className="flex flex-col">
						<h5 className="text-xl font-medium text-gray-900">{authorGroupData.name}</h5>
						<span className="text-sm text-gray-500">{authorGroupData.membersCount} members</span>
					</div>
					<div className="flex flex-row items-start">
						{!isMember &&
						<>
							<button onClick={() => joinGroup()}className="flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
								Join group
							</button>
						</>
						}
						{!isMember && !following && <button onClick={() => setFollowing(!following)} className="inline-flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Follow</button>}
						{!isMember && following && 
						<div>
							<button id="dropdownFollowButton" onClick={()=>setFollowClicked(!followClicked)} data-dropdown-toggle="dropdown" className="inline-flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100" type="button">
								Following
							<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
								<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
								</svg>
							</button>
							<div id="dropdown" className={`z-10 bg-white ${followClicked? '' : 'hidden'} divide-y divide-gray-100 rounded-lg shadow`}>
									<ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownFollowButton">
										<li>
											<button onClick={() => {
												setFollowing(false)
												setFollowClicked(false)
											}} className="block pl-4 py-2  hover:bg-gray-100">Unfollow</button>
										</li>
									</ul>
							</div>
						</div>}
						{isMember &&
						<>
							<button type="button" className="flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
								<svg className="w-4.5 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
								</svg>
								Invite
							</button>
							<div>
								<button id="dropdownDefaultButton" onClick={()=>setJoinGroupClicked(!joinGroupClicked)} data-dropdown-toggle="dropdown" className="inline-flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100" type="button">
										Joined
									<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
									<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
									</svg>
								</button>
								<div id="dropdown" className={`z-10 bg-white ${joinGroupClicked? '' : 'hidden'} divide-y divide-gray-100 rounded-lg shadow`}>
										<ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
											<li>
												<button onClick={() => {
													leaveGroup()
													setJoinGroupClicked(false)
												}} className="block px-4 py-2  hover:bg-gray-100">Leave group</button>
											</li>
										</ul>
								</div>
							</div>
							<Link to="#" className="inline-flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10">Edit group</Link>
						</>
						}
					</div>
					
				</div>
			</div>
			{/* <div className="border border-gray-200 rounded-lg w-full my-8">
				<div className="flex flex-row justify-between items-end py-6 px-16 mx-auto">
					<div className="flex flex-col">
						<h5 className="text-xl font-medium text-gray-900">About</h5>
						<span className="text-sm text-gray-500">We're a vibrant online community of writers, bound together by our love for storytelling and collaborative creativity. Whether you're a seasoned wordsmith or just starting out, you'll find a warm welcome here. Join us in exploring the endless possibilities of the written word!</span>
					</div>
				</div>
			</div> */}
			<div>
				<div className="flex flex-row justify-between items-center">
					<h2 className="px-3 py-4 text-xl">Books</h2>
					{isMember &&
					<Link  to='/bookcreator' className="flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
						<svg className="w-4.5 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
						</svg>
						Add book
					</Link>
					}
				</div>
				<FeaturedSlider SliderItems={authorGroupData.books.filter((book)=>book.is_published)}/>
			</div>
			<div>
				<h2 className="px-3 py-4 text-xl">Drafts</h2>
				<FeaturedSlider SliderItems={authorGroupData.books.filter((book)=>!book.is_published)}/>
			</div>
    </div>
  )
}
