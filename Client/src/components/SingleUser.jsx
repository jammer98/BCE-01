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
    <div className='bg-gray-700 text-white flex justify-center items-center h-screen w-full'>
      <div className='w-xl bg-neutral-200 text-neutral-900 p-8 rounded-lg shadow-lg'>
        {user && (
          <>
            <h1 className='text-3xl font-bold mb-6'>{user.name}</h1>
            <div className='space-y-4 mb-6'>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>FullName:</strong> {user.fullname}</p>
              <p><strong>GitHub ID:</strong> {user.githubUsername}</p>
            </div>
            <div className='flex gap-4'>
              <button onClick={handleUpdate} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer transition-all duration-200 '>
                Update
              </button>
              <button onClick={handleDelete} className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer transition-all duration-200 '>
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SingleUser