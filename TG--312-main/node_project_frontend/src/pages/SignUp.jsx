import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {

  let nameInput = useRef();  //{current:undefined}  ,{current:input}
  let emailInput = useRef();
  let passwordInput = useRef();

  let navigate = useNavigate()

 async function handleSubmit(e){
      e.preventDefault();

      let obj = {
        name:nameInput.current.value,
        email:emailInput.current.value,
        password:passwordInput.current.value
      }
      console.log(obj)

      let res = await fetch('http://localhost:8090/users/register',{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(obj)
      })

      let data = await res.json();
      if(res.status==200 || res.status==201){
        toast.success(data.msg);
        navigate('/login')
      }
      else{
        toast.error(data.msg)
      }
  }

  return (
    <div className='h-[80vh] flex justify-center items-center'>
        <form action="" className='flex flex-col gap-4 w-[60%]'>
          <label htmlFor="">Name</label>
          <input ref={nameInput} className='border px-3 py-2 rounded-md' type="text" placeholder='enter your name' />

          <label htmlFor="">Email</label>
          <input ref={emailInput} className='border px-3 py-2 rounded-md' type="email" placeholder='enter your email' />

          <label htmlFor="">Password</label>
          <input id='p' ref={passwordInput} className='border px-3 py-2 rounded-md' type="password" placeholder='enter your password' />

          <button onClick={handleSubmit} className='bg-amber-600 rounded py-2 px-4 w-max block m-auto'>Submit</button>
        </form>
    </div>
  )
}

export default Signup