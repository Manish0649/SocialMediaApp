import React,{useRef , useState} from 'react'
import { FcAddImage } from 'react-icons/fc'
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiWink } from "react-icons/bs";

const HomePage = () => {
  let inputRef=useRef();

  let token = localStorage.getItem("g6Social")
  const [show , setShow] = useState(false);

  function handleEmojiClick(){
    setShow(!show)
  }

  function handleEmoji(e){
    console.log(e.emoji)
    let inputValue=inputRef.current.value;
    let ans = inputValue + e.emoji;
    inputRef.current.value=ans;

  }

  return (
    <div>
      <div className='w-[40%] p-4 relative m-auto mt-10 border rounded-md'>
        <div className='  mb-2 flex item-center gap-2'>
        <textarea ref={inputRef} className='border p-2 w-full outline-olive-950 rounded-2x1' name="" placeholder='whats in your mind..?' id=''></textarea>
        <button className='bg-amber-600 rounded py-2 px-4 w-max block m-auto text-white'>Post</button>
        
      </div>


        <input type="file" hidden id='file' />
        <div className='flex items-center gap-2'>
          <label htmlFor='file'>
          <FcAddImage size={30}/>
          
        </label>
        <BsEmojiWink onClick={handleEmojiClick} color='orange' size={25}/>
        
        </div>
        <div className='absolute top-full mt-2 '>
          <EmojiPicker open={show} theme='dark' onEmojiClick={handleEmoji}/>
          </div>
      </div>
      
    </div>
  )
}

export default HomePage
