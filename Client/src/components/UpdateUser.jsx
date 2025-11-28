import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router';
import { UpdateUserById, getUserById} from '../Services/Api.js';

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullname: '',
    githubUsername: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(id);
        setFormData(response.data || location.state?.user);
        setLoading(false);
      } catch (err) {
        setError('Failed to load user data');
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await UpdateUserById(id, formData);
      setSuccess('User updated successfully!');
      setTimeout(() => navigate(`/users/${id}`), 1500);
    } catch (err) {
      setError(err.message || 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.name) return <div className='bg-black text-white flex justify-center items-center h-screen'>Loading...</div>;

  return (
    <div className='bg-black text-white flex justify-center items-center min-h-screen w-full p-4'>
      <div className='w-full max-w-md bg-neutral-900 p-8 rounded-lg shadow-lg shadow-yellow-400'>
        <h1 className='text-3xl font-bold mb-6 text-yellow-300 text-center'>Update User</h1>
        
        {error && <div className='bg-red-500 text-white p-3 rounded mb-4'>{error}</div>}
        {success && <div className='bg-green-500 text-white p-3 rounded mb-4'>{success}</div>}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block font-semibold mb-1'>Username</label>
            <input type='text' name='username' value={formData.username} onChange={handleChange} className='w-full p-2 border rounded' />
          </div>
          <div>
            <label className='block font-semibold mb-1'>Email</label>
            <input type='email' name='email' value={formData.email} onChange={handleChange} className='w-full p-2 border rounded' />
          </div>
          <div>
            <label className='block font-semibold mb-1'>Full Name</label>
            <input type='text' name='fullname' value={formData.fullname} onChange={handleChange} className='w-full p-2 border rounded' />
          </div>
          <div>
            <label className='block font-semibold mb-1'>GitHub Username</label>
            <input type='text' name='githubUsername' value={formData.githubUsername} onChange={handleChange} className='w-full p-2 border rounded' />
          </div>

          <div className='flex gap-4 mt-6'>
            <button type='submit' disabled={loading} className='flex-1 bg-yellow-300 hover:bg-yellow-200 text-black font-semibold px-4 py-2 rounded cursor-pointer transition-all duration-200'>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button type='button' onClick={() => navigate(`/users/${id}`)} className='flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded cursor-pointer transition-all duration-200'>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateUser
