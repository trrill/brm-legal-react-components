import React from 'react';

function FilterGroup({
  title,
  filterItems,
  selectedFilterItems,
  onSelect,
  currentFilter,
  setCurrentFilter,
  filterKey
}) {
	
  const toggleItem = (itemSlug) => {
    const updatedItems = selectedFilterItems.includes(itemSlug)
      ? selectedFilterItems.filter((item) => item !== itemSlug)
      : [...selectedFilterItems, itemSlug];

    onSelect(updatedItems);

    setCurrentFilter((prevFilter) => ({
      ...prevFilter,
      [filterKey]: updatedItems,
    }));
  };

  return (
    <div id={`filter-${title}`}>
      <div className='flex items-center justify-between py-2'>
        <h3 className='uppercase text-xs font-bold'>{title}</h3>
        <button
          className='text-xs text-gray-400 cursor-pointer hover:text-black'
          onClick={() => {
            onSelect([]);
            setCurrentFilter((prevFilter) => ({
              ...prevFilter,
              [filterKey]: [],
            }));
          }} 
					aria-label={`Clear all ${title} filters`}
        >
          Clear
        </button>
      </div>
      <ul className={`mb-4 border p-2 ${selectedFilterItems && selectedFilterItems.length > 0 ? 'border-black' : 'border-gray-300'}`}>
        {filterItems && filterItems.map((item, index) => (
          <li key={`filter-item-${item.ID}`} className={index !== filterItems.length - 1 ? "mb-2" : ""}>
            <label className='cursor-pointer text-gray-800 flex items-center gap-2'>
              <input
                type="checkbox"
                checked={selectedFilterItems && selectedFilterItems.includes(item.slug)}
                onChange={() => toggleItem(item.slug)}
                className='border-black focus:border-pink-600 outline-none focus:ring-1 focus:ring-pink-600 flex-none'
              />
              <span className="font-normal">{item.name}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterGroup;