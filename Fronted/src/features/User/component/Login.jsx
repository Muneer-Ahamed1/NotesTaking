import React,{useEffect, useState} from 'react'
import { ArrowRight } from 'lucide-react'
import {loginSlice} from "../userSlice"
import { useDispatch, useSelector } from 'react-redux'
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'
export default function Login() {
    const dispatch=useDispatch();
    const[formData,setFormData]=useState({});
    const error=useSelector((state)=>state.User.error);
    const isLogin=useSelector((state)=>state.User.isLogin);

    console.log(error);
    const onSubmitForm=(e)=>{
        e.preventDefault();
        console.log(formData);
        dispatch(loginSlice(formData));

    }
    const navigate=useNavigate();
  useEffect(()=>{
    if(isLogin) {
      navigate("/dashboard")
      

    }
  },[isLogin])  
  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 bg-slate-50">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Don&apos;t have an account?{' '}
            <a
              href="#"
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Create a free account
            </a>
          </p>
          <form className="mt-8" onSubmit={(e)=>onSubmitForm(e)}>
            <div className="space-y-5">
              <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    name='email'
                    onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})}
                    value={formData[name]}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                  <a href="#" title="" className="text-sm font-semibold text-black hover:underline">
                    {' '}
                    Forgot password?{' '}
                  </a>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    name='password'
                    onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})}
                    value={formData[name]}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Get started <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
         
        </div>
      </div>
    </section>
  )
}
