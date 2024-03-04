"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignUp = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (user.username.length < 6) {
      newErrors.username = "Username must be at least 6 characters";
      valid = false;
    } else {
      newErrors.username = "";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    } else {
      newErrors.email = "";
    }

    if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post("/api/users/signup", user);
        console.log(response.data);
        router.push("/login")
        // Redirect or handle success as needed
      } catch (error) {
        console.error("Error creating user:", error);
        // Handle error, show error message, etc.
      }
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-r from-[#24B29A] to-[#199B93] flex justify-center items-center">
      <div className="w-full md:w-[70%] lg:w-[60%] h-[70%] md:flex mx-auto">
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
        <div className="w-full md:w-[50%] h-full bg-white p-8 flex flex-col justify-center items-center">
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <div className="mb-4 w-full relative">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={user.username}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <span style={{ color: "red" }}>{errors.username}</span>
            </div>
            <div className="mb-4 w-full relative">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                placeholder="example@gmail.com"
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <span style={{ color: "red" }}>{errors.username}</span>
            </div>
            <div className="mb-4 w-full relative">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                placeholder=""
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <span style={{ color: "red" }}>{errors.username}</span>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded w-full">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};


export default SignUp;