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

  useEffect(() => {
    setTableData(associateData);
  }, [associateData]);

  return (
    <>
      <h3 className='p-3 text-3xl font-semibold mt-4 ml-2'>
        Associate Directory
      </h3>
      <div className='flex justify-between items-center'>
        <div className='flex items-center'>
          <HiOutlineRefresh
            size={25}
            onClick={fetchAssociates}
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
