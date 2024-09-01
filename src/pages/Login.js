import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import viewIcon from '../assets/view.png'; // Import the view icon image
import hiddenIcon from '../assets/hidden.png'; // Import the hidden icon image
import background_img from '../assets/login_page.jpg';
import { apiBaseUrl, endpoints } from '../config';
import axiosInstance from '../api/axiosInstance';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const loginDetails = {
      email: formData.email,
      account_password: formData.password
    }
    try {
      await axiosInstance.post(`${apiBaseUrl}${endpoints.login}`, 
      loginDetails,
      {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
      });
      navigate('/');
    } catch (err) {
      if (err.name === "AxiosError"){
        alert(err.response.data.message);
      }
    }

  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
  }
  return (
    <main> 
      <div
        className="min-h-screen flex items-center justify-center bg-cover"
        style={{ backgroundImage: `url(${background_img})` }}
      >
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl mb-6">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
                >
                  <img
                    src={showPassword ? hiddenIcon : viewIcon}
                    alt={showPassword ? "Hide Password" : "Show Password"}
                    className="h-6 w-6 text-gray-700"
                  />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="/register"
              >
                New Here?
              </a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};