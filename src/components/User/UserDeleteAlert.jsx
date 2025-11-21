import * as AlertDialog from "@radix-ui/react-alert-dialog";

function UserDeleteAlert({ openAlert, setOpenAlert, handleDelete }) {

  return (
    <AlertDialog.Root open={openAlert} onOpenChange={setOpenAlert}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/20" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm">
          <AlertDialog.Title className="text-lg font-semibold mb-2">
            Are you absolutely sure?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-gray-600 mb-4">
            This action cannot be undone. This will permanently delete this
            user from the system.
          </AlertDialog.Description>

          <div className="flex justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <button
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                onClick={() => setOpenAlert(false)}
              >
                Cancel
              </button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-400"
              >
                Yes, delete
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default UserDeleteAlert;