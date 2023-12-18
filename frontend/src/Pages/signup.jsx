
 import { useState } from "react";
 import axios from "axios";
 import { Link, useNavigate } from "react-router-dom";


const Signup = () => { 
  const [data, setData] = useState({
		
		email: "",
		password: "",
    mobileNo: "",
    address: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:4000/register";
      const { data: res } = await axios.post(url, data);
      console.log(res); 
  
      // Redirect to the login page upon successful registration
      navigate("/login");
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
        <h2 className="text-2xl font-semibold mb-6">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
							value={data.email}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNo">
              MobileNo.
            </label>
            <input
              className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              type="text"
              id="mobileNo"
              name="mobileNo"
              placeholder="Enter your mobileNo"
              onChange={handleChange}
							value={data.mobileNo}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Address
            </label>
            <input
              className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              type="address"
              id="address"
              name="address"
              placeholder="Enter your address"
              onChange={handleChange}
							value={data.address}
            />
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            type="submit"
          >
            Login
          </button>

          <Link to="/login" className="text-blue-500 hover:underline">
           Login
          </Link> 
        </form>
      </div>
    </div>
  );
};

export default Signup;


