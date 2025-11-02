
function TotalAssets({ assetData }) {
  const totalAssets = assetData.length;

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">
          Total Assets : {totalAssets}
        </h3>
      </div>
    </>
  );
}

export default TotalAssets;
