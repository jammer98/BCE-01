import React from 'react'
import {getUserById, DeleteUser} from '../Services/Api.js';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

function SingleUser() {

  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await getUserById(id);
        setUser(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await DeleteUser(id);
        navigate('/users');
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  const handleUpdate = () => {
    navigate(`/users/${id}/edit`, { state: { user } });
  };

  if (loading) return <div className='bg-gray-700 text-white flex justify-center items-center h-screen'>Loading...</div>;
  if (error) return <div className='bg-gray-700 text-white flex justify-center items-center h-screen'>Error: {error}</div>;

  return (
    <div className='bg-black text-white flex justify-center items-center h-screen w-full'>
      <div className='w-xl bg-neutral-900 text-white p-8 rounded-lg shadow-md shadow-yellow-400'>
        {user && (
          <>
          <div className=' flex justify-between items-center w-full p-4 py-6 bg-black text-center  shadow-lg shadow-yellow-300 fixed top-0 left-0 text-white'>
            <button className='rounded-full bg-yellow-300 py-1 px-2 text-black cursor-pointer  hover:bg-yellow-300 hover:text-black transition-all duration-200  '>
              <svg xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor" 
              className="size-7">
              <path strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
              </svg>
            </button >

            <h1 className='text-xl tracking-wider text-yellow-300'> GIT-HUB DEV : {user.fullname.toUpperCase()}</h1>

            <div></div>

            </div>
            <h1 className='text-3xl font-bold mb-6'>{user.name}</h1>
            <div className='space-y-4 mb-6'>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>FullName:</strong> {user.fullname}</p>
              <p><strong>GitHub ID:</strong> {user.githubUsername}</p>
            </div>
            <div className='flex gap-4'>
              <button onClick={handleUpdate} className= ' flex gap-3 items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer transition-all duration-200 '>
                <svg xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                stroke="currentColor" 
                className="size-6">
                <path strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
                <p className='font-semibold'>Update</p>
              </button>
              <button onClick={handleDelete} className='bg-red-500 hover:bg-red-600 flex items-center gap-3  text-white px-4 py-2 rounded cursor-pointer transition-all duration-200 '>
                <svg xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                stroke="currentColor" 
                className="size-6">
                <path strokeLinecap="round" 
                strokeLinejoin="round" 
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                <p className='font-semibold'>Delete</p>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SingleUser