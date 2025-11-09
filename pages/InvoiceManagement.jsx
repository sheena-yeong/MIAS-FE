import { useState, useEffect } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { HiOutlineRefresh } from 'react-icons/hi';
import InvoiceTable from '../components/Invoice/InvoiceTable';

export default function InvoiceManagement({ invoiceData, fetchInvoices }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [tableData, setTableData] = useState(invoiceData);

  const filterItems = ['Pending', 'Completed'];
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    setTableData(invoiceData);
  }, [invoiceData]);

  function filterData(status) {
    if (!status) {
      setTableData(invoiceData);
    } else {
      setTableData(invoiceData.filter((invoice) => invoice.paymentStatus === status));
    }
  }

  return (
    <>
      <h3 className="p-3 text-3xl font-semibold mt-4 ml-2">Invoice Management</h3>

      <InvoiceTable />
    </>
  )
}