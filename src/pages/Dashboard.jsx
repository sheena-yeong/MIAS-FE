import TotalAssets from '../components/Charts/TotalAssets';
import AvailableAssetsByCategory from '../components/Charts/AvailableAssetsByCategory';
import AssetCountByOrigin from '../components/Charts/AssetCountByOrigin';
import AssetCountByStatus from '../components/Charts/AssetCountByStatus';

function Dashboard({ assetData }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* <TotalAssets assetData={assetData}/> */}
        <AssetCountByStatus assetData={assetData} />

        <AssetCountByOrigin assetData={assetData} />
        <AvailableAssetsByCategory assetData={assetData} />
      </div>
    </>
  );
}

export default Dashboard;
