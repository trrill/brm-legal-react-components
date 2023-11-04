import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm, performSearch } from '../../redux/actions';

import FilterGroup from './FilterGroup';
import { ReactComponent as FilterIcon } from '../../assets/svg/tune_FILL0_wght400_GRAD0_opsz24.svg';
import { ReactComponent as SearchIcon } from '../../assets/svg/search_FILL0_wght400_GRAD0_opsz24.svg';

function SidebarFilter({
  filterGroups,
  currentFilter,
  setCurrentFilter
}) {
  const dispatch = useDispatch();
  const searchTerm = useSelector(state => state.search.searchTerm);

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
    dispatch(setSearchTerm(event.target.value) );
    dispatch(performSearch(event.target.value));
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
        <h2 className='block text-sm uppercase text-gray tracking-wider pb-1 mb-4 border-b border-black hidden md:block'>
          Search by keyword
        </h2>
        <div className="items-center justify-between md:mb-4 relative flex-1">
          <input
            type="text"
            placeholder="Search by keyword..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full md:border border-gray-300 p-2 px-4 md:mb-4 outline-none text-2xl md:text-base"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />

          {searchTerm && ( // Show the "X" icon only if searchTerm has a value
            <button
            className="absolute top-50 transform -translate-y-50 right-2 cursor-pointer text-3xl text-gray-400 hover:text-black p-1"
            onClick={() => {
              // Dispatch the setSearchTerm action with an empty string to clear the search term
              dispatch(setSearchTerm(''));
              // If you want to update the filtered results right away, dispatch the performSearch action
              dispatch(performSearch(''));
            }} 
            aria-label="Clear search"
          >
            &times;
          </button>
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
          <h2 className='uppercase text-sm text-gray tracking-wider'>Filter by</h2>
          <button
            className='text-sm text-gray-400 cursor-pointer hover:text-black'
            onClick={() => {
              // Reset all filters
              const resetFilters = {};
              filterGroups.forEach(group => {
                group.onSelect([]);
                resetFilters[group.itemKey] = [];
              });
              setCurrentFilter(resetFilters);
            }}
            
            aria-label="Clear all filters"
          >
            Clear All
          </button>
        </div>
          

        {filterGroups.map((group, index) => (
          <FilterGroup
            key={`filter-group-${index}`}
            title={group.title}
            filterItems={group.filterItems}
            selectedFilterItems={group.selectedFilterItems}
            onSelect={group.onSelect}
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter} 
            filterKey={group.filterKey}
            itemKey={group.itemKey}
          />
        ))}

      </div>
    </div>
  );
}

export default SidebarFilter;
