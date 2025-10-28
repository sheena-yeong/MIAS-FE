function QuickFilters() {
  const filterItems = ['Available Assets', 'Items on Loan'];
  return (
    <>
      <div className="flex items-center gap-3 ml-2">
        <h3 className="text-xl pl-3">QuickFilters</h3>
        {filterItems.map((item, idx) => (
          <button key={idx} className="bg-slate-200 px-3 py-1 rounded-3xl">
            {item}
          </button>
        ))}
      </div>
    </>
  );
}

export default QuickFilters;
