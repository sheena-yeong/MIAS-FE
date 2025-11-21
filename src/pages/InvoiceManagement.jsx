import { useState, useEffect } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { HiOutlineRefresh } from 'react-icons/hi';
import InvoiceTable from '../components/Invoice/InvoiceTable';
import InvoiceDialog from '../components/Invoice/InvoiceDialog';

export default function InvoiceManagement({
  invoiceData,
  fetchInvoices,
  searchQuery,
}) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [tableData, setTableData] = useState(invoiceData);

  const filterItems = ['Pending', 'Completed'];
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    if (!filter) {
      setTableData(invoiceData);
    } else {
      filterData(filter);
    }
  }, [invoiceData, filter]);

  const filteredInvoices = !searchQuery
    ? tableData
    : tableData.filter((invoice) => {
        const query = searchQuery.toLowerCase();
        return (
          invoice.invoiceNumber.toLowerCase().includes(query) ||
          invoice.vendor.toLowerCase().includes(query) ||
          (invoice.date && new Date(invoice.date).toLocaleDateString().includes(query)) ||
          (invoice.price !== undefined && invoice.price.toFixed(2).includes(query))
        );
      });

  function filterData(status) {
    if (!status) {
      setTableData(invoiceData);
    } else {
      setTableData(
        invoiceData.filter((invoice) => invoice.paymentStatus === status)
      );
    }
  }

  return (
    <>
      <h3 className='p-3 text-3xl font-semibold mt-4 ml-2'>
        Invoice Management
      </h3>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-3 ml-2'>
          <h3 className='text-md pl-3'>Quick Filters: </h3>
          {filterItems.map((item, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 rounded-3xl border border-transparent hover:border-slate-500 transition-transform duration-300 ease-in-out ${
                item === filter ? 'bg-slate-400 text-white' : 'bg-slate-200'
              }`}
              onClick={() => {
                if (item === filter) {
                  setFilter(null);
                  filterData(null);
                } else if (item !== filter) {
                  setFilter(item);
                  filterData(item);
                }
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <div className='flex items-center'>
          <HiOutlineRefresh
            size={25}
            onClick={() => {
              setFilter(null);
              fetchInvoices();
            }}
            className='transition-transform duration-200 hover:rotate-45'
          />
          <button
            className='flex items-center gap-2 m-3 bg-slate-500 text-white font-medium px-4 py-2 rounded-xl shadow-sm hover:bg-red-400 transition-all duration-200 active:scale-95'
            onClick={() => {
              setSelectedInvoice(null);
              setOpenDialog(true);
            }}
          >
            <IoIosAddCircle />
            Add Invoice
          </button>
        </div>
      </div>
      <InvoiceTable
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        invoiceData={filteredInvoices}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        selectedInvoice={selectedInvoice}
        setSelectedInvoice={setSelectedInvoice}
        fetchInvoices={fetchInvoices}
      />
      <InvoiceDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        selectedInvoice={selectedInvoice}
        setSelectedInvoice={setSelectedInvoice}
        fetchInvoices={fetchInvoices}
      />
    </>
  );
}
