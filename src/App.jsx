import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import {Header, Footer} from './components'
import {Outlet} from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const [darkMode, setdarkMode] = useState(() => 
    localStorage.getItem('theme') === 'dark'
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode])

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if(userData) {
          dispatch(login({userData}))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => {setLoading(false)})
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap justify-between bg-gray-100 dark:bg-gray-900 text-black dark:text-white'>
      
      <div className="w-full block">
        <Header />
        <main className='min-h-[80vh] px-4 py-6'>
          <Outlet />
        </main>
        <Footer className='' />
      </div>
    </div>
  ) : null

}

export default App
