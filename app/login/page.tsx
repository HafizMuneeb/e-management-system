"use client";

import Link from "next/link";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaUserGraduate } from "react-icons/fa6";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const isPasswordValid = (): boolean => {
    // Password should be at least 6 characters
    return formData.password.length >= 6;
  };

  const isEmailValid = (): boolean => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData.email);
  };

  const isAnyFieldEmpty = (): boolean => {
    return Object.values(formData).some((field) => {
      if (typeof field === "string") {
        return field.trim() === "";
      }
      return false;
    });
  };

  return (
    <div className="w-full h-screen bg-gradient-to-r from-[#24B29A] to-[#199B93] flex justify-center items-center">
      <div className="w-full md:w-[70%] lg:w-[60%] h-[70%] md:flex mx-auto">
        {/* image with text */}
        <div
          className="w-full md:w-[50%] h-full"
          style={{
            backgroundImage: "url('signup.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full h-full flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl font-bold text-blue-700">Welcome!</h1>
            <p className="mt-4 text-black">School Management System.</p>
          </div>
        </div>

        {/* form div start here */}
        <div className="w-full md:w-[50%] h-full bg-white p-8 flex flex-col justify-center items-center">
          <form className="w-full max-w-md">
            <div className="mb-4 w-full relative">
              <label
                htmlFor="identifier"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <div className="flex items-center">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full p-2 border rounded ${
                    isEmailValid() ? "" : "border-red-500"
                  }`}
                  onChange={handleChange}
                  required
                />
                {!isEmailValid() && (
                  <span className="absolute inset-y-1 right-0 pr-2 flex items-center">
                    <FaUserGraduate className="text-gray-400" />
                  </span>
                )}
              </div>
              {!isEmailValid() && (
                <span className="text-red-500">Email is Required</span>
              )}
            </div>
            <div className="mb-4 w-full relative">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <div className="flex items-center">
                <input
                  type={formData.showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className={`w-full p-2 border rounded`}
                  onChange={handleChange}
                  required
                />
                <span
                  className="absolute inset-y-0 right-0 top-2 pr-2 flex items-center cursor-pointer"
                  onClick={() =>
                    setFormData((prevData) => ({
                      ...prevData,
                      showPassword: !prevData.showPassword,
                    }))
                  }
                >
                  {formData.showPassword ? (
                    <FaRegEyeSlash className="text-gray-400" />
                  ) : (
                    <FaRegEye className="text-gray-400" />
                  )}
                </span>
              </div>
            </div>

            <div className="mb-4 w-full text-right">
              <a href="#" className="text-blue-500">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded w-full"
              disabled={isAnyFieldEmpty()}
            >
              Log In
            </button>
          </form>
          <div className="mt-4 text-gray-700 text-sm">
            <p>
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-500">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
