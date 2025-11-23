import React  from 'react'
import { useNavigate } from 'react-router'

function HomePage() {

    const navigate = useNavigate(); 



  return (
    <div className='flex justify-center items-center mx-auto my-auto bg-black h-screen '>
        <div className='text-center text-yellow-300 '>
            <h1 className='text-6xl font-bold font-["Playfair_Display"] text-shadow-yellow-400 text-shadow-md'>Welcome to the GitHub Devs Cards</h1>
            <p className='mt-4 text-3xl text-shadow-yellow-400 text-shadow-sm'>Make beautiful and reuseable Github Dev Cards</p>
            <button onClick={() => navigate("/register")} className='mt-8 px-4 py-2 bg-yellow-400 text-black rounded-xl cursor-pointer hover:bg-yellow-500 text-xl transition-colors duration-300 shadow-sm shadow-yellow-300'>REGISTER YOURSELF</button>
        </div>
        
    </div>
  )
}

export default HomePage