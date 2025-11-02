import React  from 'react'
import { useNavigate } from 'react-router'

function HomePage() {

    const navigate = useNavigate(); 



  return (
    <div className='flex justify-center items-center mx-auto my-auto bg-black h-screen '>
        <div className='text-center text-yellow-300 '>
            <h1 className='text-6xl font-bold'>Welcome to the Home Page</h1>
            <p className='mt-4 text-3xl'>Make beautiful Github Dev Cards</p>
            <button onClick={() => navigate("/register")} className='mt-8 px-4 py-2 bg-green-300 text-black rounded-xl cursor-pointer hover:bg-green-200 text-xl'>REGISTER YOURSELF</button>
        </div>
        
    </div>
  )
}

export default HomePage