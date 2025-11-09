import * as Dialog from '@radix-ui/react-dialog';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { createInvoice, updateInvoice } from '../../services/invoice';
import { useAuth } from '../../context/AuthContext';

function InvoiceDialog() {
  return (
    <div>InvoiceDialog</div>
  )
}

export default InvoiceDialog