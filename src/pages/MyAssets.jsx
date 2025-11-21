import { HiOutlineRefresh } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function MyAsset({ assetData, fetchAssets }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState(assetData);
  const { user } = useAuth();

  useEffect(() => {
    fetchAssets();
  }, []);

  useEffect(() => {
    if (user.role === 'Viewer') {
      const ownedAssets = assetData.filter(
        (asset) => asset.owner && asset.owner.name === user.username
      );
      setTableData(ownedAssets);
    } else {
      setTableData(assetData);
    }
  }, [assetData, user]);

  useEffect(() => {
    setCurrentPage(1);
  }, [assetData]);

  const itemsPerPage = 10;

  // Calculate pagination values
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAssets = tableData.slice(startIndex, endIndex);

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

  return (
    <>
      
      <div className='flex items-center gap-3 px-3 mt-4 mb-6'>
        <h3 className='text-3xl font-semibold'>My Assets</h3>
        <HiOutlineRefresh
          size={25}
          onClick={() => {
            fetchAssets();
          }}
          className='transition-transform duration-200 hover:rotate-45'
        />
      </div>
      <div className='overflow-x-auto rounded-lg border border-gray-200 shadow-sm'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
                Category
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
                Asset Name
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
                S/N
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
                Origin
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
                Condition
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
                Invoice
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
                Owner
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
                acknowledgement
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
                Status
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {currentAssets.length === 0 ? (
              <tr>
                <td
                  colSpan='9'
                  className='px-6 py-4 text-center text-gray-500 text-sm'
                >
                  No assets found
                </td>
              </tr>
            ) : (
              currentAssets.map((row, idx) => {
                const isSelected = selectedRow === idx;
                return (
                  <tr
                    key={row.serialNumber}
                    onClick={() => setSelectedRow(idx)}
                    className={`transition-colors
                  ${isSelected ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
                  >
                    <td className='px-6 py-4 text-sm text-gray-800'>
                      {row.category}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-800'>
                      {row.assetName}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-800'>
                      {row.serialNumber}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-800'>
                      {row.origin}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-800'>
                      {row.condition}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-800'>
                      {row.invoice?.invoiceNumber || '-'}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-800'>
                      {row.owner?.name || '-'}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-800'>
                      {row.acknowledgement}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-800'>
                      {row.status}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className='flex items-center justify-between mt-4 px-4'>
          <div className='text-sm text-gray-600'>
            Showing {startIndex + 1} to {Math.min(endIndex, tableData.length)}{' '}
            of {tableData.length} assets
          </div>

          <div className='flex gap-2'>
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
                  className='px-3 py-1 rounded border bg-white text-gray-700 hover:bg-gray-50'
                >
                  1
                </button>
                {getPageNumbers()[0] > 2 && (
                  <span className='px-2 py-1 text-gray-500'>...</span>
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
                  <span className='px-2 py-1 text-gray-500'>...</span>
                )}
                <button
                  onClick={() => goToPage(totalPages)}
                  className='px-3 py-1 rounded border bg-white text-gray-700 hover:bg-gray-50'
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
    </>
  );
}

export default MyAsset;
