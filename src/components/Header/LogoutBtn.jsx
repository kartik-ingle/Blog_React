import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Button from '../Button'

function LogoutBtn() {
    const dispatch = useDispatch()
    const {setUser} = useAuth();
    const navigate = useNavigate();

    const logouthandler = async () => {
        authService.logout().then(() => {
            dispatch(logout())
        })

        try {
          await authService.logout();
          dispatch(logout());
          setUser(null)
          navigate('/')
        } catch (error) {
          throw error
        }
    }
  return (
    <button className="inline-block px-6 py-2 duration-200 rounded-full cursor-pointer text-black dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700"
    onClick={logouthandler}
    >Logout</button>
  )
}

export default LogoutBtn
