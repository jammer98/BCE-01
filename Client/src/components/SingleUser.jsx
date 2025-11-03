import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getUserById } from '../Services/Api';

function SingleUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id); // API call
        setUser(res.data.data); // ✅ Access correct data key
      } catch (error) {
        console.log('Could not fetch user by ID:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;
  if (!user) return <div className="text-white text-center mt-20">User not found</div>;

  return (
    <div className="flex flex-col justify-center items-center bg-black text-white h-screen">
      <h1 className="text-3xl mb-4">User Details</h1>
      <div className="bg-neutral-800 rounded-xl p-6 w-96 text-left shadow-lg shadow-green-500/30">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Fullname:</strong> {user.fullname}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Github:</strong> 
          <a 
            href={`https://github.com/${user.githubUsername}`} 
            target="_blank" 
            rel="noreferrer" 
            className="text-blue-400 hover:text-blue-300 ml-2"
          >
            {user.githubUsername}
          </a>
        </p>
      </div>
    </div>
  );
}

export default SingleUser;
