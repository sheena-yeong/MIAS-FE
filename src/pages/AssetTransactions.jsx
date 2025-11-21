import { useState } from "react";
import TransactionTable from "../components/Transaction/TransactionTable";

function AssetTransactions({ transactionData, searchQuery }) {
  const [selectedRow, setSelectedRow] = useState(null);

  const filteredTransactions = !searchQuery
    ? transactionData
    : transactionData.filter((transaction) => {
      const query = searchQuery.toLowerCase();
      return (
        transaction.action.toLowerCase().includes(query) ||
        transaction.asset.assetName.toLowerCase().includes(query) || 
        transaction.asset.serialNumber.toLowerCase().includes(query) ||
        transaction.performedBy.username.toLowerCase().includes(query) ||
        (transaction.createdAt && new Date(transaction.createdAt).toLocaleString().includes(query))
    );
  });  

  return (
    <>
      <h3 className="p-3 text-3xl font-semibold mt-4 ml-2 mb-6">Transaction History</h3>
      <TransactionTable 
        transactionData={filteredTransactions}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
      />
    </>
  );
}

export default AssetTransactions;
