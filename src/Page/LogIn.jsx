import React, { useState } from "react";
import PageDesign from "../Components/pageDesign";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handlelogin = async (e) => {
    e.preventDefault()

    console.log(email,password)
    const request = await fetch(
      "https://advanced-engineering-admin.vercel.app/api/v1/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await request.json();
    if(response?.token){
      localStorage.setItem("token",response?.token)
      toast.success("Login successfull!",{
        position: "top-right"
      })
       navigate("/")
    }else{
      toast.error("Username or password did not match!", {
        position: "top-right"
      });
    }


  };

  return (
    <PageDesign>
      <div className="flex items-center justify-center h-full rounded-3xl bg-gray-100 px-4 sm:px-0">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Admin Login
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Sign in to access the admin panel
          </p>
          <form onSubmit={handlelogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
              />
            </div>
            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                id="password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
              />
            </div>
            {/* Remember Me & Forgot Password */}
            {/* <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <a
              href="#"
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Forgot password?
            </a>
          </div> */}
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500 shadow-lg"
            >
              Log In
            </button>
          </form>
          {/* Separator */}
          {/* <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-sm text-gray-400">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div> */}
          {/* Social Login */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            className="py-2 px-4 flex items-center justify-center bg-gray-50 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <img
              src="https://img.icons8.com/color/24/000000/google-logo.png"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Google
          </button>
          <button
            type="button"
            className="py-2 px-4 flex items-center justify-center bg-gray-50 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <img
              src="https://img.icons8.com/ios-filled/24/1877F2/facebook-new.png"
              alt="Facebook"
              className="w-5 h-5 mr-2"
            />
            Facebook
          </button>
        </div> */}
        </div>
      </div>
    </PageDesign>
  );
};

export default LogIn;
