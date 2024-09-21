
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserProfile from "../assets/userProfile.png";
import { logout } from "../services/authService";
export const DropdownLoggedIn = ({setDropdownVisible, currentUser}) => {
    const [showConfirmLogout, setShowConfirmLogout] = useState(false);
    const navigate = useNavigate();

    const logoutNavigate = async () => {
        await logout();
        navigate('/');
    }

    const confirmLogout = async () => {
        setShowConfirmLogout(false);
        await logoutNavigate();
        
    };
    return (
        <div>
            <div className="flex flex-col p-2 text-left">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">{currentUser.account_name}</span>
                    <img src={UserProfile} alt="User Profile" className="h-8 w-8 rounded-full" />
                </div>
                <Link onClick={() => setDropdownVisible(false)} to={"/profile/" + currentUser.account_id} className="text-blue-700 font-semibold mb-2 text-left hover:bg-gray-200">Dashboard</Link>
                <button onClick={() => setShowConfirmLogout(true)} className="text-blue-700 font-semibold text-left hover:bg-gray-200">Logout</button>
            </div>
            {showConfirmLogout && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-4 rounded-lg shadow-lg text-center z-60">
                    <p className="mb-4">Are you sure you want to logout?</p>
                    <div className="flex justify-around">
                    <button onClick={confirmLogout} className="bg-red-500 text-white px-4 py-2 rounded">Yes</button>
                    <button onClick={() => setShowConfirmLogout(false)} className="bg-gray-300 text-black px-4 py-2 rounded">No</button>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}
