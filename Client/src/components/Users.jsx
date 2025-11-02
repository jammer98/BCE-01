import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../Services/Api'

function Users() {

    const [users,setUsers] = useState([]);
     
    const fetchAllUsers = async () =>{
        try {
            const res = await getAllUsers();
            setUsers(res.data);
        } catch (error) {
            console.log("could not fetch users",error)
        }
    }

    useEffect(()=>{
        fetchAllUsers();
    },[])

  return (


    <div className='flex flex-col justify-center items-center h-screen w-full text-black'>
        {users.length === 0 ? <div className='flex justify-center items-center bg-black text-green-400  text-5xl h-screen w-full'>No registered Users yet</div>
        : 
        <div className='flex flex-col justify-center items-center w-full'>
            <div className='w-full p-4 py-6 bg-black text-center  shadow-lg shadow-green-500/50 fixed top-0 left-0 text-white'>
                <h1 className='text-xl tracking-wider'>ALL THE REGISTERED GIT-HUB DEVS</h1>
            </div>

            <div className='flex flex-wrap mb-5 mt-24 justify-center items-center rounded-2xl bg-black p-4 h-screen gap-6 overflow-y-auto w-full'>
                {users.map((user)=>(
                    <div key={user._id} className='bg-white rounded-2xl p-3 text-center flex flex-col justify-center items-center gap-2 w-60 shadow-lg shadow-green-400/50'>
                    <h3> username : {user.username}</h3>
                    <p> fullname : {user.fullname}</p>
                    <p> email : {user.email}</p>
                    <a href={`https://github.com/${user.githubUsername}`} target='_blank' className='text-red-400 inline-block text-sm'>
                        Github : {user.githubUsername}
                    </a>
                    </div>
                ))}
            </div> 
        </div>   
        } 
    </div>
  )
}

export default Users