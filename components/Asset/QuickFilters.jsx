function QuickFilters() {
  const filterItems = ['Available Assets', 'Items on Loan', 'Condition: New'];
  return (
    <>
      <div className="flex items-center gap-3 ml-2">
        <h3 className="text-xl pl-3">Quick Filters: </h3>
        {filterItems.map((item, idx) => (
          <button
            key={idx}
            className="bg-slate-200 px-3 py-1 rounded-3xl border border-transparent hover:border-slate-500 transition-transform duration-300 ease-in-out"
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
}

export default QuickFilters;
