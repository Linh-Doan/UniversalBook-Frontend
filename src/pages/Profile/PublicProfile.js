import {Link} from "react-router-dom";
import UserProfile from "../../assets/userProfile.png";
import FeaturedSlider from "../../components/FeaturedSlider";
import Book4 from "../../assets/book1.jpeg";
import {apiBaseUrl, endpoints} from '../../config';

const email = 'test1@gmail.com'; //TODO: change to code to get email from cookie



export const PublicProfile = async (id) => {

    let curUserRes = await fetch(apiBaseUrl + endpoints.getUsers + "/" + id);

    let curUser = await curUserRes.json();

    let userAuthorgroups = curUser.data.user.account_author_group_member;

    const mappedAuthorGroups = userAuthorgroups.map((authorGroup) => {
        return {
            id: authorGroup.author_group.author_group_id,
            imageUrl: Book4,
            heading: authorGroup.author_group.author_group_name
        };
    });
    return (
        <div className="p-4 w-full overflow-hidden">
            <div className="bg-gray-100 border border-gray-200 rounded-lg">
                <div className="flex flex-row justify-between items-end py-10 w-4/5 mx-auto">
                    <div className="flex flex-col items-center">
                        <img className="w-40 h-40 mb-3 rounded-full shadow-lg" src={UserProfile} alt="User profile" />
                        <h5 className="mb-1 text-xl font-medium text-gray-900">{curUser.data.user.account_name}</h5>
                        <span className="text-sm text-gray-500">3.9M followers • 155 following</span>
                    </div>
                    <div className="flex flex-row mt-4 md:mt-6 pr-10">
                        <Link to="#" className="inline-flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Follow</Link>
                        <Link to="#" className="inline-flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Message</Link>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="px-3 py-4 text-xl">Books</h2>
                <FeaturedSlider />
            </div>

            <div>
                <h2 className="px-3 py-4 text-xl" >Groups</h2>
                <FeaturedSlider SliderItems={mappedAuthorGroups} itemType={"AuthorGroup"} />
            </div>
            <div>
                <h2 className="px-3 py-4 text-xl" >Following</h2>
                <FeaturedSlider />
            </div>
            <div className="box-sizing: border-box">
                <h2 className="px-3 py-4 text-xl" >Followers</h2>
                <FeaturedSlider />
            </div>
        </div>
    );
};
