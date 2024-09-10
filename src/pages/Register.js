import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background_img from '../assets/login_page.jpg';
import viewIcon from '../assets/view.png';  
import hiddenIcon from '../assets/hidden.png';
import { apiBaseUrl, endpoints } from '../config';
import axiosInstance from '../api/axiosInstance';
// import Cookies from 'js-cookie';

export const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validInputs()) {
            const authDetails = {
                account_name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                account_password: formData.password
            }
            try {
                await axiosInstance.post(
                    `${apiBaseUrl}${endpoints.signup}`,
                    authDetails, 
                    {
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    }
                )
                navigate('/');
            } catch (err) {
                if (err.name === "AxiosError"){
                    alert(err.response.data.message);
                }
            }
        }
        
    };
    const validInputs = () => {
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
        // Set errors
        setErrors(errors);
        // Submit if no errors
        return Object.keys(errors).length === 0;
    }

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
