import InvoiceCountByStatus from '../components/Charts/InvoiceCountByStatus';
import AvailableAssetsByCategory from '../components/Charts/AvailableAssetsByCategory';
import AssetCountByOrigin from '../components/Charts/AssetCountByOrigin';
import AssetCountByStatus from '../components/Charts/AssetCountByStatus';

function Dashboard({ assetData, invoiceData }) {
  const hasData = assetData && assetData.length > 0;

  return (
    <>
      {hasData ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InvoiceCountByStatus invoiceData={invoiceData}/>
        <AssetCountByStatus assetData={assetData} />

        <AssetCountByOrigin assetData={assetData} />
        <AvailableAssetsByCategory assetData={assetData} />
      </div>
      ) : (
        <div className='flex items-center justify-center h-64 text-gray-500 text-lg font-bold'>
          No asset data to display
        </div>
      )}
    </>
  );
}

export default Dashboard;
