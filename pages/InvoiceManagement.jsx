import InvoiceTable from '../components/Invoice/InvoiceTable'

export default function InvoiceManagement({ invoiceData, fetchInvoices }) {
  return (
    <>
      <h3 className="p-3 text-3xl font-semibold mt-4 ml-2">Invoice Management</h3>

      <InvoiceTable />
    </>
  )
}