import React, { useEffect,useState } from 'react'
import { getUserById } from '../Services/Api';
import { useParams } from 'react-router';

function SingleUser() {


    const { id } = useParams();
    const [user,setUser] = useState(null);

    useEffect(()=>{
        const fetchUser = async() => {
            try {
                const res = await getUserById(id);
                setUser(res.data);
            } catch (error) {
                console.log("could not fetch user by id",error);
            }
        }
        fetchUser()
    },[])

  return (
    <div className='flex justify-center items-center bg-black h-screen w-full'>
        <div className='w-full p-4 sticky'>
            test
        </div>
    </div>
  )
}

export default SingleUser