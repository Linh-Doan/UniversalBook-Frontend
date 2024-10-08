import {Link} from "react-router-dom";
import UserProfile from "../../../assets/userProfile.png";
import FeaturedSlider from "../../../components/FeaturedSlider";
import {apiBaseUrl, endpoints} from '../../../config';
import {useUser} from '../../../hooks/useUser';
import {useEffect, useState} from "react";
import axiosInstance from "../../../api/axiosInstance";
import './Dashboard.css';

export const Dashboard = () => {
    const {user, userId} = useUser();
    const [booksFollowing, setBooksFollowing] = useState([]);
    const [authorGroups, setAuthorGroups] = useState([]);
    const [personalBooks, setPersonalBooks] = useState([]);
    useEffect(() => {
        async function fetchBooksFollowing() {
            if(userId) {
                const response = await axiosInstance.get(`${endpoints.followBook}?account_id=${userId}`);
                const books = response.data.data.relationships.map(relationship => relationship.book);
                setBooksFollowing(books);
            }
        }
        fetchBooksFollowing();
    }, [userId]);

    useEffect(() => {
        async function fetchPersonalData() {
            if(user != null) {
                let userAuthorgroups = user.account_author_group_member;

                setAuthorGroups(userAuthorgroups
                    .filter(
                        (authorGroup) => !authorGroup.author_group.author_group_is_single
                    )
                    .map((authorGroup) => {
                        return {
                            id: authorGroup.author_group.author_group_id,
                            imageUrl: authorGroup.author_group.author_group_image_url,
                            heading: authorGroup.author_group.author_group_name
                        };
                    }));

                const personalAuthorGroup = userAuthorgroups.filter(
                    (authorGroup) => authorGroup.author_group.author_group_is_single
                );

                let personalBooks = [];

                if(personalAuthorGroup.length > 0) {
                    const personalAuthorGroupData = await (await fetch(apiBaseUrl + endpoints.authorGroup + '/' + personalAuthorGroup[0].author_group.author_group_id)).json();

                    for(let i = 0; i < personalAuthorGroupData.data.authorGroup.book.length; i++) {
                        let book = personalAuthorGroupData.data.authorGroup.book[i];
                        personalBooks.push({
                            id: book.book_id,
                            imageUrl: book.book_image_url,
                            heading: book.book_name,
                            isPublished: book.is_published
                        });
                    }
                }

                setPersonalBooks(personalBooks);
            }

        };
        fetchPersonalData();
    }, [user, userId]);
    return (
        <div className="dashboard-outlet">
            <div className="bg-gray-100 border border-gray-200 rounded-lg">
                <div className="flex flex-row justify-between items-end py-10 w-4/5 mx-auto">
                    <div className="flex flex-col items-center">
                        <img className="w-40 h-40 mb-3 rounded-full shadow-lg" src={UserProfile} alt="User profile" />
                        <h5 className="mb-1 text-xl font-medium text-gray-900">{(user)? user.account_name: "Loading"}</h5>
                        {/* <span className="text-sm text-gray-500">3.9M followers • 155 following</span> */}
                    </div>
                    <div className="flex flex-row mt-4 md:mt-6 pr-10">
                        {/* <Link to="#" className="inline-flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Follow</Link>
                        <Link to="#" className="inline-flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Edit intro</Link> */}
                    </div>
                </div>
            </div>
            <div>
                <div className="flex flex-row justify-between items-center">
                    <h2 className="px-3 py-4 text-xl" >Groups</h2>
                    <Link to="/creategroup" className="flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        <svg className="w-4.5 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                        </svg>
                        Add group
                    </Link>
                </div>
                <FeaturedSlider SliderItems={authorGroups} itemType={'authorGroup'}/>
            </div>
            <div>
                <div className="flex flex-row justify-between items-center">
                    <h2 className="px-3 py-4 text-xl">Books</h2>
                    <Link to="/bookcreator" className="flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        <svg className="w-4.5 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                        </svg>
                        Add book
                    </Link>
                </div>
                <FeaturedSlider SliderItems={personalBooks.filter((book) => book.isPublished)} itemType={'book'}/>
            </div>
            <div>
                <h2 className="px-3 py-4 text-xl" >Drafts</h2>
                <FeaturedSlider SliderItems={personalBooks.filter((book) => !book.isPublished)} itemType={'draft'}/>
            </div>
            <div>
                <h2 className="px-3 py-4 text-xl" >Following</h2>
                <FeaturedSlider SliderItems={booksFollowing.map(book => {
                    return {
                        id: book.book_id,
                        imageUrl: book.book_image_url,
                        heading: book.book_name,
                    };
                })}
                    itemType="book"
                />
            </div>
        </div>
    );
};