import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
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

    // Basic frontend validation
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

      // ❌ If login failed
      if (!res.ok) {
        toast.error(data.msg || "Invalid email or password")
        return   // ⛔ STOP — do not navigate
      }

      // ✅ If login successful
      toast.success(data.msg || "Login successful")

      // Save token if backend sends it
      if (data.token) {
        localStorage.setItem("g6Social", data.token)
      }

      navigate('/')  // ✅ redirect to home

    } catch (error) {
      console.log(error)
      toast.error("Server error. Please try again.")
    }
  }

  return (
    <div className='h-[80vh] flex justify-center items-center'>
      <form 
        onSubmit={handleLogin} 
        className='flex flex-col gap-4 w-[60%]'
      >

        <label>Email</label>
        <input
          ref={emailInput}
          className='border px-3 py-2 rounded-md'
          type="email"
          placeholder='Enter your email'
          required
        />

        <label>Password</label>
        <input
          ref={passwordInput}
          className='border px-3 py-2 rounded-md'
          type="password"
          placeholder='Enter your password'
          required
        />

        <button
          type="submit"
          className='bg-amber-600 rounded py-2 px-4 w-max block m-auto text-white'
        >
          Login
        </button>

      </form>
    </div>
  )
}

export default Login