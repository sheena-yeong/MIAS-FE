import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

function TransactionTable({ transactionData, selectedRow, setSelectedRow }) {
  const { tokens } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination values
  const totalPages = Math.ceil(transactionData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactionData.slice(startIndex, endIndex);

  // Generate page numbers to display
  function getPageNumbers() {
    const pages = [];
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    // Adjust start if we're near the end
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  function goToPage(page) {
    setCurrentPage(page);
    setSelectedRow(null);
  }

  return (
    <div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Action
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Asset
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Performed By
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Changes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentTransactions.map((row, idx) => {
              const isSelected = selectedRow === idx;
              return (
                <tr
                  key={row._id}
                  onClick={() => setSelectedRow(idx)}
                  className={`transition-colors
                  ${isSelected ? "bg-blue-100" : "hover:bg-gray-50"}`}
                >
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {row.action}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {row.asset.assetName || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {row.performedBy.name || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {new Date(row.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {row.changes
                      ? Object.entries(row.changes).map(([key, value]) => {
                          if (
                            value &&
                            typeof value === "object" &&
                            "from" in value &&
                            "to" in value
                          ) {
                            return (
                              <div key={key}>
                                <span className="text-sm text-gray-800">{`${key.charAt(0).toUpperCase()}${key.slice(1)}`}:</span>{" "}
                                <span className="text-sm text-gray-800">
                                  {value.from}
                                </span>{" "}
                                <span className="text-sm text-gray-800">
                                  → {value.to}
                                </span>
                              </div>
                            );
                          } else {
                            return (
                              <div key={key}>
                                <span className="font-medium">{key}:</span>{" "}
                                {String(value)}
                              </div>
                            );
                          }
                        })
                      : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionTable;
