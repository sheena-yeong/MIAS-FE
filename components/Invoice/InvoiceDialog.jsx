import * as Dialog from '@radix-ui/react-dialog';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { createInvoice, updateInvoice } from '../../services/invoice';
import { useAuth } from '../../context/AuthContext';

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
    invoiceNumber: '',
    vendor: '',
    date: '',
    price: '',
    paymentStatus: 'Pending',
  });

  useEffect(() => {
    if (selectedInvoice) {
      setNewInvoice({
        invoiceNumber: selectedInvoice.invoiceNumber || '',
        vendor: selectedInvoice.vendor || '',
        date: selectedInvoice.date.slice(0, 10) || '',
        price: selectedInvoice.price || '',
        paymentStatus: selectedInvoice.paymentStatus || 'Pending',
      });
      setIsEditMode(true);
    } else {
      resetValues();
      setIsEditMode(false);
    }
  }, [selectedInvoice]);

    /* ========== Arrays ========== */
  const status = ['Pending', 'Completed'];

    /* ========== Functions ========== */
  function resetValues() {
    setNewInvoice({
      invoiceNumber: '',
      vendor: '',
      date: '',
      price: '',
      paymentStatus: 'Pending',
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
      console.log('Invoice created:', result);
    } catch (error) {
      console.log('Failed to create Invoice', error);
    }
  }

  async function handleUpdateInvoice(e) {
    e.preventDefault();
    try {
      const result = await updateInvoice(newInvoice, selectedInvoice._id, tokens.access);
      resetValues();
      setOpenDialog(false);
      fetchInvoices();
      console.log('Invoice updated:', result);
    } catch (error) {
      console.log('Failed to update invoice', error);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setNewInvoice((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div>InvoiceDialog</div>
  )
}

export default InvoiceDialog