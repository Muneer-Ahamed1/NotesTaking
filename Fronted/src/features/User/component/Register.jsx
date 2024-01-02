import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import {Link} from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux'
import {registerSlice} from "../userSlice";
export default function Register() {
    const [formData,setFormData]=useState({});
    const dispatch=useDispatch();
    const error=useSelector((state)=>state.User.error);

function formValidation(e){
    console.log(formData);
    setFormData({...formData,[e.target.name]:e.target.value});

}
function onSubmitForm(e) {
   e.preventDefault();
    if(formData['userName'] && formData["email"] && formData['password']===formData['confirm-password']){
        alert("Registered Successfully")
    }
    console.log("iafdfsdfs")
    dispatch(registerSlice(formData));
    

}

  return (
    <section className=' bg-slate-100'>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 bg-white">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Already have an account?{' '}
            <Link
              href="#"
              title=""
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          <form onSubmit={(e)=>onSubmitForm(e)} className="mt-8" >
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="text-base font-medium text-gray-900">
                  {' '}
                  User Name{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="User Name"
                    id="name"
                    name='userName'
                    onChange={(e)=>formValidation(e)}

                  ></input>
                </div>
                <p className=' text-red-600'>{(error.err && error.message["userName"] && !formData["userName"])?(error.message["userName"].message):""}</p>
              </div>
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
                    name='email'
                    onChange={(e)=>formValidation(e)}
                  ></input>
                </div>
                <p className=' text-red-600'>{(error.err && error.message["email"] && !formData["email"])?(error.message["email"].message):""}</p>

              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id="password"
                    name='password'
                    onChange={(e)=>formValidation(e)}

                  ></input>
                </div>
                <p className=' text-red-600'>{(error.err && error.message["password"] && !formData["password"])?(error.message["password"].message):""}</p>

              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    {' '}
                    Confirm Password{' '}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Confirm Password"
                    id="confirm-password"
                    name='confirm-password'
                    onChange={(e)=>formValidation(e)}

                  ></input>
                </div>
                <p className=' text-red-600'>{( formData['confirm-password'] && formData["password"]!==formData["confirm-password"])?("Password mismatch"):""}</p>

              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Create Account <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
         
        </div>
      </div>
    </section>
  )
}
