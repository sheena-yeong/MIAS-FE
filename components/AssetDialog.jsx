import * as Dialog from '@radix-ui/react-dialog';
import { IoCloseCircleOutline } from 'react-icons/io5';

function AssetDialog({ open, setOpen }) {
  const categories = [
    'Laptop',
    'Desktop',
    'Monitor',
    'Mouse',
    'Keyboard',
    'Mobile',
    'Tablet',
    'Others',
  ];

	const conditions = ['New', 'Used', 'Damaged', 'Disposed'];

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/20 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-full max-w-md z-50">
          <Dialog.Title className="text-xl font-semibold mb-2">
            New Asset
          </Dialog.Title>
          {/* <Dialog.Description className="text-sm text-gray-600 mb-4">
        </Dialog.Description> */}

          <fieldset className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Category
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option disabled selected>
                Select Category
              </option>
              {categories.map((category, idx) => (
                <option key={idx}>{category}</option>
              ))}
            </select>
          </fieldset>

          <fieldset className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="username"
            >
              Asset Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="username"
              placeholder="e.g. Macbook Pro"
            />
          </fieldset>

          <fieldset className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="username"
            >
              Serial Number
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="serialNumber"
              placeholder="e.g. A9X2D4H6Q"
            />
          </fieldset>

          <fieldset className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="username"
            >
              Origin
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="serialNumber"
              placeholder="e.g. Singapore"
            />
          </fieldset>

          <fieldset className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="username"
            >
              Condition
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option disabled selected>
                Select Condition
              </option>
              {conditions.map((condition, idx) => (
                <option key={idx}>{condition}</option>
              ))}
            </select>
          </fieldset>

					<fieldset className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="username"
            >
              Invoice
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="serialNumber"
              placeholder="e.g. INV582173K"
            />
          </fieldset>

					<fieldset className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="username"
            >
              Owner
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="serialNumber"
              placeholder="e.g. Simon"
            />
          </fieldset>

          <div className="flex justify-end mt-6">
            <Dialog.Close asChild>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400 transition-colors">
                Add
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <IoCloseCircleOutline className="w-6 h-6" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default AssetDialog;
