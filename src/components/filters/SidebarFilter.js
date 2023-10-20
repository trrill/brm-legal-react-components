import React from 'react';

function SidebarFilter({
  categories,
  selectedCategories,
  onSelectCategories,
  customers,
  selectedCustomers,
  onSelectCustomers,
  currentFilter,
  setCurrentFilter,
}) {
  const currentFilterReadable = JSON.stringify(currentFilter, null, 2);

  const toggleCategory = (categorySlug) => {
    const updatedCategories = selectedCategories.includes(categorySlug)
      ? selectedCategories.filter((category) => category !== categorySlug)
      : [...selectedCategories, categorySlug];

    onSelectCategories(updatedCategories);

    // Update the currentFilter for categories
    setCurrentFilter((prevFilter) => ({
      ...prevFilter,
      categories: updatedCategories,
    }));
  };

  const toggleCustomer = (customerSlug) => {
    const updatedCustomers = selectedCustomers.includes(customerSlug)
      ? selectedCustomers.filter((customer) => customer !== customerSlug)
      : [...selectedCustomers, customerSlug];

    onSelectCustomers(updatedCustomers);

    // Update the currentFilter for customers
    setCurrentFilter((prevFilter) => ({
      ...prevFilter,
      customers: updatedCustomers,
    }));
  };

  return (
    <div className="filter-sidebar lg:w-1/4 px-2 lg:pr-4">
      <div className='pb-1 mb-4 border-b border-black flex items-center justify-between'>
        <h2 className='uppercase text-sm uppercase text-gray tracking-wider'>Filter by</h2>
        <span
          className='text-sm text-gray-400 cursor-pointer hover:text-black'
          onClick={() => {
            onSelectCategories([]);
            onSelectCustomers([]);
            setCurrentFilter({});
          }} 
          title="Clear all filters"
        >
          Clear All
        </span>
      </div>

      <div className='flex items-center justify-between py-2'>
        <h3 className='uppercase text-xs font-bold'>Categories</h3>
        <span
          className='text-xs text-gray-400 cursor-pointer hover:text-black'
          onClick={() => {
            onSelectCategories([]);
            setCurrentFilter((prevFilter) => ({
              ...prevFilter,
              categories: [],
            }));
          }} 
          title="Clear all Product Category filters"
        >
          Clear
        </span>
      </div>
      <ul className={`mb-4 border p-2 ${selectedCategories.length > 0 ? 'border-black' : 'border-gray-200'}`}>
        {categories.map((category) => (
          <li key={category.id} className="mb-2">
            <label className='cursor-pointer text-gray-800 flex items-center gap-2'>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.slug)}
                onChange={() => toggleCategory(category.slug)} 
                className='border-black focus:border-pink-600 outline-none focus:ring-1 focus:ring-pink-600'
              />
              <span>{category.name}</span>
            </label>
          </li>
        ))}
      </ul>

      <div className='flex items-center justify-between py-2'>
        <h3 className='uppercase text-xs font-bold'>Customers</h3>
        <span
          className='text-xs text-gray-400 cursor-pointer hover:text-black'
          onClick={() => {
            onSelectCustomers([]);
            setCurrentFilter((prevFilter) => ({
              ...prevFilter,
              customers: [],
            }));
          }} 
          title="Clear all Customer Type filters"
        >
          Clear
        </span>
      </div>
      <ul className={`mb-4 border p-2 ${selectedCategories.length > 0 ? 'border-black' : 'border-gray-200'}`}>
        {customers.map((customer) => (
          <li key={customer.id} className="mb-2">
            <label className='cursor-pointer text-gray-800 flex items-center gap-2'>
              <input
                type="checkbox"
                checked={selectedCustomers.includes(customer.slug)}
                onChange={() => toggleCustomer(customer.slug)} 
                className='border-black focus:border-pink-600 outline-none focus:ring-1 focus:ring-pink-600'
              />
              <span>{customer.name}</span>
            </label>
          </li>
        ))}
      </ul>

      <pre style={{fontSize: '0.75rem'}}>
        {currentFilterReadable}
      </pre>
    </div>
  );
}

export default SidebarFilter;
