import { useState } from 'react';
import { sampleAssets } from '../data/sampleAssets';
import { IoIosAddCircle } from 'react-icons/io';
import { HiOutlineRefresh } from 'react-icons/hi';
import AssetTable from '../components/AssetTable';
import QuickFilters from '../components/QuickFilters';
import PeekPanel from '../components/PeekPanel';
import AssetDialog from '../components/AssetDialog';

export default function AssetManagement({ assetData, fetchAssets }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // for peek panel

  return (
    <>
      <h3 className="p-3 text-3xl font-semibold mt-4 ml-2">Asset Management</h3>
      <div className="flex justify-between items-center">
        <QuickFilters />
        <div className="flex items-center">
          <HiOutlineRefresh
            size={25}
            onClick={fetchAssets}
            className="transition-transform duration-200 hover:rotate-45"
          />
          <button
            className="flex items-center gap-2 m-3 bg-slate-500 text-white font-medium px-4 py-2 rounded-xl shadow-sm hover:bg-[#a79d9a] transition-all duration-200 active:scale-95"
            onClick={() => {
              setSelectedAsset(null)
              setOpenDialog(true);
            }}
          >
            <IoIosAddCircle />
            Add Asset
          </button>
        </div>
      </div>
      <AssetTable
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        // sampleAssets={sampleAssets}
        assetData={assetData}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        setSelectedAsset={setSelectedAsset}
      />

      {/* <PeekPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedAsset={selectedRow}
      /> */}

      <AssetDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        selectedAsset={selectedAsset}
      />
    </>
  );
}
