import { useState, useEffect } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { HiOutlineRefresh } from 'react-icons/hi';
import AssociateTable from '../components/Associate/AssociateTable';
import AssociateDialog from '../components/Associate/AssociateDialog';

function AssociateManagement({ associateData, fetchAssociates }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAssociate, setSelectedAssociate] = useState(null);
  const [tableData, setTableData] = useState(associateData);

  const sortItems = [
    { key: 'eid', label: 'EID'}, 
    { key: 'name', label: 'Name'},
  ];
  const [sortKey, setSortKey] = useState(null);

  useEffect(() => {
    setTableData(associateData);
  }, [associateData]);

  function sortData(key) {
    if (!key) {
      setTableData(associateData);
      setSortKey(null);
      return;
    }

    const sorted = [...associateData].sort((a, b) => {
      const valA = a[key] || "";
      const valB = b[key] || "";

      if (valA > valB) return 1;
      if (valA < valB) return -1;
      return 0;
    })

    setSortKey(key);
    setTableData(sorted);
  }

  return (
    <>
      <h3 className='p-3 text-3xl font-semibold mt-4 ml-2'>
        Associate Directory
      </h3>
      <div className='flex justify-between items-center'>
        <div className="flex items-center gap-3 ml-2">
          <h3 className="text-md pl-3">Sort By: </h3>
          {sortItems.map(({ key, label }, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 rounded-3xl border border-transparent hover:border-slate-500 transition-transform duration-300 ease-in-out ${
                key === sortKey ? "bg-slate-400 text-white" : "bg-slate-200"
              }`}
              onClick={() => {
                if (key === sortKey) {
                  setSortKey(null);
                  sortData(null);
                } else {
                  sortData(key);
                }
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div className='flex items-center'>
          <HiOutlineRefresh
            size={25}
            onClick={() => {
              setSortKey(null);
              fetchAssociates();
            }}
            className='transition-transform duration-200 hover:rotate-45'
          />
          <button
            className='flex items-center gap-2 m-3 bg-slate-500 text-white font-medium px-4 py-2 rounded-xl shadow-sm hover:bg-red-400 transition-all duration-200 active:scale-95'
            onClick={() => {
              setSelectedAssociate(null);
              setOpenDialog(true);
            }}
          >
            <IoIosAddCircle />
            Add Associate
          </button>
        </div>
      </div>
      <AssociateTable 
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        associateData={tableData}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        selectedAssociate={selectedAssociate}
        setSelectedAssociate={setSelectedAssociate}
        fetchAssociates={fetchAssociates}
      />
      <AssociateDialog 
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        selectedAssociate={selectedAssociate}
        fetchAssociates={fetchAssociates}
      />      
    </>
  );
}

export default AssociateManagement;
