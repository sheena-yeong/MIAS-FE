import { useState } from 'react';
import { sampleData } from '../data/sampledata';
import AssetTable from '../components/AssetTable';

export default function AssetManagement() {
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <AssetTable
      selectedRow={selectedRow}
      setSelectedRow={setSelectedRow}
      sampleData={sampleData}
    />
  );
}
