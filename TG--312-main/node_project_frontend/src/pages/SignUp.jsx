import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Signup = () => {
  let nameInput = useRef()
  let emailInput = useRef()
  let passwordInput = useRef()

  let navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    let obj = {
      name: nameInput.current.value.trim(),
      email: emailInput.current.value.trim(),
      password: passwordInput.current.value.trim()
    }

    console.log(obj)

    if (!obj.name || !obj.email || !obj.password) {
      toast.error('All fields are required')
      return
    }

    try {
      let res = await fetch('https://socialmediaapp-aqir.onrender.com/users/register', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(obj)
      })

      let data = await res.json()

      if (res.status === 200 || res.status === 201) {
        toast.success(data.msg)
        navigate('/login')
      } else {
        toast.error(data.msg)
      }
    } catch (error) {
      console.log(error)
      toast.error('Server error. Please try again.')
    }
  }

  return (
    <div className='min-h-[85vh] flex justify-center items-center bg-gray-50 px-4'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-8 flex flex-col gap-5'
      >
        <div className='text-center mb-2'>
          <h1 className='text-3xl font-bold text-gray-800'>Create Account</h1>
          <p className='text-sm text-gray-500 mt-1'>Join and start sharing your moments</p>
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-sm font-medium text-gray-700'>Name</label>
          <input
            ref={nameInput}
            className='border border-gray-300 px-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition'
            type='text'
            placeholder='Enter your name'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-sm font-medium text-gray-700'>Email</label>
          <input
            ref={emailInput}
            className='border border-gray-300 px-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition'
            type='email'
            placeholder='Enter your email'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-sm font-medium text-gray-700'>Password</label>
          <input
            id='p'
            ref={passwordInput}
            className='border border-gray-300 px-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition'
            type='password'
            placeholder='Enter your password'
          />
        </div>

        <button
          type='submit'
          className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition shadow-sm mt-2'
        >
          Sign Up
        </button>

        <p className='text-center text-sm text-gray-500 mt-1'>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className='text-blue-600 font-medium cursor-pointer hover:underline'
          >
            Login
          </span>
        </p>
      </form>
    </div>
  )
}

export default Signup