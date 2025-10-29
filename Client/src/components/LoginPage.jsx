import React from 'react'

function LoginPage() {


    const handleSubmitForm=(e)=>{
        e.preventDefault(); 
    }


  return (
    <div className='h-screen w-screen bg-neutral-800 flex justify-center items-center'>
            <form action="submit" onSubmit={handleSubmitForm} className='w-1/2 max-w-lg px-5'>
                <div className='bg-black flex flex-col p-10 rounded-xl shadow-xl shadow-yellow-300 gap-4 border-2 border-yellow-200'>
                    <h1 className='text-yellow-300 text-shadow-2xs text-shadow-yellow-300 text-3xl bg-black w-full py-4 px-2 rounded-2xl max-w-full text-center'>Enter your Details here</h1>
                    <input type="text" placeholder='Enter your username *' required className='m-2  rounded-xl bg-neutral-300 hover:bg-white p-3 focus:outline-3 outline-yellow-300 text-black border-4 border-yellow-200'/>
                    <input type="text" placeholder='Enter you name *' required className='m-2  rounded-xl bg-neutral-300 hover:bg-white p-3 focus:outline-3 outline-yellow-300 text-black border-4 border-yellow-200'/>
                    <input type="email" placeholder='Enter your email *' required className='m-2  rounded-xl bg-neutral-300 hover:bg-white p-3 focus:outline-3 outline-yellow-300 text-black border-4 border-yellow-200'/>
                    <input type="text" placeholder='Enter your github Profile *' required className='m-2  rounded-xl bg-neutral-300 hover:bg-white p-3 focus:outline-3 outline-yellow-300 text-black border-4 border-yellow-200'/>
                    <div className='text-center '><button className='rounded-xl py-4 px-3 bg-yellow-300 hover:bg-yellow-200 cursor-pointer w-full text-black text-2xl'>Submit</button></div>
                </div>
            </form>
    </div>
  )
}

export default LoginPage