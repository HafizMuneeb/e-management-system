"use client";

import React, { useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { FaUserGraduate } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Link from "next/link";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    showPassword: false,
    confirmPassword: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const isUserNameValid = (): boolean => {
    return formData.username.length >= 6;
  };

  const isEmailValid = (): boolean => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData.email);
  };

  const isPasswordValid = (): boolean => {
    // Password should be at least 6 characters
    return formData.password.length >= 6;
  };

  const getPasswordStrength = (): string => {
    const { password } = formData;

    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length >= 8 && hasLetters && hasNumbers && hasSpecialChars) {
      return "Strong";
    } else if (password.length >= 6 && (hasLetters || hasNumbers)) {
      return "Moderate";
    } else {
      return "Weak";
    }
  };

  const getPasswordColor = (): string => {
    const strength = getPasswordStrength();

    switch (strength) {
      case "Strong":
        return "text-green-500";
      case "Moderate":
        return "text-orange-500";
      default:
        return "text-gray-500";
    }
  };

  const isPasswordMatch = (): boolean => {
    return formData.password === formData.confirmPassword;
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
            <div className="flex flex-col md:flex-row gap-4">
              <div className="mb-4 w-full relative">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-bold mb-2"
                >
                  User Name
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className={`w-full p-2 border rounded ${
                      isUserNameValid() ? "" : "border-red-500"
                    }`}
                    onChange={handleChange}
                    required
                  />
                  {!isUserNameValid() && (
                    <span className="absolute inset-y-1 right-0 pr-2 flex items-center">
                      <FaUserGraduate className="text-gray-400" />
                    </span>
                  )}
                </div>
                {!isUserNameValid() && (
                  <span className="text-red-500">User Name is Required</span>
                )}
              </div>
            </div>
            <div className="mb-2 w-full relative">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <div className="flex items-center">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  className={`w-full p-2 border rounded ${
                    isEmailValid() ? "" : "border-red-500"
                  }`}
                  onChange={handleChange}
                  required
                />
                {!isEmailValid() && (
                    <span className="absolute inset-y-1 right-0 pr-2 flex items-center">
                      <MdEmail className="text-gray-400" />
                    </span>
                  )}
              </div>
              {!isEmailValid() && (
                <span className="text-red-500">Email is Required</span>
              )}
            </div>
            <div className="mb-2 w-full relative">
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
                  className={`w-full p-2 border rounded ${getPasswordColor()}`}
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
              <div className={`mb-2 w-full text-sm ${getPasswordColor()}`}>
                {getPasswordStrength() &&
                  `Password Strength: ${getPasswordStrength()}`}
              </div>
            </div>
            <div className="mb-2 w-full relative">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-bold mb-2"
              >
                Confirm Password
              </label>
              <div className="flex items-center">
                <input
                  type={formData.showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`w-full p-2 border rounded ${
                    isPasswordMatch() ? "border-green-500" : "border-red-500"
                  }`}
                  onChange={handleChange}
                  required
                />
                <span
                  className="absolute inset-y-0 right-0 top-7 pr-2 flex items-center cursor-pointer"
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
              {!isPasswordMatch() && (
                <span className="text-red-500">Passwords do not match</span>
              )}
            </div>
            <div className="mb-2 w-full text-right">
              <a href="#" className="text-blue-500">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded w-full"
              disabled={isAnyFieldEmpty()}
            >
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-gray-700 text-sm">
            <p>
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
