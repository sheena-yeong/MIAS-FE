import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

function AssetCountChart({ assetData }) {
  const categoryCount = assetData.reduce((acc, asset) => {
    const category = asset.category;
    if (acc[category]) {
      acc[category] += 1;
    } else {
      acc[category] = 1;
    }
    return acc;
  }, {});

  const totalAssets = assetData.length;

  const chartData = Object.keys(categoryCount).map((category) => ({
    name: category,
    value: categoryCount[category],
  }));

  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#AA66CC',
    '#FF6699',
  ];

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-end mr-4">Total Assets: {totalAssets}</h3>

        <h3 className="text-xl font-semibold mb-4">
          Count of Assets by Category
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {/* Color the graph */}
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

export default AssetCountChart;
