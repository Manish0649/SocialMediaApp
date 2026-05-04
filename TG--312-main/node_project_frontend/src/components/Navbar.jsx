import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
      setIsSearchFocused(false)
    }
  }

  return (
    <nav className='w-full bg-gradient-to-r from-white/95 via-gray-50/95 to-white/95 backdrop-blur-xl border-b border-gray-200/30 px-8 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg shadow-gray-200/50'>
      {/* Logo */}
      <h1 className='text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer animate-bounce' style={{animationDuration: '3s'}}>
        SocialMedia
      </h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className='flex-1 mx-8'>
        <div className={`relative w-full max-w-md transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholder='Search posts or users...'
            className='w-full px-5 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-300 rounded-full focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-200/50 transition-all duration-300 shadow-md hover:shadow-lg text-gray-700 placeholder-gray-500 font-medium'
          />
          <button
            type='submit'
            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-all duration-300 p-2 rounded-full hover:bg-purple-100/50'
          >
            <svg className='w-5 h-5 transition-transform duration-300 hover:scale-110' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
            </svg>
          </button>
        </div>
      </form>

      {/* Navigation Links */}
      <ul className='flex items-center gap-4 md:gap-8 text-sm md:text-base font-medium'>
        <li>
          <Link
            to='/'
            className='text-gray-700 relative py-2 px-3 rounded-lg hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 group'
          >
            Home
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300'></span>
          </Link>
        </li>
        <li>
          <Link
            to='/login'
            className='text-gray-700 relative py-2 px-3 rounded-lg hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 group'
          >
            Login
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300'></span>
          </Link>
        </li>
        <li>
          <Link
            to='/signup'
            className='bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-purple-400/50 transition-all duration-300 hover:scale-105 font-semibold shadow-md relative overflow-hidden group'
          >
            <span className='relative z-10'>Sign Up</span>
            <span className='absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full'></span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar