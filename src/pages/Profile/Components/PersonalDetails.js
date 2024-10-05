import { useState, useEffect } from "react";
import { useUser } from '../../../hooks/useUser';

export const PersonalDetails = () => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({});
  const [cachedProfile, setCachedProfile] = useState({})
  const { user} = useUser();

  useEffect(() => {
    // Ensure user object is not null or undefined before setting profile
    if (user) {
      const tmpProfile = {
        fullName: user.account_name || '',  // Use empty string if account_name is undefined or null
        dob: '2000-01-01',  // Placeholder DOB
        email: user.email || '',
        phoneNumber: '041111111',  // Placeholder phone number
        language: user.language_id || ''
      };
      setProfile(tmpProfile);
      setCachedProfile(tmpProfile);
    }
  }, [user]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault()
    setEditing(false);
    //send data to DB
    setCachedProfile(profile)
  };

  const handleCancel = (e) => {
    e.preventDefault()
    setEditing(false);
    //Alternatively can make another DB call
    setProfile(cachedProfile)
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="px-48">
      <h1 className="py-4 text-3xl font-bold">Personal details</h1>
      {editing ? (
        <form className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
          <div className="relative z-0 mb-5 group">
            <input type="text" name="firstName" value={profile.firstName} onChange={handleChange} id="firstName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="firstName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
          </div>
          <div className="relative z-0 mb-5 group">
            <input type="text" name="lastName" value={profile.lastName} onChange={handleChange} id="lastName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="lastName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
          </div>
          <div className="relative z-0 mb-5 group">
            <input type="date" name="dob" value={profile.dob} onChange={handleChange} id="dob" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="dob" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date of birth</label>
          </div>
          <div className="relative z-0 mb-5 group">
              <input type="email" name="email" value={profile.email} onChange={handleChange} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
          </div>
          <div className="relative z-0 mb-5 group">
              <input type="tel" pattern="[0-9]{10}" name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} id="phoneNumber" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="phoneNumber" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (1234567890)</label>
          </div>
          <div className="relative z-0 mb-5 group">
              <input type="text" name="religion" value={profile.religion? profile.religion : ""} onChange={handleChange} id="religion" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="religion" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Religion</label>
          </div>
          {/* <button type="submit" onClick={handleSave} className="text-white mr-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
          <button type="submit" onClick={handleCancel} className="text-white ml-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancel</button> */}
        </form>
      ) : (
        <div className="w-full flex flex-row items-start justify-between p-6 bg-white border border-gray-200 rounded-lg shadow">
          <div>
            <p className="mb-3 font-normal text-gray-700">Full name: {profile.fullName}</p>
            <p className="mb-3 font-normal text-gray-700">DOB: {profile.dob}</p>
            <p className="mb-3 font-normal text-gray-700">Email: {profile.email}</p>
            <p className="mb-3 font-normal text-gray-700">Phone number: {profile.phoneNumber}</p>
            <p className="mb-3 font-normal text-gray-700">Language: {profile.language}</p>
          </div>
          {/* <div className="flex justify-end px-4 pt-4">
            <button id="editButton"  onClick={handleEditClick} className=" inline-block text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5" type="button">
              <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd"/>
                <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd"/>
              </svg>
            </button>
          </div> */}
        </div>
      )}
    </div>

    
  );
}
