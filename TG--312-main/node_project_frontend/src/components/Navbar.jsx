import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='bg-green-300 flex justify-between'>
      <h1>SocialMedia</h1>
      <ul className='flex gap-3'>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/login'}>Login</Link></li>
        <li><Link to={'/signup'}>Sign Up</Link></li>
      </ul>
    </div>
  )
}

export default Navbar