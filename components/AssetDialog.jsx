import * as Dialog from '@radix-ui/react-dialog';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { createAsset, updateAsset } from '../services/asset';

function AssetDialog({ openDialog, setOpenDialog, selectedAsset, fetchAssets }) {
  /* ========== useStates and useEffect ========== */
  const [isEditMode, setIsEditMode] = useState(false);
  const [newAsset, setNewAsset] = useState({
    category: '',
    assetName: '',
    serialNumber: '',
    origin: '',
    condition: '',
    invoice: '',
    owner: '',
    actionType: '',
    acknowledged: false,
  });

  useEffect(() => {
    if (selectedAsset) {
      setNewAsset({
        category: selectedAsset.category || '',
        assetName: selectedAsset.assetName || '',
        serialNumber: selectedAsset.serialNumber || '',
        origin: selectedAsset.origin || '',
        condition: selectedAsset.condition || '',
        invoice: selectedAsset.invoice || '',
        owner: selectedAsset.owner || '',
        actionType: selectedAsset.actionType || '',
        acknowledged: selectedAsset.acknowledged || false,
      });
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

  /* ========== Functions ========== */
  function resetValues() {
    setNewAsset({
      category: '',
      assetName: '',
      serialNumber: '',
      origin: '',
      condition: '',
      invoice: '',
      owner: '',
      actionType: '',
      acknowledged: false,
    });
    setIsEditMode(false);
  }

  async function handleCreateAsset(e) {
    e.preventDefault();
    try {
      const result = await createAsset(newAsset);
      resetValues();
      setOpenDialog(false);
      fetchAssets();
      console.log('Asset created:', result);
    } catch (error) {
      console.log('Failed to create asset', error);
    }
  }

  async function handleUpdateAsset(e) {
    e.preventDefault();
    try {
      const result = await updateAsset(newAsset, selectedAsset._id);
      resetValues();
      setOpenDialog(false);
      fetchAssets();
      console.log('Asset updated:', result);
    } catch (error) {
      console.log('Failed to update asset', error);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setNewAsset((prev) => ({ ...prev, [name]: value }));
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
        <Dialog.Overlay className="fixed inset-0 bg-black/20 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-full max-w-md z-50">
          <Dialog.Title className="text-2xl font-semibold mb-4">
            {isEditMode ? 'Edit Asset' : 'New Asset'}
          </Dialog.Title>
          {/* <Dialog.Description className="text-sm text-gray-600 mb-4">
        </Dialog.Description> */}
          <form onSubmit={isEditMode ? handleUpdateAsset : handleCreateAsset}>
            <fieldset className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="category"
              >
                Category
              </label>
              <select
                name="category"
                value={newAsset.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option disabled value="">
                  Select Category
                </option>
                {categories.map((category, idx) => (
                  <option key={idx} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="assetName"
              >
                Asset Name
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="assetName"
                value={newAsset.assetName}
                onChange={handleInputChange}
                placeholder="e.g. Macbook Pro"
              />
            </fieldset>

            <fieldset className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="serialNumber"
              >
                Serial Number
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="serialNumber"
                value={newAsset.serialNumber}
                onChange={handleInputChange}
                placeholder="e.g. A9X2D4H6Q"
              />
            </fieldset>

            <fieldset className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="origin"
              >
                Origin
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="origin"
                value={newAsset.origin}
                onChange={handleInputChange}
                placeholder="e.g. Singapore"
              />
            </fieldset>

            <fieldset className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="condition"
              >
                Condition
              </label>
              <select
                name="condition"
                value={newAsset.condition}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option disabled value="">
                  Select Condition
                </option>
                {conditions.map((condition, idx) => (
                  <option key={idx} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="invoice"
              >
                Invoice
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="invoice"
                value={newAsset.invoice}
                onChange={handleInputChange}
                placeholder="e.g. INV582173K"
              />
            </fieldset>

            <fieldset className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="owner">
                Owner
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="owner"
                value={newAsset.owner}
                onChange={handleInputChange}
                placeholder="e.g. Simon"
              />
            </fieldset>

            <fieldset>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="actionType"
              >
                Status
              </label>
              <select
                name="actionType"
                value={newAsset.actionType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option disabled value="">
                  Select Status
                </option>
                <option value="Assigned">Assigned</option>
                <option value="Loaned">Loaned</option>
                <option value="Available">Available</option>
              </select>
            </fieldset>

            <div className="flex justify-end mt-6 gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400 transition-colors"
              >
                {isEditMode ? 'Save Changes' : 'Add New Asset'}
              </button>
            </div>

            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
                onClick={resetValues}
              >
                <IoCloseCircleOutline className="w-6 h-6" />
              </button>
            </Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default AssetDialog;
