import React,{useState} from 'react'
import UserContext from './UserContext'

const UserSlice = (props) => {
    let token = localStorage.getItem("token");
    const [userData , setUserData] = useState({
        token : token?token : "",
        user:""
    })

    async function getUserData(){
        let res= await fetch("https://socialmediaapp-aqir.onrender.com/users/loggedInUser",{
            method:"GET",
            headers:{
                'authorization': token,
            }
        })
        let data = await res.json();
        setUserData({...userData , user:data.user})
    }

  return (
    <UserContext.Provider value={{getUserData , userData}}>
        {props.children}      
    </UserContext.Provider>
  )
}

export default UserSlice
