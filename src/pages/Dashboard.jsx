import { useState, useEffect } from 'react';
import InvoiceCountByStatus from '../components/Charts/InvoiceCountByStatus';
import AvailableAssetsByCategory from '../components/Charts/AvailableAssetsByCategory';
import AssetCountByOrigin from '../components/Charts/AssetCountByOrigin';
import AssetCountByStatus from '../components/Charts/AssetCountByStatus';

function Dashboard({ assetData, invoiceData }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (assetData !== null && invoiceData !== null) {
      setLoading(false);
    }
  }, [assetData, invoiceData]);

  const hasAssetData = assetData && assetData.length > 0;
  const hasInvoiceData = invoiceData && invoiceData.length > 0;

  return (
    <>
      {loading ? (
        <div className='flex items-center justify-center h-64 text-gray-500 text-lg font-bold'>
          Loading data...
        </div>
      ) : hasAssetData || hasInvoiceData ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {hasInvoiceData && <InvoiceCountByStatus invoiceData={invoiceData} />}

          {hasAssetData && (
            <>
              <AssetCountByStatus assetData={assetData} />
              <AssetCountByOrigin assetData={assetData} />
              <AvailableAssetsByCategory assetData={assetData} />
            </>
          )}
        </div>
      ) : (
        <div className='flex items-center justify-center h-64 text-gray-500 text-lg font-bold'>
          No data available
        </div>
      )}
    </>
  );
}

export default Dashboard;
