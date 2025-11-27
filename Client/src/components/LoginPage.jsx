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
    <div className='flex justify-center items-center bg-black w-screen h-screen'>

      <form action="submit" onSubmit={handleSubmitForm} className='p-7 w-xl'>
                <div className='flex flex-col gap-4 bg-black shadow-xl shadow-yellow-300 p-10 border-2 border-yellow-200 rounded-xl'>
                    <h1 className='bg-black text-shadow-2xs text-shadow-yellow-300 px-2 py-4 rounded-2xl w-full max-w-full font-serif text-yellow-300 text-4xl text-center'>Enter your Details here</h1>
                    <label htmlFor="text" name="username" > <div className='flex items-center gap-2'><p className='text-yellow-400'>username</p> <p className='text-red-600'>*</p></div> </label>
                    <input type="text" name='username' value={formdata.username} onChange={handelOnChange} required className='bg-black p-3 border-2 border-yellow-200 rounded-xl text-yellow-400'/>

                    <label htmlFor="text" name="fullname" > <div className='flex items-center gap-2'><p className='text-yellow-400'>fullname</p> <p className='text-red-600'>*</p></div> </label>
                    <input type="text" name='fullname' value={formdata.fullname} onChange={handelOnChange} required className='bg-black p-3 border-2 border-yellow-200 rounded-xl text-yellow-400'/> 

                    <label htmlFor="email" name="email" > <div className='flex items-center gap-2'><p className='text-yellow-400'>email</p> <p className='text-red-600'>*</p></div> </label>  
                    <input type="email" name='email' value={formdata.email} onChange={handelOnChange} required className='bg-black p-3 border-2 border-yellow-200 rounded-xl text-yellow-400'/>


                    <label htmlFor="text" name="githubUsername" > <div className='flex items-center gap-2'><p className='text-yellow-400'>githubUsername</p> <p className='text-red-600'>*</p></div> </label> 
                    <input type="text"  name='githubUsername'  value={formdata.githubUsername} onChange={handelOnChange} required className='bg-black p-3 border-2 border-yellow-200 rounded-xl text-yellow-400'/>

                    <div className='text-center'><button  type="submit" className='bg-yellow-300 hover:bg-yellow-200 mt-2 px-3 py-4 rounded-xl w-full text-black text-2xl transition-all cursor-pointer'>{loading ? "submitting..." : "Submit User"}</button></div>
                </div>
      </form>

    </div>
  )
}

export default LoginPage