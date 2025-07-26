// components/ThemeToggle.jsx
import React from 'react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme} className="text-xl p-2 cursor-pointer rounded-xl hover:bg-gray-300 duration-200 dark:hover:bg-gray-600">
      {theme === 'dark' ? (
        <i className="fa-solid fa-sun text-yellow-400"></i>
      ) : (
        <i className="fa-solid fa-moon text-gray-800"></i>
      )}
    </button>
  )
}
