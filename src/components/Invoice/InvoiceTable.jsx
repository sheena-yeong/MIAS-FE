import { MdOutlineEdit, MdDeleteOutline } from 'react-icons/md';
import InvoiceDeleteAlert from './InvoiceDeleteAlert.jsx';
import { deleteInvoice } from '../../services/invoice.js';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

function InvoiceTable({
  selectedRow,
  setSelectedRow,
  invoiceData,
  setOpenDialog,
  selectedInvoice,
  setSelectedInvoice,
  fetchInvoices,
}) {
  const { tokens } = useAuth();
  const [openAlert, setOpenAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination values
  const totalPages = Math.ceil(invoiceData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInvoices = invoiceData.slice(startIndex, endIndex);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [totalPages, currentPage]);

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

  async function handleDelete() {
    try {
      await deleteInvoice(selectedInvoice._id, tokens.access);
      await fetchInvoices();
      setOpenAlert(false);
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  }

  return (
    <div>
      <InvoiceDeleteAlert
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        handleDelete={handleDelete}
      />

      <div className='overflow-x-auto rounded-lg border border-gray-200 shadow-sm'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
                Invoice Number
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
                Vendor
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
                Date
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
                Price
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
                Payment Status
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {currentInvoices.map((row, idx) => {
              const isSelected = selectedRow === idx;
              return (
                <tr
                  key={row.invoiceNumber}
                  onClick={() => setSelectedRow(idx)}
                  className={`transition-colors
                  ${isSelected ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
                >
                  <td className='px-6 py-4 text-sm text-gray-800'>
                    {row.invoiceNumber}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-800'>
                    {row.vendor}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-800'>
                    {new Date(row.date).toLocaleDateString()}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-800'>
                    ${row.price.toFixed(2)}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-800'>
                    <span
                      className={`px-2 py-1 rounded text-xs font medium ${
                        row.paymentStatus === 'Completed'
                          ? `bg-green-200 text-green-800`
                          : `bg-yellow-200 text-yellow-800`
                      }`}
                    >
                      {row.paymentStatus}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-800'>
                    <div className='flex gap-1'>
                      <button className='bg-blue-400 p-1 rounded-lg text-white cursor-pointer'>
                        <MdOutlineEdit
                          size={20}
                          onClick={() => {
                            setSelectedInvoice(row);
                            setOpenDialog(true);
                          }}
                        />
                      </button>
                      <button className='bg-red-400 p-1 rounded-lg text-white cursor-pointer'>
                        <MdDeleteOutline
                          size={20}
                          onClick={() => {
                            setSelectedInvoice(row);
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
        <div className='flex items-center justify-between mt-4 px-4'>
          <div className='text-sm text-gray-600'>
            Showing {startIndex + 1} to {Math.min(endIndex, invoiceData.length)}{' '}
            of {invoiceData.length} assets
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
    </div>
  );
}

export default InvoiceTable;
