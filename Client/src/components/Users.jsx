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

   
    <div className='flex flex-col justify-center items-center'>
        {users.length === 0 ? <div className=''>No registered Users yet</div> : 
        <div className='flex flex-col justify-center items-center w-full'>
            <div className='w-full p-4 bg-black text-center border-b-green-500 shadow-green-600 fixed top-0 left-0'>
                <h1>ALL THE REGISTERED GIT-HUB DEVS</h1>
            </div>

            <div className='flex flex-wrap flex-1 mb-5 mt-24 justify-center items-center w-7xl rounded-2xl bg-red-400 p-4'>
                {users.map((user)=>(
                    <div key={user._id} className='bg-neutral-300 rounded-2xl p-3 text-center felx flex-col justify-center items-center gap-4'>
                    <h3>{user.fullname}</h3>
                    <p>{user.username}</p>
                    <p>{user.email}</p>
                    <a href={`https://github.com/${user.githubId}`} target='_blank' className='text-red-400 inline-block text-sm'>
                        Github : {user.githubId}
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