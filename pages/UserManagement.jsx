import { useState } from 'react';
import { sampleData } from '../data/sampledata';
import UserTable from '../components/UserTable';

export default function UserManagement() {
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <UserTable
      selectedRow={selectedRow}
      setSelectedRow={setSelectedRow}
      sampleData={sampleData}
    />
  );
}
