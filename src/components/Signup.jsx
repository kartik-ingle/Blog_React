import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if(userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center'>
      <div className="mx-auto w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl p-10 border border-gray-200 dark:border-gray-700">
        <div className='mb-2 flex justify-center'>
            <span className='inline-block w-full max-w-[100px]'>
                <Logo width='100%' />
            </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight text-gray-900 dark:text-white'>
            Sign up to create account
        </h2>
        <p className='mt-2 text-center text-base text-gray-600 dark:text-gray-400'>
            Already have an account?&nbsp;
            <Link
                to="/login"
                className='font-medium text-primary transition-all duration-200 hover:underline'
            >
                Sign In
            </Link>
        </p>
        {error && <p className='text-red-600 mt-8 text-center'> {error} </p> }

        <form onSubmit={handleSubmit(create)}>
            <div className='space-y-5'>
                <Input 
                    label = "Full Name: "
                    placeholder = "Enter your full name"
                    {...register("name", {
                        required: true
                    })}
                />
                <Input 
                    label = "Email: "
                    placeholder = "Enter your email"
                    type = "email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm.test(value) || "Email address must be valid"
                        }
                    })}
                />
                <Input
                    label = "Password"
                    placeholder = "Enter Password"
                    type = "password"
                    {...register("password", {
                        required: true
                    })}
                />

                <Button
                    type = "submit"
                    className = "w-full"
                >
                    Create Account
                </Button>
            </div>
        </form>
      </div>

    </div>
  )
}

export default Signup
