import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate} from "react-router-dom";
import ForgetPassword from "./forgetPassw";
import { useAuth } from "../utils/authProvider";
import Cookies from "js-cookie";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:4000/login";
      const response = await axios.post(url, data);
  
      if (response.data.success) {
          console.log(response.data,"response.dataresponse.dataresponse.dataresponse.data")
        Cookies.set("user", { token: response.data.token });
        // login();
        navigate('/home');
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={data.email}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              value={data.password}
            />
            {error && <div>{error} </div>}
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            type="submit"
          >
            Login
          </button>

          <Link to="/signup" className="text-blue-500 hover:underline">
            Don't have an account? Sign up here.
          </Link>

        </form>
        <ForgetPassword />
     
      </div>
    </div>
  );
};

export default Login;

