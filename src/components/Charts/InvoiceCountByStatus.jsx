import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function InvoiceCountByStatus({ invoiceData }) {
  const statusCount = invoiceData.reduce((acc, invoice) => {
    const status = invoice.paymentStatus;
    if (acc[status]) {
      acc[status] += 1;
    } else {
      acc[status] = 1;
    }
    return acc;
  }, {});

  const chartData = Object.keys(statusCount).map((status) => ({
    name: status,
    value: statusCount[status],
  }));

  const COLORS = [
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF6699",
    "#0088FE",
    "#AA66CC",
  ];

  if (chartData.length === 0) return null;

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Invoice Count by Status</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 50, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" allowDecimals={false} />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Bar dataKey="value" radius={[0, 6, 6, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default InvoiceCountByStatus;
