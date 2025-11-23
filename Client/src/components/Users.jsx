import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../Services/Api'
import { useNavigate } from 'react-router';

function Users() {

    const navigate = useNavigate();
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

    const handleClick = (id) =>{
        navigate(`/users/${id}`);
    }

  return (


    <div className='flex flex-col justify-center items-center h-screen w-full text-black'>
        {users.length === 0 ? <div className='flex justify-center items-center bg-black text-yellow-300  text-5xl h-screen w-full'>No registered Users yet</div>
        : 
        <div className='flex flex-col justify-center items-center w-full'>
            <div className='w-full p-4 py-6 bg-black text-center  shadow-lg shadow-yellow-300 fixed top-0 left-0 text-white'>
                <h1 className='text-xl tracking-wider text-yellow-300'>ALL THE REGISTERED GIT-HUB DEVS</h1>
            </div>
            
            <div className='flex flex-wrap mt-24 justify-center items-center bg-black p-4 h-screen overflow-y-auto w-full gap-10 '>
                {users.map((user)=>(
                    <div key={user._id} className='bg-gray-200 rounded-2xl p-8 h-[400px] text-center flex flex-col justify-center items-center gap-2 w-80 shadow-lg shadow-yellow-300   /50'>
                        <button onClick={() => handleClick(user._id)} className='bg-neutral-300 w-full flex justify-center items-center rounded-2xl hover:bg-neutral-200 cursor-pointer transition-all duration-200 p-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke-width="1.5" 
                                stroke="currentColor" 
                                className="size-15">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </button>
                    <h3 className='p-2 text-xl'> username : {user.username}</h3>
                    <p className='p-2 text-xl'> fullname : {user.fullname}</p>
                    <p className='p-2 text-xl'> email : {user.email}</p>
                    <a href={`https://github.com/${user.githubUsername}`} target='_blank' className='text-white inline-block text-xl bg-sky-400 p-2 rounded-full hover:bg-sky-300 hover:text-black transition-all duration-200 w-full'>
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