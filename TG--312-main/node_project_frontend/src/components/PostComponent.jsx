

import React,{useRef , useState} from 'react'
import { FcAddImage } from 'react-icons/fc'
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiWink } from "react-icons/bs";
import { toast } from 'react-toastify'

const PostComponent = () => {
    
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
  const [image , setimage]=useState('');
  function handleInputChanger(e){
    console.log(e.target)
    console.log(e.target.files)
    console.log(e.target.files[0])
    setimage(e.target.files[0])

  }
  async function handleSubmit(){
    let formData = new FormData();
    formData.append("title",inputRef.current.value)
    formData.append("image",image)
    let res=await fetch('http://localhost:8090/posts/create', {
      method: 'POST',
      headers:{
        "authorization": token
      },
      body: formData
    });
    let data=await res.json();
    console.log(data)
    toast.success(data.msg )
    inputRef.current.value="";
    setimage('')

  }
  return (
    <div>
      <div className='w-[40%] p-4 relative m-auto mt-10 border rounded-md'>
        <div className='  mb-2 flex item-center gap-2'>
        <textarea ref={inputRef} className='border p-2 w-full outline-olive-950 rounded-2x1' name="" placeholder='whats in your mind..?' id=''></textarea>
        <button onClick={handleSubmit} className='bg-amber-600 rounded py-2 px-4 w-max block m-auto text-white'>Post</button>
        
      </div>


        <input onChange={handleInputChanger} type="file" hidden id='file' />
        <div className='flex items-center gap-2'>
          <label htmlFor='file'>
          <FcAddImage size={30}/>
          
        </label>
        <BsEmojiWink onClick={handleEmojiClick} color='orange' size={25}/>
        
        </div>
        <div className='absolute top-full mt-2 '>
          <EmojiPicker open={show} theme='dark' onEmojiClick={handleEmoji}/>
          </div>
            {image && <div>
               <img className='w-full h-full object-cover' src={URL.createObjectURL(image)} alt="Preview" />
            </div>}
      </div>
    </div>
  )
}

export default PostComponent
