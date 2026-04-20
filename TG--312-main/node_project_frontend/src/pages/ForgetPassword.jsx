import React , {useRef} from 'react'

const ForgetPassword = () => {

    let inputRef = useRef()

    async function handleSubmit(){
        let obj={
            email: inputRef.current.value
        }
        console.log(obj)
        let res = await fetch("http://localhost:8090/users/forgetpassword",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        })
        let data = await res.json()
        console.log(data)   
    }

  return (
    <div className='flex justify-center items-center h-[70vh]'>
      <div className='flex flex-col gap-4 border border-gray-300 rounded-lg p-6 w-full max-w-md bg-white shadow-md'>
        <input ref={inputRef} type="email" placeholder='Enter your email' />
        <button onClick={handleSubmit}className='bg-green-200 hover:bg-green-400 text-white px-2 py-1 rounded'>Submit</button>
      </div>
    </div>
  )
}

export default ForgetPassword
