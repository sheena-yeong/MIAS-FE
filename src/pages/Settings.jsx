import { useState } from 'react';
import { changePassword } from '../services/auth';
import { useAuth } from '../context/AuthContext';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import * as Toast from '@radix-ui/react-toast';
import PasswordToast from '../components/Password/PasswordToast';

function Settings() {
  const { tokens } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await changePassword(
        oldPassword,
        newPassword,
        confirmPassword,
        tokens.access
      );
      setOpenDialog(false);
      setOpenAlert(true);
      setTimeout(() => setOpenAlert(false), 1000);

      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.log('Failed to change password', err);
    }
  };

  return (
    <Toast.Provider>
      <h3 className='p-3 text-3xl font-semibold mt-4 ml-2'>Settings</h3>
      <h3 className='p-3 text-2xl font-semibold mt-4 ml-2'>Change Password</h3>
      <p className='p-3 text-gray-600 ml-2'>Change your account password</p>

      <div className='p-3 ml-2'>
        <AlertDialog.Root open={openDialog} onOpenChange={setOpenDialog}>
          <AlertDialog.Trigger asChild>
            <button className='px-8 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#ff3a3a] hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50'>
              Change
            </button>
          </AlertDialog.Trigger>

          <AlertDialog.Portal>
            <AlertDialog.Overlay className='fixed inset-0 bg-black/20' />
            <AlertDialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm'>
              <AlertDialog.Title className='text-lg font-semibold mb-2'>
                Change Password
              </AlertDialog.Title>
              <AlertDialog.Description className='text-gray-600 mb-4'>
                Enter your current and new password.
              </AlertDialog.Description>

              <form onSubmit={handleSubmit} className='space-y-8'>
                <div>
                  <label
                    htmlFor='oldPassword'
                    className='block text-sm font-bold text-gray-700'
                  >
                    Old Password
                  </label>
                  <input
                    type='password'
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>
                <div>
                  <label
                    htmlFor='newPassword'
                    className='block text-sm font-bold text-gray-700'
                  >
                    New Password
                  </label>
                  <input
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
                    className='block text-sm font-bold text-gray-700'
                  >
                    Confirm Password
                  </label>
                  <input
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>
                <div className='flex justify-end gap-3'>
                  <AlertDialog.Cancel asChild>
                    <button
                      className='px-4 py-2 rounded-md text-sm bg-gray-200 hover:bg-gray-300'
                      onClick={() => setOpenAlert(false)}
                    >
                      Cancel
                    </button>
                  </AlertDialog.Cancel>
                  <button
                    type='submit'
                    className='px-4 py-2 rounded-md text-sm text-white bg-[#ff3a3a] hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50'
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </div>

      <PasswordToast
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        title='Password Change'
        description='Password changed successfully'
      />
    </Toast.Provider>
  );
}

export default Settings;
