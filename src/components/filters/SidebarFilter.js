import React, {useState} from 'react';

function SidebarFilter({
  categories,
  selectedCategories,
  onSelectCategories,
  customers,
  selectedCustomers,
  onSelectCustomers,
  currentFilter,
  setCurrentFilter,
  onSearch
}) {
  const currentFilterReadable = JSON.stringify(currentFilter, null, 2);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    
    // Call the search function with the updated search term
    onSearch(event.target.value);
  };

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

      <h2 className='uppercase text-sm uppercase text-gray tracking-wider pb-1 mb-4 border-b border-black'>
        Search by keyword
      </h2>
      <div className="items-center justify-between mb-4 relative">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full border p-2 mb-4"
        />
        
        {searchTerm && ( // Show the "X" icon only if searchTerm has a value
          <span 
            className="absolute top-50 transform -translate-y-50 right-2 cursor-pointer text-3xl text-gray-400 hover:text-black p-1"
            onClick={() => {
              setSearchTerm(''); // Clear the search term
              onSearch(''); // Update filtered results
            }}
          >
            &times;
          </span>
        )}
      </div>


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
