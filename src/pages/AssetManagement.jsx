import { useState, useEffect } from "react";
// import { sampleAssets } from '../data/sampleAssets';
import { IoIosAddCircle } from "react-icons/io";
import { HiOutlineRefresh } from "react-icons/hi";
import AssetTable from "../components/Asset/AssetTable";
import CommentsPanel from "../components/Asset/CommentsPanel";
import AssetDialog from "../components/Asset/AssetDialog";

export default function AssetManagement({
  assetData,
  fetchAssets,
  fetchTransactions,
  invoiceData,
  associateData,
  searchQuery,
}) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [tableData, setTableData] = useState(assetData);
  const [openPanel, setOpenPanel] = useState(false);

  const filterItems = ["Available Assets", "Assets on Loan", "Deployed Assets"];
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    if(!filter) {
      setTableData(assetData);
    } else {
      filterData(filter);
    }
  }, [assetData, filter]);

  const filteredAssets = !searchQuery
    ? tableData
    : tableData.filter((asset) => {
      const query = searchQuery.toLowerCase();
      return (
        asset.category.toLowerCase().includes(query) ||
        asset.assetName.toLowerCase().includes(query) || 
        asset.serialNumber.toLowerCase().includes(query) ||
        asset.origin.toLowerCase().includes(query) ||
        asset.condition.toLowerCase().includes(query) ||
        asset.invoice.invoiceNumber.toLowerCase().includes(query) ||
        asset.owner.name.toLowerCase().includes(query) ||
        asset.acknowledged.toLowerCase().includes(query)
    );
  });

  function filterData(item) {
    if (item === "Available Assets") {
      setTableData(assetData.filter((asset) => asset.status === "Available"));
    } else if (item === "Assets on Loan") {
      setTableData(assetData.filter((asset) => asset.status === "Loaned"));
    } else if (item === "Deployed Assets") {
      setTableData(assetData.filter((asset) => asset.status === "Assigned"));
    } else {
      setTableData(assetData);
    }
  }

  return (
    <>
      <h3 className="p-3 text-3xl font-semibold mt-4 ml-2">Asset Management</h3>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 ml-2">
          <h3 className="text-md pl-3">Quick Filters: </h3>
          {filterItems.map((item, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 rounded-3xl border border-transparent hover:border-slate-500 transition-transform duration-300 ease-in-out ${
                item === filter ? "bg-slate-400 text-white" : "bg-slate-200"
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
        <div className="flex items-center">
          <HiOutlineRefresh
            size={25}
            onClick={() => {
              setFilter(null);
              fetchAssets();
            }}
            className="transition-transform duration-200 hover:rotate-45"
          />
          <button
            className="flex items-center gap-2 m-3 bg-slate-500 text-white font-medium px-4 py-2 rounded-xl shadow-sm hover:bg-red-400 transition-all duration-200 active:scale-95"
            onClick={() => {
              setSelectedAsset(null);
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
        assetData={tableData}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        selectedAsset={selectedAsset}
        setSelectedAsset={setSelectedAsset}
        fetchAssets={fetchAssets}
        setOpenPanel={setOpenPanel}
        filteredAssets={filteredAssets}
      />

      <CommentsPanel
        openPanel={openPanel}
        onClose={() => {
          setOpenPanel(false);
          setSelectedRow(null);
        }}
        selectedAsset={selectedAsset}
      />

      <AssetDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        selectedAsset={selectedAsset}
        fetchAssets={fetchAssets}
        fetchTransactions={fetchTransactions}
        setSelectedAsset={setSelectedAsset}
        invoiceData={invoiceData}
        associateData={associateData}
      />
    </>
  );
}
