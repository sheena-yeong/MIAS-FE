import { useState } from 'react';
import { sampleData } from '../data/sampledata';
import UserTable from '../components/User/UserTable';

export default function UserManagement() {
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <>
      <h3 className="p-3 text-3xl font-semibold mt-4 ml-2">User Management</h3>

      <UserTable
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        sampleData={sampleData}
      />
    </>
  );
}
