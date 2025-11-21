import * as Dialog from '@radix-ui/react-dialog';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { createUser, updateUser } from '../../services/user';
import { useAuth } from '../../context/AuthContext';

function UserDialog({
  openDialog,
  setOpenDialog,
  selectedUser,
  setSelectedUser,
  fetchUsers,
}) {
  /* ========== useStates and useEffect ========== */
  const { tokens } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [newUser, setNewUser] = useState({
    eid: '',
    username: '',
    password: '',
    email: '',
    role: 'Viewer',
    isEmployed: true,
  });

  useEffect(() => {
    if (selectedUser) {
      setNewUser({
        eid: selectedUser.eid || '',
        username: selectedUser.username || '',
        password: '',
        email: selectedUser.email || '',
        role: selectedUser.role || 'Viewer',
        isEmployed: selectedUser.isEmployed || true,
      });
      setIsEditMode(true);
    } else {
      resetValues();
      setIsEditMode(false);
    }
  }, [selectedUser]);

  /* ========== Arrays ========== */
  const roles = ['Admin', 'Editor', 'Viewer'];
  const employmentStatuses = ['Yes', 'No'];

  /* ========== Functions ========== */
  function resetValues() {
    setNewUser({
      eid: '',
      username: '',
      password: '',
      email: '',
      role: 'Viewer',
      isEmployed: true,
    });
    setIsEditMode(false);
    setSelectedUser(null);
    setErrMsg(null);
  }

  async function handleCreateUser(e) {
    e.preventDefault();
    try {
      const result = await createUser(newUser, tokens.access);
      if (!result.success) {
        setErrMsg(`${result.message}`);
      } else {
        resetValues();
        setOpenDialog(false);
        fetchUsers();
      }
      console.log('User created:', result);
    } catch (error) {
      console.log('Failed to create user', error);
    }
  }

  async function handleUpdateUser(e) {
    e.preventDefault();
    try {
      const result = await updateUser(newUser, selectedUser._id, tokens.access);
      resetValues();
      setOpenDialog(false);
      fetchUsers();
      console.log('User updated:', result);
    } catch (error) {
      console.log('Failed to update user', error);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]:
        name === 'email'
          ? value.toLowerCase()
          : name === 'isEmployed'
          ? value === 'Yes'
          : value,
    }));
  }

  return (
    <Dialog.Root
      open={openDialog}
      onOpenChange={(open) => {
        if (!open) resetValues();
        setOpenDialog(open);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/20 z-50' />
        <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-full max-w-md z-50'>
          <Dialog.Title className='text-2xl font-semibold mb-4'>
            {isEditMode ? 'Edit User' : 'New User'}
          </Dialog.Title>
          {/* <Dialog.Description className="text-sm text-gray-600 mb-4">
              </Dialog.Description> */}
          <form onSubmit={isEditMode ? handleUpdateUser : handleCreateUser}>
            <fieldset className='mb-4'>
              <label className='block text-sm font-medium mb-1' htmlFor='eid'>
                EID
              </label>
              <input
                required
                name='eid'
                value={newUser.eid}
                onChange={handleInputChange}
                placeholder='EID'
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <p className='text-red-500'>{errMsg}</p>
            </fieldset>

            <fieldset className='mb-4'>
              <label
                className='block text-sm font-medium mb-1'
                htmlFor='username'
              >
                Username
              </label>
              <input
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
                name='username'
                value={newUser.username}
                onChange={handleInputChange}
                placeholder='Username'
              />
            </fieldset>

            <fieldset className='mb-4'>
              <label
                className='block text-sm font-medium mb-1'
                htmlFor='password'
              >
                {!isEditMode ? "Password" : "Password (Skip to retain existing)"}
              </label>
              <input
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                required={!isEditMode}
                type='password'
                name='password'
                value={newUser.password}
                onChange={handleInputChange}
              />
            </fieldset>

            <fieldset className='mb-4'>
              <label className='block text-sm font-medium mb-1' htmlFor='email'>
                Email
              </label>
              <input
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
                name='email'
                value={newUser.email}
                onChange={handleInputChange}
                placeholder='Email'
              />
              <p className='text-red-500'>{errMsg}</p>
            </fieldset>

            <fieldset className='mb-4'>
              <label className='block text-sm font-medium mb-1' htmlFor='role'>
                Role
              </label>
              <select
                name='role'
                value={newUser.role}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option disabled value=''>
                  Select Role
                </option>
                {roles.map((role, idx) => (
                  <option key={idx} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset className='mb-4'>
              <label
                className='block text-sm font-medium mb-1'
                htmlFor='isEmployed'
              >
                Employed
              </label>
              <select
                name='isEmployed'
                value={newUser.isEmployed ? 'Yes' : 'No'}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option disabled value=''>
                  Select Employment Status
                </option>
                {employmentStatuses.map((status, idx) => (
                  <option key={idx} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </fieldset>

            <div className='flex justify-end mt-6 gap-2'>
              <button
                type='submit'
                className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400 transition-colors'
              >
                {isEditMode ? 'Save Changes' : 'Add New User'}
              </button>
            </div>

            <Dialog.Close asChild>
              <button
                className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors'
                aria-label='Close'
                onClick={resetValues}
              >
                <IoCloseCircleOutline className='w-6 h-6' />
              </button>
            </Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default UserDialog;
