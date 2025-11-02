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
            
            <div className='flex flex-wrap mb-5 mt-24 justify-center items-center rounded-2xl bg-black p-4 h-screen overflow-y-auto w-full'>
                {users.map((user)=>(
                    <div key={user._id} className='bg-white rounded-2xl p-3 text-center flex flex-col justify-center items-center gap-2 w-70 shadow-lg shadow-green-400/50'>
                        <div className='bg-neutral-200 w-full flex justify-center items-center rounded-2xl'>
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke-width="1.5" 
                                stroke="currentColor" 
                                className="size-15">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </div>
                    <h3 className='p-2 text-xl'> username : {user.username}</h3>
                    <p className='p-2 text-xl'> fullname : {user.fullname}</p>
                    <p className='p-2 text-xl'> email : {user.email}</p>
                    <a href={`https://github.com/${user.githubUsername}`} target='_blank' className='text-white inline-block text-xl bg-sky-400 p-2 rounded-full hover:bg-sky-300 hover:text-black transition-all duration-200 w-full'>
                        Github : {user.githubUsername}
                    </a>
                    <div className='flex justify-center items-center gap-20 mt-2 w-full'>
                        <button className='bg-red-600 p-2 text-white rounded-full hover:bg-red-400 hover:text-black cursor-pointer transition-all duration-200 '>
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke-width="1.5" 
                                stroke="currentColor" 
                                className="size-7">
                            <path stroke-linecap="round" 
                                stroke-linejoin="round" 
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>

                            <button className='bg-green-500 p-2 rounded-full hover:bg-green-400 hover:text-white cursor-pointer transition-all duration-200'>
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke-width="1.5" 
                                stroke="currentColor" 
                                class="size-7">
                            <path stroke-linecap="round" 
                                stroke-linejoin="round" 
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                            </button>
                    </div>
                    </div>
                ))}
            </div> 
        </div>   
        } 
    </div>
  )
}

export default Users