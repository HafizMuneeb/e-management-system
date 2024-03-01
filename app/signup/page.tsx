"use client"

import Link from 'next/link';
import { useState } from 'react';
import { useTypewriter } from 'react-simple-typewriter';
import axios from "axios"
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  })

  const onChangeHandler = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((form) => ({...form, [name]: value}));
  }
  

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/users/signup", formData)
      console.log(response);
      
      toast.success(response.data.msg, {
        onClose: () => {
          router.push("/login")
        }
      })

      // router.push("/login")
    } catch (error) {
      console.log("Error Occured while creating user");
      
    }
  }

    const [text] = useTypewriter({
      words: ['School Management System'],
      loop: 0
    })


  return (
    <div className="w-full h-screen  bg-sky-200 flex justify-center items-center">
      <div className="w-[400px] h-[520px] shadow-sm shadow-black bg-gray-500 rounded-md flex flex-col justify-center items-center">
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-xl text-[#A6AAE1] font-bold'>Welcome To</h1>
          <h4 className='text-md text-[#A6AAE1]'>{text}</h4>
        </div>
        <div className=''>
          <h1 className='text-xl text-white font-bold'>Sign Up Now</h1>
        </div>
        <div className='w-full'>
          <ToastContainer />
          <form
            onSubmit={onSubmitHandler}
            className='w-full flex flex-col flex-wrap justify-center items-center mt-3 gap-3'
          >
            <input type="text" placeholder='User Name' name='username' 
              onChange={onChangeHandler}
              value={formData.username}
              className='w-[80%] text-lg text-blue-950 py-2 rounded-md placeholder:text-blue-600 focus:outline-none focus:ring focus:ring-blue-300'
            />
            <input type="email" placeholder='Email' name='email' 
              onChange={onChangeHandler}
              value={formData.email}
              className='w-[80%] text-lg text-blue-950 py-2 rounded-md placeholder:text-blue-600 focus:outline-none focus:ring focus:ring-blue-300'
            />
            <input type="password" placeholder='Password' name='password' 
              onChange={onChangeHandler}
              value={formData.password}
              className='w-[80%] text-lg text-blue-950 py-2 rounded-md placeholder:text-blue-600 focus:outline-none focus:ring focus:ring-blue-300'
            />
            <input type="number" placeholder='Phone Number' name='phone' 
              onChange={onChangeHandler}
              value={formData.phone}
              className='w-[80%] text-lg text-blue-950 py-2 rounded-md placeholder:text-blue-600 focus:outline-none focus:ring focus:ring-blue-300'
            />
            <input type="password" placeholder='Confirm Password' name='confirmPassword' 
              onChange={onChangeHandler}
              value={formData.confirmPassword}
              className='w-[80%] text-lg text-blue-950 py-2 rounded-md placeholder:text-blue-600 focus:outline-none focus:ring focus:ring-blue-300'
            />
            
          </form>
        </div>
        <div className='flex self-start mt-3 px-10'>
          <input type="checkbox" />
          <p className='px-2 text-white text-md'>I agree the terms and conditions</p>
        </div>
        <div className='flex self-start px-10'> 
          <input type="checkbox" />
          <h1 className='px-2 text-white text-md'> Remeber Me</h1>
        </div>
        <button onClick={onSubmitHandler} type='submit' className='bg-blue-500 px-[50px] py-2 text-white text-lg font-bold rounded-full shadow-md shadow-yellow-300'>Submit</button>
        <div className='flex self-start px-10 mb-3 mt-3'>
          <h1 className='px-2 text-white text-md'>Already have an account</h1>
          <Link href="/login" className='text-blue-700 border-b-red-800'>Login Here</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup