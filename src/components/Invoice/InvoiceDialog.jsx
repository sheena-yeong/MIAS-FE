import * as Dialog from "@radix-ui/react-dialog";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { createInvoice, updateInvoice } from "../../services/invoice";
import { useAuth } from "../../context/AuthContext";

function InvoiceDialog({
  openDialog,
  setOpenDialog,
  selectedInvoice,
  fetchInvoices,
}) {
  /* ========== useStates and useEffect ========== */
  const { tokens } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    invoiceNumber: "",
    vendor: "",
    date: "",
    price: "",
    paymentStatus: "Pending",
  });

  useEffect(() => {
    if (selectedInvoice) {
      setNewInvoice({
        invoiceNumber: selectedInvoice.invoiceNumber || "",
        vendor: selectedInvoice.vendor || "",
        date: selectedInvoice.date.slice(0, 10) || "",
        price: selectedInvoice.price || "",
        paymentStatus: selectedInvoice.paymentStatus || "Pending",
      });
      setIsEditMode(true);
    } else {
      resetValues();
      setIsEditMode(false);
    }
  }, [selectedInvoice]);

  /* ========== Arrays ========== */
  const paymentStatuses = ["Pending", "Completed"];

  /* ========== Functions ========== */
  function resetValues() {
    setNewInvoice({
      invoiceNumber: "",
      vendor: "",
      date: "",
      price: "",
      paymentStatus: "Pending",
    });
    setIsEditMode(false);
  }

  async function handleCreateInvoice(e) {
    e.preventDefault();
    try {
      const result = await createInvoice(newInvoice, tokens.access);
      resetValues();
      setOpenDialog(false);
      fetchInvoices();
      console.log("Invoice created:", result);
    } catch (error) {
      console.log("Failed to create Invoice", error);
    }
  }

  async function handleUpdateInvoice(e) {
    e.preventDefault();
    try {
      const result = await updateInvoice(
        newInvoice,
        selectedInvoice._id,
        tokens.access
      );
      resetValues();
      setOpenDialog(false);
      fetchInvoices();
      console.log("Invoice updated:", result);
    } catch (error) {
      console.log("Failed to update invoice", error);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setNewInvoice((prev) => ({ ...prev, [name]: value }));
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
            {isEditMode ? "Edit Invoice" : "New Invoice"}
          </Dialog.Title>
          {/* <Dialog.Description className="text-sm text-gray-600 mb-4">
            </Dialog.Description> */}
          <form onSubmit={isEditMode ? handleUpdateInvoice : handleCreateInvoice}>
            <fieldset className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="invoiceNumber"
              >
                Invoice Number
              </label>
              <input
                name="invoiceNumber"
                value={newInvoice.invoiceNumber}
                onChange={handleInputChange}
                placeholder="Invoice number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </fieldset>

            <fieldset className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="vendor"
              >
                Vendor
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="vendor"
                value={newInvoice.vendor}
                onChange={handleInputChange}
                placeholder="Vendor's company name"
              />
            </fieldset>

            <fieldset className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="date"
              >
                Date
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="date"
                name="date"
                value={newInvoice.date}
                onChange={handleInputChange}
              />
            </fieldset>

            <fieldset className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="price"
              >
                Price
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                name="price"
                value={newInvoice.price}
                onChange={handleInputChange}
                placeholder="e.g. 1250.50"
              />
            </fieldset>

            <fieldset className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="paymentStatus"
              >
                Payment Status
              </label>
              <select
                name="paymentStatus"
                value={newInvoice.paymentStatus}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option disabled value="">
                  Select Payment Status
                </option>
                {paymentStatuses.map((status, idx) => (
                  <option key={idx} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </fieldset>

            <div className="flex justify-end mt-6 gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400 transition-colors"
              >
                {isEditMode ? "Save Changes" : "Add New Invoice"}
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

export default InvoiceDialog;
