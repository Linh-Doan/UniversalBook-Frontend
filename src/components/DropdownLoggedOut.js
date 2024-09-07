import { Link } from "react-router-dom";
export const DropdownLoggedOut = ({setDropdownVisible}) => {
  return (
    <div className="flex flex-col p-2 text-left">
        <span className="text-gray-700 mb-2">Not logged in yet</span>
        <Link onClick={() => setDropdownVisible(false)} to='/login' className="text-blue-700 font-semibold mb-2 text-left hover:bg-gray-200">Login</Link>
        <Link onClick={() => setDropdownVisible(false)} to='/register' className="text-blue-700 font-semibold text-left hover:bg-gray-200">New here?</Link>
    </div>
  )
}
