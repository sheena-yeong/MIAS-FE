import { resetPassword } from '../services/auth';
import { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import * as Toast from '@radix-ui/react-toast';
import PasswordToast from '../components/Password/PasswordToast';
import miasLogo from '../assets/mias_logo.png';

function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPassword(token, newPassword, confirmPassword);
      setOpenAlert(true);
      setTimeout(() => navigate('/signin'), 3000);
      return res;
    } catch (err) {
      console.log('Failed to reset password', err);
    }
  };

  return (
    <Toast.Provider>
      <div className='grid-bg min-h-screen flex items-center justify-center bg-slate-800 flex-col'>
        <img src={miasLogo} alt='MIAS Logo' className='w-80 pb-5' />
        <div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow'>
          <div>
            <h2 className='text-center text-3xl font-bold text-gray-900'>
              Reset Password
            </h2>
          </div>
          <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
            <div className='space-y-4'>
              <div>
                <label
                  htmlFor='newPassword'
                  className='block text-sm font-medium text-gray-700'
                >
                  New Password
                </label>
                <input
                  id='newPassword'
                  name='newPassword'
                  type='password'
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                />
              </div>
              <div>
                <label
                  htmlFor='confirmPassword'
                  className='block text-sm font-medium text-gray-700'
                >
                  Confirm Password
                </label>
                <input
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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

      <PasswordToast 
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        title='Password Reset'
        description='Password reset successfully'
      />
    </Toast.Provider>
  );
}

export default ForgotPassword;
