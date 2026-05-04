import React,{useState} from 'react'
import UserContext from './UserContext'

const UserSlice = (props) => {
    let token = localStorage.getItem("token");
    const [userData , setUserData] = useState({
        token : token?token : "",
        user:""
    })

    async function getUserData(){
        try {
            let res= await fetch("https://socialmediaapp-aqir.onrender.com/users/loggedInUser",{
                method:"GET",
                headers:{
                    'authorization': token,
                }
            })
            if (!res.ok) {
                console.error('Failed to fetch user data:', res.status);
                return;
            }
            let data = await res.json();
            if (data.user) {
                setUserData({...userData , user:data.user})
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

  return (
    <UserContext.Provider value={{getUserData , userData}}>
        {props.children}      
    </UserContext.Provider>
  )
}

export default UserSlice
