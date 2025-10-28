function AssetTable({ selectedRow, setSelectedRow, sampleData }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Email
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Role
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sampleData.map((row, idx) => {
            const isSelected = selectedRow === idx;
            return (
              <tr
                key={row.email}
                onClick={() => setSelectedRow(idx)}
                className={`cursor-pointer transition-colors
                  ${isSelected ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
              >
                <td className="px-6 py-4 text-sm text-gray-800">{row.name}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{row.email}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{row.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AssetTable;
