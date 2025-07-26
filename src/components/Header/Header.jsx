import React, { useState } from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import ThemeToggle from '../ThemeToggle'



function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const isLoggedIn = useSelector((state) => state.auth.status)
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false)
  }

  const navLinkClasses = ({ isActive }) =>
  isActive
    ? "px-6 py-2 rounded-full bg-blue-600 text-white font-semibold transition duration-200"
    : "px-6 py-2 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 text-black dark:text-white transition duration-200";


  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: 'Login',
      slug: "/login",
      active: !authStatus
    }, 
    {
      name: 'SignUp',
      slug: "/signup",
      active: !authStatus
    }, 
    {
      name: 'All Posts',
      slug: "/all-posts",
      active: authStatus
    }, 
    {
      name: 'Add Post',
      slug: "/add-post",
      active: authStatus
    }, 
  ]
  return (
    <header className='bg-white dark:bg-gray-900 text-black dark:text-white shadow-md transition-colors duration-300'>
      <Container>
        <nav className='flex flex-row items-center justify-between gap-4 py-4'>
          <div className='mr-4'>
            <Link to='/'>
            <Logo width='70px' />
            </Link>
          </div>
          <div className='md:hidden'>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <i className='fa-solid fa-x text-2xl cursor-pointer'></i>  // Close icon
              ) : (
                <i className='fa-solid fa-bars text-2xl cursor-pointer'></i> // Hamburger icon
              )}
            </button>
          </div>
          <div className={`hidden md:block ${menuOpen ? 'hidden' : 'block'}`}>
            <ul className='flex items-center gap-3'>
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <NavLink to={item.slug} className={navLinkClasses}>
                      {item.name}
                    </NavLink>
                  </li>
                ) : null
              )}
              {authStatus && <LogoutBtn />}
              <ThemeToggle />
            </ul>
          </div>

          <div className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-900 shadow-lg z-50 transform transition-all duration-100 ease-in-out
            ${menuOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
            <div className="flex flex-col gap-3 p-6">
              {navItems.map((item) =>
                item.active ? (
                  <NavLink
                    key={item.name}
                    to={item.slug}
                    className={navLinkClasses}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                ) : null
              )}
              {authStatus && (
                <LogoutBtn onClick={() => setMenuOpen(false)} />
              )}
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header
