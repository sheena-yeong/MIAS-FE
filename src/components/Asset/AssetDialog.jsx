import * as Dialog from '@radix-ui/react-dialog';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { createAsset, updateAsset } from '../../services/asset';
import { useAuth } from '../../context/AuthContext';

function AssetDialog({
  openDialog,
  setOpenDialog,
  selectedAsset,
  fetchAssets,
  fetchTransactions,
  setSelectedAsset,
  invoiceData,
  associateData,
}) {
  /* ========== useStates and useEffect ========== */
  const { tokens } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [invoices, setInvoices] = useState(invoiceData);
  const [associates, setAssociates] = useState(associateData);
  const [newAsset, setNewAsset] = useState({
    category: '',
    assetName: '',
    serialNumber: '',
    origin: '',
    condition: '',
    invoice: '',
    owner: '',
    status: '',
    acknowledgement: 'Pending',
  });

  useEffect(() => {
    if (selectedAsset) {
      setNewAsset({
        category: selectedAsset.category || '',
        assetName: selectedAsset.assetName || '',
        serialNumber: selectedAsset.serialNumber || '',
        origin: selectedAsset.origin || 'Singapore',
        condition: selectedAsset.condition || '',
        invoice: selectedAsset.invoice?._id || '',
        owner: selectedAsset.owner?._id || '',
        status: selectedAsset.status || '',
        acknowledgement: selectedAsset.acknowledgement || 'Pending',
      });
      console.log(selectedAsset);
      setIsEditMode(true);
    } else {
      resetValues();
      setIsEditMode(false);
    }
  }, [selectedAsset]);

  /* ========== Arrays ========== */
  const categories = [
    'Laptop',
    'Desktop',
    'Monitor',
    'Mouse',
    'Keyboard',
    'Mobile',
    'Tablet',
    'Other',
  ];
  const conditions = ['New', 'Used', 'Damaged', 'Disposed'];
  const origins = ['Singapore', 'Japan', 'Thailand'];

  /* ========== Functions ========== */
  function resetValues() {
    setNewAsset({
      category: '',
      assetName: '',
      serialNumber: '',
      origin: 'Singapore',
      condition: '',
      invoice: '',
      owner: '',
      status: '',
      acknowledgement: 'Pending',
    });
    setIsEditMode(false);
    setSelectedAsset(null);
  }

  async function handleCreateAsset(e) {
    e.preventDefault();
    try {
      console.log('Submitting newAsset:', newAsset);

      const result = await createAsset(newAsset, tokens.access);
      if (!result.success) {
        setErrMsg(`Error: ${result.message}`);
      } else {
        resetValues();
        setOpenDialog(false);
        fetchAssets();
        fetchTransactions();
      }
      console.log('Asset created:', result);
    } catch (error) {
      console.log('Failed to create asset', error);
    }
  }

  async function handleUpdateAsset(e) {
    e.preventDefault();
    try {
      const result = await updateAsset(
        newAsset,
        selectedAsset._id,
        tokens.access
      );
      resetValues();
      setOpenDialog(false);
      fetchAssets();
      fetchTransactions();
      console.log('Asset updated:', result);
    } catch (error) {
      console.log('Failed to update asset', error);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    if (name === 'status' && value === 'Available') {
      setNewAsset((prev) => ({
        ...prev,
        status: value,
        owner: null,
        acknowledgement: 'Pending',
      }));
    } else {
      setNewAsset((prev) => ({ ...prev, [name]: value }));
    }
  }

  return (
    <Dialog.Root
      open={openDialog}
      onOpenChange={(open) => {
        if (!open) resetValues();
        setOpenDialog(open);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/20 z-50' />
        <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-full max-w-md z-50'>
          <Dialog.Title className='text-2xl font-semibold mb-4'>
            {isEditMode ? 'Edit Asset' : 'New Asset'}
          </Dialog.Title>
          {/* <Dialog.Description className="text-sm text-gray-600 mb-4">
        </Dialog.Description> */}
          <form onSubmit={isEditMode ? handleUpdateAsset : handleCreateAsset}>
            <fieldset className='mb-4'>
              <label
                className='block text-sm font-medium mb-1'
                htmlFor='category'
              >
                Category
              </label>
              <select
                required
                name='category'
                value={newAsset.category}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option disabled value=''>
                  Select Category
                </option>
                {categories.map((category, idx) => (
                  <option key={idx} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset className='mb-4'>
              <label
                className='block text-sm font-medium mb-1'
                htmlFor='assetName'
              >
                Asset Name
              </label>
              <input
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
                name='assetName'
                value={newAsset.assetName}
                onChange={handleInputChange}
                placeholder='e.g. Macbook Pro'
              />
            </fieldset>

            <fieldset className='mb-4'>
              <label
                className='block text-sm font-medium mb-1'
                htmlFor='serialNumber'
              >
                Serial Number
              </label>
              <input
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
                name='serialNumber'
                value={newAsset.serialNumber}
                onChange={handleInputChange}
                placeholder='e.g. A9X2D4H6Q'
              />
            </fieldset>

            <fieldset className='mb-4'>
              <label
                className='block text-sm font-medium mb-1'
                htmlFor='origin'
              >
                Origin
              </label>
              <select
                required
                name='origin'
                value={newAsset.origin}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option disabled value=''>
                  Select Origin
                </option>
                {origins.map((origin, idx) => (
                  <option key={idx} value={origin}>
                    {origin}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset className='mb-4'>
              <label
                className='block text-sm font-medium mb-1'
                htmlFor='condition'
              >
                Condition
              </label>
              <select
                required
                name='condition'
                value={newAsset.condition}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option disabled value=''>
                  Select Condition
                </option>
                {conditions.map((condition, idx) => (
                  <option key={idx} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset className='mb-4'>
              <label
                className='block text-sm font-medium mb-1'
                htmlFor='invoice'
              >
                Invoice
              </label>
              <select
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                name='invoice'
                value={newAsset.invoice}
                onChange={handleInputChange}
              >
                <option disabled value=''>
                  Select Invoice
                </option>
                {invoices.map((inv) => (
                  <option key={inv._id} value={inv._id}>
                    {inv.invoiceNumber}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset className='mb-4'>
              <label
                className='block text-sm font-medium mb-1'
                htmlFor='status'
              >
                Status
              </label>
              <select
                required
                name='status'
                value={newAsset.status}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option disabled value=''>
                  Select Status
                </option>
                <option value='Assigned'>Assigned</option>
                <option value='Loaned'>Loaned</option>
                <option value='Available'>Available</option>
              </select>
              {/* <p>{errMsg}</p> */}
            </fieldset>

            <fieldset className='mb-4'>
              <label className='block text-sm font-medium mb-1' htmlFor='owner'>
                Owner
              </label>
              <select
                required
                disabled={newAsset.status === 'Available'}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                          ${
                            newAsset.status === 'Available'
                              ? 'bg-gray-100 cursor-not-allowed'
                              : ''
                          }`}
                name='owner'
                value={newAsset.status === 'Available' ? '' : newAsset.owner}
                onChange={handleInputChange}
              >
                <option disabled value=''>
                  Select Owner
                </option>
                {associates.map((owner) => (
                  <option key={owner._id} value={owner._id}>
                    {owner.name}
                  </option>
                ))}
              </select>
            </fieldset>

            <div className='flex justify-end mt-6 gap-2'>
              <button
                type='submit'
                className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400 transition-colors'
              >
                {isEditMode ? 'Save Changes' : 'Add New Asset'}
              </button>
            </div>

            <Dialog.Close asChild>
              <button
                className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors'
                aria-label='Close'
                onClick={resetValues}
              >
                <IoCloseCircleOutline className='w-6 h-6' />
              </button>
            </Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default AssetDialog;
