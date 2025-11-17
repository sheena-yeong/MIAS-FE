import { MdOutlineEdit, MdDeleteOutline, MdEmail } from 'react-icons/md';
import { FaRegComments } from 'react-icons/fa';
import * as Toast from '@radix-ui/react-toast';
import AssetDeleteAlert from './AssetDeleteAlert.jsx';
import AssetEmailAlert from './AssetEmailAlert.jsx';
import { deleteAsset } from '../../services/asset.js';
import { sendAssetAckEmail } from '../../services/email.js';
import { LuUserPlus } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

function AssetTable({
  selectedRow,
  setSelectedRow,
  // sampleAssets,
  assetData,
  setOpenDialog,
  selectedAsset,
  setSelectedAsset,
  fetchAssets,
  setOpenPanel,
  filteredAssets,
}) {
  const { tokens, user } = useAuth();
  const [openAlert, setOpenAlert] = useState(false);
  const [openEmailAlert, setOpenEmailAlert] = useState(false);
  const [selectedEmailRow, setSelectedEmailRow] = useState(null);
  const [openToast, setOpenToast] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination values
  const sourceAssets = filteredAssets || assetData;
  const totalPages = Math.ceil(sourceAssets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAssets = sourceAssets.slice(startIndex, endIndex);

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
      await deleteAsset(selectedAsset._id, tokens.access);
      await fetchAssets();
      setOpenAlert(false);
    } catch (error) {
      console.error('Error deleting asset:', error);
    }
  }

  function handleSend(row) {
    setSelectedEmailRow(row);
    setOpenEmailAlert(true);
  }

  async function handleSendEmail(row) {
    try {
      console.log('current user', user);
      const payload = {
        emailTemplate: 'ReceiveAsset',
        recipient: row.owner.email,
        data: {
          recipientName: row.owner.name,
          eid: row.owner.eid,
          assetName: row.assetName,
          serialNumber: row.serialNumber,
          assignedBy: `IT Support - ${user.username || 'Unknown'}`,
          assignedAt: new Date().toLocaleDateString(),
          userId: row.owner._id,
        },
      };

      if (!payload.recipient || !payload.data.userId) {
        console.warn('Missing recipient or user ID');
        return;
      }

      const result = await sendAssetAckEmail(payload, tokens.access);
      console.log('Email sent successfully', result);
      setOpenToast(true);
    } catch (err) {
      console.log('Failed to send email', err);
    }
  }

  useEffect(() => {
    if (openToast) {
      const timer = setTimeout(() => setOpenToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [openToast])

  return (
    <div>
      <AssetDeleteAlert
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        handleDelete={handleDelete}
      />
      <AssetEmailAlert
        openEmailAlert={openEmailAlert}
        setOpenEmailAlert={setOpenEmailAlert}
        handleSend={() => {
          handleSendEmail(selectedEmailRow);
          setOpenEmailAlert(false);
        }}
      />

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
                Acknowledged
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
                Status
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {currentAssets.map((row, idx) => {
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
                    {row.acknowledged}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-800'>
                    {row.status}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-800'>
                    <div className='flex gap-1'>
                      <button
                        className={`p-1 rounded-lg text-white ${
                          row.acknowledged === 'Yes'
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-green-400 cursor-pointer'
                        }`}
                        disabled={row.acknowledged === 'Yes'}
                        onClick={() => {
                          handleSend(row);
                        }}
                      >
                        <MdEmail size={20} />
                      </button>
                      <button className='bg-blue-400 p-1 rounded-lg text-white cursor-pointer'>
                        <MdOutlineEdit
                          size={20}
                          onClick={() => {
                            setSelectedAsset(row);
                            setOpenDialog(true);
                          }}
                        />
                      </button>
                      <button
                        className='bg-yellow-500 p-1 rounded-lg text-white cursor-pointer'
                        onClick={() => {
                          setOpenPanel(true);
                          setSelectedAsset(row);
                        }}
                      >
                        <FaRegComments size={20} />
                      </button>
                      <button className='bg-red-400 p-1 rounded-lg text-white cursor-pointer'>
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
        <div className='flex items-center justify-between mt-4 px-4'>
          <div className='text-sm text-gray-600'>
            Showing {startIndex + 1} to {Math.min(endIndex, sourceAssets.length)}{' '}
            of {sourceAssets.length} assets
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
      <Toast.Provider>
        <Toast.Root
          open={openToast}
          onOpenChange={setOpenToast}
          className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm'
        >
          <Toast.Title className='text-lg font-semibold mb-2'>
            Email Sent
          </Toast.Title>
          <Toast.Description className='text-gray-600 mb-4'>
            The asset acknowledgement email was sent successfully.
          </Toast.Description>
          <Toast.Close className='ml-4 text-white hover:text-gray-200'>x</Toast.Close>
        </Toast.Root>
        <Toast.Viewport className='fixed bottom-4 right-4 z-50' />
      </Toast.Provider>
    </div>
  );
}

export default AssetTable;
