import * as AlertDialog from "@radix-ui/react-alert-dialog";

function AssetEmailAlert({ openEmailAlert, setOpenEmailAlert, handleSend }) {

  return (
    <AlertDialog.Root open={openEmailAlert} onOpenChange={setOpenEmailAlert}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/20" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm">
          <AlertDialog.Title className="text-lg font-semibold mb-2">
            Send Asset Acknowledgement Email?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-gray-600 mb-4">
            This will notify the asset owner and provide action links to approve or reject the assignment.
          </AlertDialog.Description>

          <div className="flex justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <button
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                onClick={() => setOpenEmailAlert(false)}
              >
                Cancel
              </button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <button
                onClick={handleSend}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-400"
              >
                Yes, send
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default AssetEmailAlert;