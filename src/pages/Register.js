import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import background_img from '../assets/login_page.jpg';
import viewIcon from '../assets/view.png';  
import hiddenIcon from '../assets/hidden.png';

export const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: null,
        religion: '' // New state variable for religion field
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            dateOfBirth: date
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLocationChange = (e) => {
        setFormData({
            ...formData,
            location: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email format

        if (!formData.firstName.trim()) {
            errors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
            errors.lastName = 'Last name is required';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            errors.email = 'Invalid email format';
        }
        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        }
        if (!formData.confirmPassword.trim()) {
            errors.confirmPassword = 'Confirm password is required';
        } else if (formData.confirmPassword.trim() !== formData.password.trim()) {
            errors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.dateOfBirth) {
            errors.dateOfBirth = 'Date of birth is required';
        } else {
            const today = new Date();
            const selectedDate = formData.dateOfBirth;
            if (selectedDate >= today) {
                errors.dateOfBirth = 'You haven\'t born yet??';
            } else {
                const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                if (selectedDate.getTime() === todayWithoutTime.getTime()) {
                    errors.dateOfBirth = 'I think you are too young to use the internet!!';
                }
            }
        }
        if (!formData.location || !formData.location.trim()) {
            errors.location = 'Location field is needed';
        }
        // Set errors
        setErrors(errors);
        // Submit if no errors
        if (Object.keys(errors).length === 0) {
            // Submit logic goes here
            console.log('Form submitted:', formData);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-cover" style={{ backgroundImage: `url(${background_img})` }}>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center w-full md:w-auto mt-8"> {/* Add mt-8 class */}
            <h2 className="text-2xl mb-4">Register</h2>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-4 flex flex-col md:flex-row items-center md:space-x-4">
                        <div className="md:w-1/2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.firstName ? 'border-red-500' : ''}`}
                                id="firstName"
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>}
                        </div>
                        <div className="md:w-1/2 mt-4 md:mt-0 mb-4 md:mb-0">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.lastName ? 'border-red-500' : ''}`}
                                id="lastName"
                                type="text"
                                placeholder="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName}</p>}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                            id="email"
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 px-5 py-4 focus:outline-none"
                            style={{ top: '50%', transform: 'translateY(-50%)' }}
                        >
                            <img
                                src={showPassword ? hiddenIcon : viewIcon}
                                alt={showPassword ? "Hide Password" : "Show Password"}
                                className="h-6 w-6 text-gray-700"
                            />
                        </button> 
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.confirmPassword ? 'border-red-500' : ''}`}
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 px-5 py-4 focus:outline-none"
                            style={{ top: '50%', transform: 'translateY(-50%)' }}
                        >
                            <img
                                src={showPassword ? hiddenIcon : viewIcon}
                                alt={showPassword ? "Hide Password" : "Show Password"}
                                className="h-6 w-6 text-gray-700"
                            />
                        </button>
                        {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfBirth">
                            Date of Birth
                        </label>
                        <DatePicker
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                            selected={formData.dateOfBirth}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select Date"
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                        />
                        {errors.dateOfBirth && <p className="text-red-500 text-xs italic">{errors.dateOfBirth}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="religion">
                            Religion (Optional)
                        </label>
                        <select
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.religion ? 'border-red-500' : ''}`}
                            id="religion"
                            name="religion"
                            value={formData.religion}
                            onChange={handleChange}
                        >
                            <option value="">Select Religion</option>
                            <option value="Christianity">Christianity</option>
                            <option value="Islam">Islam</option>
                            <option value="Irreligion">Irreligion</option>
                            <option value="Hinduism">Hinduism</option>
                            <option value="Buddhism">Buddhism</option>
                            <option value="Folk religions">Folk religions</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.religion && <p className="text-red-500 text-xs italic">{errors.religion}</p>}
                    </div>
                    {formData.religion === 'Other' && (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otherReligion">
                                Other Religion
                            </label>
                            <input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.otherReligion ? 'border-red-500' : ''}`}
                                id="otherReligion"
                                type="text"
                                placeholder="Enter Other Religion"
                                name="otherReligion"
                                value={formData.otherReligion}
                                onChange={handleChange}
                            />
                            {errors.otherReligion && <p className="text-red-500 text-xs italic">{errors.otherReligion}</p>}
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                            Location
                        </label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            id="location"
                            type="text"
                            placeholder="Enter Location"
                            name="location"
                            value={formData.location}
                            onChange={handleLocationChange}
                        />
                        {errors.location && <p className="text-red-500 text-xs italic">{errors.location}</p>}
                    </div>

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