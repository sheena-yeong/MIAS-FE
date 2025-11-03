import TotalAssets from '../components/Charts/TotalAssets';
import AvailableAssetsByCategory from '../components/Charts/AvailableAssetsByCategory';
import AssetCountByOrigin from '../components/Charts/AssetCountByOrigin';
import AssetCountByStatus from '../components/Charts/AssetCountByStatus';

function Dashboard({ assetData }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* <TotalAssets assetData={assetData}/> */}
        <div className="sm:col-span-2 xl:col-span-1">
          <AssetCountByStatus assetData={assetData} />
        </div>
        <AvailableAssetsByCategory assetData={assetData} />
        <AssetCountByOrigin assetData={assetData} />
      </div>
    </>
  );
}

export default Dashboard;
