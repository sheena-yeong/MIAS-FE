import AssetCountChart from '../components/DashboardCharts/AssetCountChart';

function Dashboard({ assetData }) {
  return (
    <>
      <h3 className="p-3 text-3xl font-semibold mt-4 ml-2">Dashboard</h3>
      <AssetCountChart assetData={assetData} />
    </>
  );
}

export default Dashboard;
