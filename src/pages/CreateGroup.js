import React, {useState} from 'react';
import background_img from '../assets/login_page.jpg';
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';

export const CreateGroup = () => {
    const [formData, setFormData] = useState({
        groupName: '',
        groupMembers: [],
        curAddMemberEmail: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation
        const errors = {};
        if(!formData.groupName.trim()) {
            errors.groupName = 'Group name is required';
        }
        // Set errors
        setErrors(errors);
        // Submit if no errors
        if(Object.keys(errors).length === 0) {
            // Submit logic goes here
            console.log('Form submitted:', formData);
        }
    };

    const addMember = () => {
        const email = formData.curAddMemberEmail;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email format
        const errors = {};
        if(!emailRegex.test(formData.curAddMemberEmail)) {
            errors.curAddMemberEmail = 'Invalid email format';
            setErrors(errors);

        } else if(formData.groupMembers.includes(formData.curAddMemberEmail)) {
            errors.curAddMemberEmail = 'Member Already Added';
            setErrors(errors);
        } else {
            //TODO: add validation for email to exist in db
            formData.groupMembers.push(email);
            setFormData({
                ...formData
            });
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-cover" style={{backgroundImage: `url(${background_img})`}}>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center w-full md:w-auto mt-8"> {/* Add mt-8 class */}
                <h2 className="text-2xl mb-4">Create New Author Group</h2>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="groupName">
                            Group Name
                        </label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.groupName ? 'border-red-500' : ''}`}
                            id="groupName"
                            type="text"
                            placeholder="My Author Group"
                            name="groupName"
                            value={formData.groupName}
                            onChange={handleChange}
                        />
                        {errors.groupName && <p className="text-red-500 text-xs italic">{errors.groupName}</p>}
                    </div>

                    <div className="block text-gray-700 text-sm font-bold mb-2">
                        Group Members:
                    </div>

                    <div id="groupMembers">
                        {
                            formData.groupMembers.map((email) =>
                                <div>
                                    {email}
                                </div>
                            )
                        }
                    </div>
                    <Popup trigger={
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2">
                            Add New Member
                        </button>
                    }
                        id="addMemberPopup"
                        position={"right center"}
                    >
                        <div>
                            <label htmlFor="memberEmail" className="block text-gray-700 text-sm font-bold mb-2">Member Email</label>
                            <input type="text" id="memberEmail" className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.curAddMemberEmail ? 'border-red-500' : ''}`}
                                onChange={handleChange}
                                name="curAddMemberEmail"
                                value={formData.curAddMemberEmail}
                            />
                            {errors.curAddMemberEmail && <p className="text-red-500 text-xs italic">{errors.curAddMemberEmail}</p>}
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded focus:outline-none focus:shadow-outline w-full"
                                onClick={addMember}
                            >
                                Add
                            </button>
                        </div>

                    </Popup>

                    <br></br>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Register
                    </button>
                </form>
            </div>
        </main>
    );
};
