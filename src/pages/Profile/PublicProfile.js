import UserProfile from "../../assets/userProfile.png";
import FeaturedSlider from "../../components/FeaturedSlider";
import {apiBaseUrl, endpoints} from '../../config';
import {useEffect, useState} from "react";

export const PublicProfile = ({id}) => {
    const [accountName, setAccountName] = useState(null);
    const [accountBooks, setAccountBooks] = useState([]);
    const [authorGroups, setAuthorGroups] = useState([]);
    useEffect(() => {
        async function fetchPublicData() {
            if(id != null) {
                let curUserRes = await fetch(apiBaseUrl + endpoints.getUsers + "/" + id, {credentials:"include"});

                let curUser = await curUserRes.json();

                let userAuthorgroups = curUser.data.user.account_author_group_member;
                setAccountName(curUser.data.user.account_name);
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

                setAccountBooks(personalBooks);
            }

        };
        fetchPublicData();
    }, [id]);
    return (
        <div className="p-4 w-full overflow-hidden">
            <div className="bg-gray-100 border border-gray-200 rounded-lg">
                <div className="flex flex-row justify-between items-end py-10 w-4/5 mx-auto">
                    <div className="flex flex-col items-center">
                        <img className="w-40 h-40 mb-3 rounded-full shadow-lg" src={UserProfile} alt="User profile" />
                        <h5 className="mb-1 text-xl font-medium text-gray-900">{accountName}</h5>
                        {/* <span className="text-sm text-gray-500">3.9M followers • 155 following</span> */}
                    </div>
                    <div className="flex flex-row mt-4 md:mt-6 pr-10">
                        {/* <Link to="#" className="inline-flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Follow</Link>
                        <Link to="#" className="inline-flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Message</Link> */}
                    </div>
                </div>
            </div>
            <div>
                <h2 className="px-3 py-4 text-xl">Books</h2>
                <FeaturedSlider SliderItems={accountBooks.filter((book) => book.isPublished)} itemType={"book"}/>
            </div>

            <div>
                <h2 className="px-3 py-4 text-xl" >Groups</h2>
                <FeaturedSlider SliderItems={authorGroups} itemType={"authorGroup"} />
            </div>
            {/* <div>
                <h2 className="px-3 py-4 text-xl" >Following</h2>
                <FeaturedSlider SliderItems={authorGroups}/>
            </div>
            <div className="box-sizing: border-box">
                <h2 className="px-3 py-4 text-xl" >Followers</h2>
                <FeaturedSlider SliderItems={authorGroups}/>
            </div> */}
        </div>
    );
};
