import {Link} from "react-router-dom";
import UserProfile from "../assets/userProfile.png";
export const UserDataRow = ({userName, email}) => {
    return (
        <span className="bg-white shadow">
            <div className="w-full mx-auto p-4 md:flex md:items-center md:justify-between">
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
                    <li>
                        <img className="w-12 h-12 mx-2 rounded-full shadow-lg" src={UserProfile} alt="User profile" />
                    </li>
                    <li>
                        <div className="flex flex-col items-center">
                            <h5 className="mb-1 text-xl font-medium text-gray-900">{userName}</h5>
                            <span className="text-sm text-gray-500">{email}</span>
                        </div>
                        
                    </li>
                    <li>
                        <span className="text-sm mx-3 text-gray-500">3.9M followers • 155 following</span>
                    </li>
                </ul>
            </div>
        </span>
    );
};
