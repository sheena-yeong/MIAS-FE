import { forgotPassword } from '../services/auth';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import miasLogo from '../assets/mias_logo.png';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword(
        email
      );
      return res;
    } catch (err) {
      console.log("Failed to send email", err);
    }
  };

  return (
    <div className='grid-bg min-h-screen flex items-center justify-center bg-slate-800 flex-col'>
      <img src={miasLogo} alt='MIAS Logo' className='w-80 pb-5' />
      <div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow'>
        <div>
          <h2 className='text-center text-3xl font-bold text-gray-900'>
            Forgot Password
          </h2>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email Address
              </label>
              <input
                id='email'
                name='email'
                type='text'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#ff3a3a] hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50'
            >
                Submit
            </button>
          </div>

          <div className='text-center'>
            <span className='text-sm text-gray-600'>
              <Link
                to='/signin'
                className='font-medium text-blue-600 hover:text-blue-500'
              >
                Return to Login page
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
