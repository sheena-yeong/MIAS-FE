import { IoClose, IoPerson } from 'react-icons/io5';
import { FaRegComments, FaWarehouse } from 'react-icons/fa6';

function CommentsPanel({ openPanel, onClose, selectedAsset }) {
  return (
    <>
      {/* Overlay */}
      {openPanel && (
        <div
          className="fixed inset-0 bg-black/15 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      {selectedAsset && <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 z-50
        ${openPanel ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">
            {selectedAsset.assetName} ({selectedAsset.serialNumber})
          </h2>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto h-[calc(100%-80px)]">
          {selectedAsset ? (
            <div className="space-y-4">
              <div>
                <label className="text-md text-black flex gap-2 items-center">
                  <IoPerson />
                  Owner: {selectedAsset.owner}
                </label>
              </div>

              <div>
                <label className="text-md text-black flex gap-2 items-center">
                  <FaWarehouse />
                  Status: {selectedAsset.actionType}
                </label>
              </div>

              <div>
                <label className="text-md text-black flex gap-2 items-center">
                  <FaRegComments />
                  Comments:
                </label>
                <p className="font-medium">(Todo: To map comments here)</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No asset selected</p>
          )}
        </div>
      </div>}
    </>
  );
}

export default CommentsPanel;
