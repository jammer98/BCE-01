import React, { useState } from 'react'
import { registerUser } from '../Services/Api';
// import { useNavigate } from 'react-router';

function LoginPage() {

  const [formdata,setFormdata] = useState({
    username:"",
    fullname:"",
    email:"",
    githubId:""
  })

  const [loading , setLoading] = useState(false);

  // const navigate = useNavigate();


  const handelOnChange =(e) =>{
    setFormdata({...formdata,[e.target.name] : e.target.value})
  }

    const handleSubmitForm = async(e)=>{
        e.preventDefault(); 
        setLoading(true);
        try {
          const res = await registerUser(formdata);
          alert(res.message);
          setFormdata({username:"",fullname:"",email:"",githubId:""})
          // navigate("/users");

        } catch (error) {
          alert("Failed to register user!");
          console.log(error);
        }
        finally{
          setLoading(false);
        }
    }


  return (
    <div className='h-screen w-screen bg-black flex justify-between items-center'>

      <div className='  h-full text-center flex justify-center items-center font-bold text-yellow-300 mx-0'>
          <p className='text-3xl tracking-normal p-8 rounded-2xl'>Genrate <br/> Beautiful,MINImilistic <br/> Github Dev Cards</p> 
      </div>

      
      <form action="submit" onSubmit={handleSubmitForm} className='p-7 w-xl'>
                <div className='bg-black flex flex-col p-10 rounded-xl shadow-xl shadow-yellow-300 gap-4 border-2 border-yellow-200'>
                    <h1 className='text-yellow-300 text-shadow-2xs text-shadow-yellow-300 text-4xl bg-black w-full py-4 px-2 rounded-2xl max-w-full text-center font-serif'>Enter your Details here</h1>
                    <input type="text" name='username' value={formdata.username} onChange={handelOnChange} placeholder='Enter your username *' required className='m-2  rounded-xl bg-neutral-300 hover:bg-white p-3 focus:outline-3 outline-yellow-300 text-black border-4 border-yellow-200'/>


                    <input type="text" name='fullname' value={formdata.fullname} onChange={handelOnChange} placeholder='Enter you name *' required className='m-2  rounded-xl bg-neutral-300 hover:bg-white p-3 focus:outline-3 outline-yellow-300 text-black border-4 border-yellow-200'/>


                    <input type="email" name='email' value={formdata.email} onChange={handelOnChange} placeholder='Enter your email *' required className='m-2  rounded-xl bg-neutral-300 hover:bg-white p-3 focus:outline-3 outline-yellow-300 text-black border-4 border-yellow-200'/>


                    <input type="text"  name='githubId'  value={formdata.githubId} onChange={handelOnChange} placeholder='Enter your github Profile *' required className='m-2  rounded-xl bg-neutral-300 hover:bg-white p-3 focus:outline-3 outline-yellow-300 text-black border-4 border-yellow-200'/>


                    <div className='text-center '><button  type="submit" className='rounded-xl py-4 px-3 bg-yellow-300 hover:bg-yellow-200 cursor-pointer w-full text-black text-2xl transition-all'>{loading ? "submitting..." : "Submit User"}</button></div>
                </div>
      </form>

      <div className='flex flex-col justify-center h-screen px-9 gap-5'>
        <div className='text-2xl text-white'>Already Registered user</div>
        <button className='bg-yellow-300 text-black rounded-2xl px-3 py-2 hover:bg-yellow-200 cursor-pointer'>Go to Users Dashboard</button>
      </div>

    </div>
  )
}

export default LoginPage