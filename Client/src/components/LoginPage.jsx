import React, { useState } from 'react'
import { registerUser } from '../Services/Api';
import { useNavigate } from 'react-router';
// import { useNavigate } from 'react-router';

function LoginPage() {

  const [formdata,setFormdata] = useState({
    username:"",
    fullname:"",
    email:"",
    githubUsername:""
  })

  const [loading , setLoading] = useState(false);

  const navigate  = useNavigate();


  const handelOnChange =(e) =>{
    setFormdata({...formdata,[e.target.name] : e.target.value})
  }

    const handleSubmitForm = async(e)=>{
        e.preventDefault(); 
        setLoading(true);
        try {
          const res = await registerUser(formdata);
          alert(res.message);
          setFormdata({username:"",fullname:"",email:"",githubUsername:""})
          navigate('/users');

        } catch (error) {
          alert("Failed to register user!");
          console.log(error);
        }
        finally{
          setLoading(false);
        }
    }


  return (
    <div className='h-screen w-screen bg-black flex justify-center items-center'>

      <form action="submit" onSubmit={handleSubmitForm} className='p-7 w-xl'>
                <div className='bg-black flex flex-col p-10 rounded-xl shadow-xl shadow-yellow-300 gap-4 border-2 border-yellow-200'>
                    <h1 className='text-yellow-300 text-shadow-2xs text-shadow-yellow-300 text-4xl bg-black w-full py-4 px-2 rounded-2xl max-w-full text-center font-serif'>Enter your Details here</h1>
                    <label htmlFor="text" name="username" > <div className='flex items-center gap-2'><p className='text-yellow-400'>username</p> <p className='text-red-600'>*</p></div> </label>
                    <input type="text" name='username' value={formdata.username} onChange={handelOnChange} required className='rounded-xl bg-black p-3  text-yellow-400 border-2 border-yellow-200'/>

                    <label htmlFor="text" name="fullname" > <div className='flex items-center gap-2'><p className='text-yellow-400'>fullname</p> <p className='text-red-600'>*</p></div> </label>
                    <input type="text" name='fullname' value={formdata.fullname} onChange={handelOnChange} required className=' rounded-xl bg-black p-3 text-yellow-400 border-2 border-yellow-200'/> 

                    <label htmlFor="email" name="email" > <div className='flex items-center gap-2'><p className='text-yellow-400'>email</p> <p className='text-red-600'>*</p></div> </label>  
                    <input type="email" name='email' value={formdata.email} onChange={handelOnChange} required className='rounded-xl bg-black p-3  text-yellow-400 border-2 border-yellow-200'/>


                    <label htmlFor="text" name="githubUsername" > <div className='flex items-center gap-2'><p className='text-yellow-400'>githubUsername</p> <p className='text-red-600'>*</p></div> </label> 
                    <input type="text"  name='githubUsername'  value={formdata.githubUsername} onChange={handelOnChange} required className='rounded-xl bg-black p-3  text-yellow-400 border-2 border-yellow-200'/>

                    <div className='text-center '><button  type="submit" className=' mt-2 rounded-xl py-4 px-3 bg-yellow-300 hover:bg-yellow-200 cursor-pointer w-full text-black text-2xl transition-all'>{loading ? "submitting..." : "Submit User"}</button></div>
                </div>
      </form>

    </div>
  )
}

export default LoginPage