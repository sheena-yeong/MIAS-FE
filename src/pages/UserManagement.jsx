import { useState, useEffect } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { HiOutlineRefresh } from 'react-icons/hi';
import UserTable from '../components/User/UserTable';
import UserDialog from '../components/User/UserDialog';

export default function UserManagement({ userData, fetchUsers, searchQuery }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tableData, setTableData] = useState(userData);

  const filterItems = ['Admin', 'Editor', 'Viewer', 'Employed', 'Unemployed'];
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    if (!filter) {
      setTableData(userData);
    } else {
      filterData(filter);
    }
  }, [userData, filter]);

  const filteredUsers = !searchQuery
    ? tableData
    : tableData.filter((user) => {
        const query = searchQuery.toLowerCase();
        return (
          user.eid.toLowerCase().includes(query) ||
          user.username.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
        );
      });

  function filterData(currentFilter) {
    if (!currentFilter) {
      setTableData(userData);
    } else if (['Admin', 'Editor', 'Viewer'].includes(currentFilter)) {
      setTableData(userData.filter((user) => user.role === currentFilter));
    } else if (['Employed', 'Unemployed'].includes(currentFilter)) {
      setTableData(
        userData.filter((user) =>
          currentFilter === 'Employed'
            ? user.isEmployed === true
            : user.isEmployed === false
        )
      );
    }
  }

  return (
    <>
      <h3 className='p-3 text-3xl font-semibold mt-4 ml-2'>User Management</h3>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-3 ml-2'>
          <h3 className='text-md pl-3'>Quick Filters: </h3>
          {filterItems.map((item, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 rounded-3xl border border-transparent hover:border-slate-500 transition-transform duration-300 ease-in-out ${
                item === filter ? 'bg-slate-400 text-white' : 'bg-slate-200'
              }`}
              onClick={() => {
                if (item === filter) {
                  setFilter(null);
                  filterData(null);
                } else if (item !== filter) {
                  setFilter(item);
                  filterData(item);
                }
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <div className='flex items-center'>
          <HiOutlineRefresh
            size={25}
            onClick={() => {
              setFilter(null);
              fetchUsers();
            }}
            className='transition-transform duration-200 hover:rotate-45'
          />
          <button
            className='flex items-center gap-2 m-3 bg-slate-500 text-white font-medium px-4 py-2 rounded-xl shadow-sm hover:bg-red-400 transition-all duration-200 active:scale-95'
            onClick={() => {
              setSelectedUser(null);
              setOpenDialog(true);
            }}
          >
            <IoIosAddCircle />
            Add User
          </button>
        </div>
      </div>
      <UserTable
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        userData={tableData}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        fetchUsers={fetchUsers}
        filteredUsers={filteredUsers}
      />
      <UserDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        selectedUser={selectedUser}
        fetchUsers={fetchUsers}
      />
    </>
  );
}
