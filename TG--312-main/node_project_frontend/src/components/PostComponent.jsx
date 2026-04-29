import React, { useContext, useRef, useState } from 'react'
import { FcAddImage } from 'react-icons/fc'
import EmojiPicker from 'emoji-picker-react'
import { BsEmojiWink } from "react-icons/bs"
import { toast } from 'react-toastify'
import UserContext from '../context/UserContext'

const PostComponent = () => {
  let ctx = useContext(UserContext)
  console.log(ctx)

  let inputRef = useRef()
  let token = localStorage.getItem("g6Social")

  const [show, setShow] = useState(false)
  const [image, setimage] = useState('')

  function handleEmojiClick() {
    setShow(!show)
  }

  function handleEmoji(e) {
    console.log(e.emoji)
    let inputValue = inputRef.current.value
    let ans = inputValue + e.emoji
    inputRef.current.value = ans
  }

  function handleInputChanger(e) {
    console.log(e.target)
    console.log(e.target.files)
    console.log(e.target.files[0])
    setimage(e.target.files[0])
  }

  async function handleSubmit() {
    let formData = new FormData()
    formData.append("title", inputRef.current.value)
    formData.append("image", image)

    let res = await fetch('https://socialmediaapp-aqir.onrender.com/posts/create', {
      method: 'POST',
      headers: {
        authorization: token
      },
      body: formData
    })

    let data = await res.json()
    console.log(data)
    toast.success(data.msg)
    inputRef.current.value = ""
    setimage('')
  }

  return (
    <div className='w-full flex justify-center px-4 mt-8'>
      <div className='w-full max-w-[560px] bg-white border border-gray-200 rounded-2xl shadow-md p-5 relative'>
        
        <div className='flex items-start gap-4'>
          <img
            src={ctx.userData?.user?.profilePic}
            className='w-12 h-12 rounded-full object-cover border border-gray-300'
            alt='profile'
          />

          <div className='flex-1'>
            <textarea
              ref={inputRef}
              className='w-full min-h-[120px] resize-none border border-gray-200 rounded-2xl p-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 text-gray-800 placeholder:text-gray-400'
              placeholder="What's on your mind...?"
            ></textarea>
          </div>
        </div>

        {image && (
          <div className='mt-4 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100'>
            <img
              className='w-full max-h-[380px] object-cover'
              src={URL.createObjectURL(image)}
              alt='Preview'
            />
          </div>
        )}

        <input onChange={handleInputChanger} type="file" hidden id='file' />

        <div className='mt-4 pt-4 border-t border-gray-100 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <label
              htmlFor='file'
              className='cursor-pointer p-2 rounded-full hover:bg-gray-100 transition'
            >
              <FcAddImage size={30} />
            </label>

            <button
              type='button'
              onClick={handleEmojiClick}
              className='p-2 rounded-full hover:bg-gray-100 transition'
            >
              <BsEmojiWink color='orange' size={24} />
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-full transition shadow-sm'
          >
            Post
          </button>
        </div>

        <div className='absolute top-full left-0 mt-2 z-50'>
          <EmojiPicker open={show} theme='dark' onEmojiClick={handleEmoji} />
        </div>
      </div>
    </div>
  )
}

export default PostComponent