import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='w-full bg-white/90 backdrop-blur-md border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-50'>
      <h1 className='text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent'>
        SocialMedia
      </h1>

      <ul className='flex items-center gap-4 md:gap-6 text-sm md:text-base font-medium'>
        <li>
          <Link
            to='/'
            className='text-gray-700 hover:text-purple-600 transition duration-200'
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to='/login'
            className='text-gray-700 hover:text-purple-600 transition duration-200'
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            to='/signup'
            className='bg-gradient-to-r from-purple-500 to-blue-500 text-white px-5 py-2 rounded-full hover:scale-105 transition duration-200 shadow-md'
          >
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar