import React, { useRef } from 'react'
import { useNavigate , Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  const emailInput = useRef()
  const passwordInput = useRef()
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()

    const obj = {
      email: emailInput.current.value.trim(),
      password: passwordInput.current.value.trim()
    }

    if (!obj.email || !obj.password) {
      toast.error("All fields are required")
      return
    }

    try {
      const res = await fetch('http://localhost:8090/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })

      const data = await res.json()

      console.log("Status:", res.status)
      console.log("Response:", data)

      if (!res.ok) {
        toast.error(data.msg || "Invalid email or password")
        return
      }

      toast.success(data.msg || "Login successful")

      if (data.token) {
        localStorage.setItem("g6Social", data.token)
      }

      navigate('/')

    } catch (error) {
      console.log(error)
      toast.error("Server error. Please try again.")
    }
  }

  return (
    <div className='min-h-[85vh] flex items-center justify-center bg-gray-50 px-4'>
      <form
        onSubmit={handleLogin}
        className='w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-8 flex flex-col gap-5'
      >
        <div className='text-center mb-2'>
          <h1 className='text-3xl font-bold text-gray-800'>Welcome Back</h1>
          <p className='text-gray-500 text-sm mt-1'>Login to continue to your account</p>
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-sm font-medium text-gray-700'>Email</label>
          <input
            ref={emailInput}
            className='border border-gray-300 px-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition'
            type="email"
            placeholder='Enter your email'
            required
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-sm font-medium text-gray-700'>Password</label>
          <input
            ref={passwordInput}
            className='border border-gray-300 px-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition'
            type="password"
            placeholder='Enter your password'
            required
          />
        </div>

        <button
          type="submit"
          className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition shadow-sm mt-2'
        >
          Login
        </button>
        <Link to="/forgetpassword" className='text-blue-600 font-medium cursor-pointer hover:underline'>
          Forgot Password?
        </Link>

        <p className='text-center text-sm text-gray-500 mt-1'>
          Don’t have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            className='text-blue-600 font-medium cursor-pointer hover:underline'
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  )
}

export default Login