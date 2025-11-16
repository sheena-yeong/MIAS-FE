import * as Dialog from "@radix-ui/react-dialog";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { createAssociate, updateAssociate } from "../../services/associate";
import { useAuth } from "../../context/AuthContext";

function AssociateDialog({
  openDialog,
  setOpenDialog,
  selectedAssociate,
  fetchAssociates,
}) {
  /* ========== useStates and useEffect ========== */
  const { tokens } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [newAssociate, setNewAssociate] = useState({
    eid: "",
    name: "",
    email: "",
    terminationDate: "",
  });

  useEffect(() => {
    if (selectedAssociate) {
      setNewAssociate({
        eid: selectedAssociate.eid || "",
        name: selectedAssociate.name || "",
        email: selectedAssociate.email || "",
        terminationDate: selectedAssociate.terminationDate 
        ? selectedAssociate.terminationDate.slice(0, 10) 
        : "",
      });
      setIsEditMode(true);
    } else {
      resetValues();
      setIsEditMode(false);
    }
  }, [selectedAssociate]);

  /* ========== Functions ========== */
  function resetValues() {
    setNewAssociate({
      eid: "",
      name: "",
      email: "",
      terminationDate: "",
    });
    setIsEditMode(false);
  }

  async function handleCreateAssociate(e) {
    e.preventDefault();
    try {
      const result = await createAssociate(newAssociate, tokens.access);
      resetValues();
      setOpenDialog(false);
      fetchAssociates();
      console.log("Associate created:", result);
    } catch (error) {
      console.log("Failed to create Associate", error);
    }
  }

  async function handleUpdateAssociate(e) {
    e.preventDefault();
    try {
      const result = await updateAssociate(
        newAssociate,
        selectedAssociate._id,
        tokens.access
      );
      resetValues();
      setOpenDialog(false);
      fetchAssociates();
      console.log("Associate updated:", result);
    } catch (error) {
      console.log("Failed to update associate", error);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setNewAssociate((prev) => ({ ...prev, [name]: value }));
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
            {isEditMode ? "Edit Associate" : "New Associate"}
          </Dialog.Title>
          {/* <Dialog.Description className="text-sm text-gray-600 mb-4">
            </Dialog.Description> */}
          <form onSubmit={isEditMode ? handleUpdateAssociate : handleCreateAssociate}>
            <fieldset className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="eid"
              >
                EID
              </label>
              <input
                name="eid"
                value={newAssociate.eid}
                onChange={handleInputChange}
                placeholder="EID"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </fieldset>

            <fieldset className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="name"
                value={newAssociate.name}
                onChange={handleInputChange}
                placeholder="Associate's name"
              />
            </fieldset>

            <fieldset className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="email"
                value={newAssociate.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
            </fieldset>

            <fieldset className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="terminationDate"
              >
                Termination Date
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="date"
                name="terminationDate"
                value={newAssociate.terminationDate}
                onChange={handleInputChange}
              />
            </fieldset>           

            <div className="flex justify-end mt-6 gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400 transition-colors"
              >
                {isEditMode ? "Save Changes" : "Add New Associate"}
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

export default AssociateDialog;
