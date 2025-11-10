import { useState } from "react";
import TransactionTable from "../components/Transaction/TransactionTable";

function Transactions({ transactionData, fetchTransactions }) {
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <>
      <h3 className="p-3 text-3xl font-semibold mt-4 ml-2">Transaction History</h3>
      <TransactionTable 
        transactionData={transactionData}
        fetchTransactions={fetchTransactions}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
      />
    </>
  );
}

export default Transactions;
