import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import { useDispatch } from 'react-redux'
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")
    const {setUser} = useAuth();

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if(session) {
                const userData = await authService.getCurrentUser()
                if(userData) {
                    dispatch(authLogin(userData))   // ✅ Redux
                    setUser(userData)              // ✅ Context (to update Home.jsx immediately)
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center w-full my-10'>
        <div className="mx-auto w-full max-w-lg bg-gray-100 dark:bg-gray-800 rounded-xl p-10 border border-black/10 dark:border-white/10 shadow-md">
            <div className='mb-2 flex justify-center'>
                {/* <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100%' />
                </span> */}
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight text-black dark:text-white'>Sign in to your account</h2>
            <p className='mt-2 text-center text-base text-black/60 dark:text-white/60'>
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className='font-medium text-primary transition-all duration-200 hover:underline'
                >
                    Sign Up
                </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>
                {error}
                      </p> 
            }

            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                        label = "Email: "
                        placeholder="Enter your email"
                        type = "email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm.test(value) || "Email address must be valid"
                            }
                        })}
                    />

                    <Input 
                        label = "Password: "
                        placeholder = "Enter password"
                        type = "password"
                        {...register("password", {
                            required: true
                        })}
                    />
                    <Button
                        type="Submit"
                        className = "w-full"
                    >
                        Sign in
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
