import { useState } from "react";
import TransactionTable from "../components/Transaction/TransactionTable";

function Transactions({ transactionData }) {
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <>
      <h3 className="p-3 text-3xl font-semibold mt-4 ml-2">Transaction History</h3>
      <TransactionTable 
        transactionData={transactionData}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
      />
    </>
  );
}

export default Transactions;
