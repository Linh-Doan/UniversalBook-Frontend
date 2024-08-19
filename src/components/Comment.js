import { Rating } from './Rating';
import UserProfile from "../assets/userProfile.png";
export const Comment = ({profileImage, userName, commentText, rating}) => {

  return (
    <div className="bg-gray-200 border border-gray-400 p-2 rounded flex flex-col">
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
                    <li>
                        <img className="w-12 h-12 mx-2 rounded-full shadow-lg" src={UserProfile} alt="User profile" />
                    </li>
                    <li>
                        <span className="text-sm text-gray-800">{userName}</span>
                        
                    </li>
                </ul>
        <Rating rating={rating}/>
        <span className="text-gray-800">{commentText}</span>
       
    </div>
  )
}