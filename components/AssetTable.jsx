import { MdOutlineEdit, MdDeleteOutline } from 'react-icons/md';
import { LuUserPlus } from 'react-icons/lu';

function AssetTable({ selectedRow, setSelectedRow, sampleAssets, setIsOpen }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Category
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Asset
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              S/N
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Origin
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Condition
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Invoice
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Owner
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sampleAssets.map((row, idx) => {
            const isSelected = selectedRow === idx;
            return (
              <tr
                key={row.serialNumber}
                onClick={() => setSelectedRow(idx)}
                className={`transition-colors
                  ${isSelected ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
              >
                <td className="px-6 py-4 text-sm text-gray-800">
                  {row.category}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {row.assetName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {row.serialNumber}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {row.origin}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {row.condition}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {row.invoice}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {row.ownership}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  <div className="flex gap-3">
                    <button className="bg-red-400 p-1 rounded-lg text-white cursor-pointer">
                      <MdOutlineEdit size={20} onClick={() => setIsOpen(true)}/>
                    </button>
                    <button className="bg-amber-400 p-1 rounded-lg text-white cursor-pointer">
                      <LuUserPlus size={20} />
                    </button>

                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AssetTable;
