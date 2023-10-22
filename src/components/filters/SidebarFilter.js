import React, { useState, useEffect } from 'react';
import './SidebarFilter.css';
import { ReactComponent as FilterIcon } from '../../assets/svg/tune_FILL0_wght400_GRAD0_opsz24.svg';
import { ReactComponent as SearchIcon } from '../../assets/svg/search_FILL0_wght400_GRAD0_opsz24.svg';

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

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMoreFilterActive, setIsMoreFilterActive] = useState(false);

  const handleInputFocus = () => {
    setIsSearchFocused(true);
  };

  const handleInputBlur = () => {
    setIsSearchFocused(false);
  };

  const handleMoreFilterClick = () => {
    setIsMoreFilterActive((prev) => !prev);
  };

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

  useEffect(() => {
    const handleViewportChange = () => {
      if (window.innerWidth < 768) {
        setIsMoreFilterActive(false);
      } else {
        setIsMoreFilterActive(true);
      }
    };

    // Set initial layout based on viewport width
    handleViewportChange();

    window.addEventListener('resize', handleViewportChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleViewportChange);
    };
  }, []); // Runs once on mount


  return (
    <div className={`filter-sidebar md:w-1/4 px-2 md:pr-4 ${isMoreFilterActive ? 'filter-more-active' : ''}`}>
      <div className={`filter-base flex md:block items-center justify-between md:mb-4 border-2 md:border-0 ${isSearchFocused ? 'border-blue search-focused' : 'border-gray-300'}`}>
        <div className='filter-search-icon md:hidden flex-none p-2 opacity-40'>
          <SearchIcon style={{ width: '32px', height: '32px' }} />
        </div>
        <h2 className='block uppercase text-sm uppercase text-gray tracking-wider pb-1 mb-4 border-b border-black hidden md:block'>
          Search by keyword
        </h2>
        <div className="items-center justify-between md:mb-4 relative flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full md:border border-gray-300 p-2 px-4 md:mb-4 outline-none text-2xl md:text-base"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
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
        <div
          className="filter-more-icon md:hidden flex-none p-2 cursor-pointer"
          onClick={handleMoreFilterClick}
        >
          <FilterIcon style={{ width: '32px', height: '32px' }} />
        </div>
      </div>
      <div className={`filter-more bg-white md:bg-transparent md:block p-4 md:p-0 mb-4 md:mb-0 rounded-b border-2 border-t-0 md:border-none ${!isMoreFilterActive ? 'hidden' : ''}`}>
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
        <ul className={`mb-4 border p-2 ${selectedCategories.length > 0 ? 'border-black' : 'border-gray-300'}`}>
          {categories.map((category, index) => (
            <li key={category.id} className={index !== categories.length - 1 ? "mb-2" : ""}>
              <label className='cursor-pointer text-gray-800 flex items-center gap-2'>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.slug)}
                  onChange={() => toggleCategory(category.slug)}
                  className='border-black focus:border-pink-600 outline-none focus:ring-1 focus:ring-pink-600'
                />
                <span className="font-normal">{category.name}</span>
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
        <ul className={`mb-4 border p-2 ${selectedCategories.length > 0 ? 'border-black' : 'border-gray-300'}`}>
          {customers.map((customer, index) => (
            <li key={customer.id} className={index !== customers.length - 1 ? "mb-2" : ""}>
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
      </div>
    </div>
  );
}

export default SidebarFilter;
