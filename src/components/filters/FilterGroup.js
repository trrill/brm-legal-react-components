import React from 'react';

function FilterGroup({
  title,
  items,
  selectedItems,
  onSelect,
  currentFilter,
  setCurrentFilter,
  filterKey
}) {
  const toggleItem = (itemSlug) => {
    const updatedItems = selectedItems.includes(itemSlug)
      ? selectedItems.filter((item) => item !== itemSlug)
      : [...selectedItems, itemSlug];

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
        <span
          className='text-xs text-gray-400 cursor-pointer hover:text-black'
          onClick={() => {
            onSelect([]);
            setCurrentFilter((prevFilter) => ({
              ...prevFilter,
              [filterKey]: [],
            }));
          }}
          title={`Clear all ${title} filters`}
        >
          Clear
        </span>
      </div>
      <ul className={`mb-4 border p-2 ${selectedItems.length > 0 ? 'border-black' : 'border-gray-300'}`}>
        {items.map((item, index) => (
          <li key={item.id} className={index !== items.length - 1 ? "mb-2" : ""}>
            <label className='cursor-pointer text-gray-800 flex items-center gap-2'>
              <input
                type="checkbox"
                checked={selectedItems.includes(item.slug)}
                onChange={() => toggleItem(item.slug)}
                className='border-black focus:border-pink-600 outline-none focus:ring-1 focus:ring-pink-600'
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