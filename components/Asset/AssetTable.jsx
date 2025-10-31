import { MdOutlineEdit, MdDeleteOutline } from 'react-icons/md';
import { FaRegComments } from "react-icons/fa";
import AssetDeleteAlert from './AssetDeleteAlert.jsx';
import { deleteAsset } from '../../services/asset.js';
import { LuUserPlus } from 'react-icons/lu';
import { useState } from 'react';

function AssetTable({
  selectedRow,
  setSelectedRow,
  // sampleAssets,
  assetData,
  setOpenDialog,
  selectedAsset,
  setSelectedAsset,
  fetchAssets,
}) {
  const [openAlert, setOpenAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination values
  const totalPages = Math.ceil(assetData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAssets = assetData.slice(startIndex, endIndex);

  // Generate page numbers to display
  function getPageNumbers() {
    const pages = [];
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    // Adjust start if we're near the end
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  function goToPage(page) {
    setCurrentPage(page);
    setSelectedRow(null);
  }

  function handleDelete() {
    deleteAsset(selectedAsset._id);
    setOpenAlert(false);
    fetchAssets();
  }

  return (
    <div>
      <AssetDeleteAlert
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        handleDelete={handleDelete}
      />

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Asset Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                S/N
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Origin
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Condition
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Invoice
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Owner
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Acknowledged
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {assetData.map((row, idx) => {
              const isSelected = selectedRow === idx;
              return (
                <tr
                  key={row.serialNumber}
                  onClick={() => setSelectedRow(idx)}
                  className={`transition-colors
                  ${isSelected ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
                >
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {row.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {row.assetName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {row.serialNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {row.origin}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {row.condition}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {row.invoice}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {row.owner}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {row.acknowledged}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {row.actionType}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    <div className="flex gap-1">
                      <button className="bg-blue-400 p-1 rounded-lg text-white cursor-pointer">
                        <MdOutlineEdit
                          size={20}
                          onClick={() => {
                            setSelectedAsset(row);
                            setOpenDialog(true);
                          }}
                        />
                      </button>
                      <button className="bg-yellow-500 p-1 rounded-lg text-white cursor-pointer">
                        <FaRegComments size={20} />
                      </button>
                      <button className="bg-red-400 p-1 rounded-lg text-white cursor-pointer">
                        <MdDeleteOutline
                          size={20}
                          onClick={() => {
                            setSelectedAsset(row);
                            setOpenAlert(true);
                          }}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-4">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, assetData.length)}{' '}
            of {assetData.length} assets
          </div>

          <div className="flex gap-2">
            {/* Previous Button */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded border ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>

            {/* First page if not visible */}
            {getPageNumbers()[0] > 1 && (
              <>
                <button
                  onClick={() => goToPage(1)}
                  className="px-3 py-1 rounded border bg-white text-gray-700 hover:bg-gray-50"
                >
                  1
                </button>
                {getPageNumbers()[0] > 2 && (
                  <span className="px-2 py-1 text-gray-500">...</span>
                )}
              </>
            )}

            {/* Page Numbers */}
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-1 rounded border ${
                  currentPage === page
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}

            {/* Last page if not visible */}
            {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
              <>
                {getPageNumbers()[getPageNumbers().length - 1] <
                  totalPages - 1 && (
                  <span className="px-2 py-1 text-gray-500">...</span>
                )}
                <button
                  onClick={() => goToPage(totalPages)}
                  className="px-3 py-1 rounded border bg-white text-gray-700 hover:bg-gray-50"
                >
                  {totalPages}
                </button>
              </>
            )}

            {/* Next Button */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded border ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssetTable;
