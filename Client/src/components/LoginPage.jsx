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
    <div className='h-screen w-screen bg-neutral-400 flex justify-center items-center'>

      <form action="submit" onSubmit={handleSubmitForm} className='p-7 w-xl'>
                <div className='bg-black flex flex-col p-10 rounded-xl shadow-xl shadow-yellow-300 gap-4 border-2 border-yellow-200'>
                    <h1 className='text-yellow-300 text-shadow-2xs text-shadow-yellow-300 text-4xl bg-black w-full py-4 px-2 rounded-2xl max-w-full text-center font-serif'>Enter your Details here</h1>
                    <input type="text" name='username' value={formdata.username} onChange={handelOnChange} placeholder='Enter your username *' required className='m-2  rounded-xl bg-neutral-300 hover:bg-white p-3 focus:outline-3 outline-yellow-300 text-black border-4 border-yellow-200'/>


                    <input type="text" name='fullname' value={formdata.fullname} onChange={handelOnChange} placeholder='Enter you name *' required className='m-2  rounded-xl bg-neutral-300 hover:bg-white p-3 focus:outline-3 outline-yellow-300 text-black border-4 border-yellow-200'/>


                    <input type="email" name='email' value={formdata.email} onChange={handelOnChange} placeholder='Enter your email *' required className='m-2  rounded-xl bg-neutral-300 hover:bg-white p-3 focus:outline-3 outline-yellow-300 text-black border-4 border-yellow-200'/>


                    <input type="text"  name='githubUsername'  value={formdata.githubUsername} onChange={handelOnChange} placeholder='Enter your github Profile *' required className='m-2  rounded-xl bg-neutral-300 hover:bg-white p-3 focus:outline-3 outline-yellow-300 text-black border-4 border-yellow-200'/>


                    <div className='text-center '><button  type="submit" className='rounded-xl py-4 px-3 bg-yellow-300 hover:bg-yellow-200 cursor-pointer w-full text-black text-2xl transition-all'>{loading ? "submitting..." : "Submit User"}</button></div>
                </div>
      </form>

    </div>
  )
}

export default LoginPage