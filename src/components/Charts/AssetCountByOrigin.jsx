import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function AssetCountByOrigin({ assetData }) {

  const originCount = assetData.reduce((acc, asset) => {
    const origin = asset.origin;
    if (acc[origin]) {
      acc[origin] += 1;
    } else {
      acc[origin] = 1;
    }
    return acc;
  }, {});

  const chartData = Object.keys(originCount).map((origin) => ({
    name: origin,
    value: originCount[origin],
  }));

  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#8884d8',
    '#82ca9d',
  ];

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">
          Distribution of Assets by Origin
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default AssetCountByOrigin;