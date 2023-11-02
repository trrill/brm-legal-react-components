import React, { useState, useEffect, useMemo } from 'react';
import LayoutListItem from '../items/LayoutListItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ReactComponent as GridIcon } from '../../assets/svg/view_module_black_24dp.svg';
import { ReactComponent as ListIcon } from '../../assets/svg/view_list_black_24dp.svg';
import { debounce } from '../../utils/utils';
import './LayoutListGrid.css';

function LayoutListGrid({ itemsName, items, filterGroups, currentFilter }) {
  const [layout, setLayout] = useState(window.innerWidth < 768 ? 'list' : 'grid');
  const itemRefs = React.useRef({});

  const filteredItems = useMemo(() => {
    //console.log("Current Filter:", currentFilter);

    /* Don't just check for empty currentFilter;
    check whether filter actually has items with values. */
    if (Object.keys(currentFilter).length === 0 || 
    Object.values(currentFilter).every(filter => filter.values && filter.values.length === 0)) {
    
      return items;
    }

    return items.filter((item) => {
      //console.log("Inspecting Item:", item);

      let isItemMatched = false; // flag to determine if item matches any filter
  
      for (let [key, filterCriteria] of Object.entries(currentFilter)) {
        const filterKey = key;
        const itemKey = filterCriteria.attribute || "value"; // default to "value" if not provided
        const selectedFilterItems = filterCriteria.values;
  
        if (!item[filterKey]) continue;
  
        // For array attributes, loop through each element
        if (Array.isArray(item[filterKey])) {
          //console.log("Item attribute is array:", item[filterKey]);

          const matchesAnyInArray = item[filterKey].some(element => {
            //console.log("Matched in array:", element);

            return selectedFilterItems.includes(element[itemKey]);
          });
          if (matchesAnyInArray) {
            isItemMatched = true;
            break; // Break out of the loop as soon as a match is found
          }
        } else {
          
          // For non-array attributes
          let itemValue = item[filterKey][itemKey];
          itemValue = itemValue.replace(/^"|"$/g, '');

          //console.log("Original Item Value:", itemValue);

          if (!isNaN(itemValue) && typeof selectedFilterItems[0] === 'number') {
              itemValue = parseFloat(itemValue);
          }

          //console.log("Parsed Item Value:", itemValue);

          if (selectedFilterItems.includes(itemValue)) {
              //console.log("Item matched:", item);

              isItemMatched = true;
              break; // Break out of the loop as soon as a match is found
          }

        }
      }
  
      


      return isItemMatched;  // Return true if item matches any filter criteria, false otherwise
    });
  }, [items, currentFilter]);

  //console.log("Filtered Items Count:", filteredItems.length);
  
  // Directly initialize the refs for the current set of filtered items, i.e. all of em
  filteredItems.forEach(item => {
    if (!itemRefs.current[item.post.ID]) {
      itemRefs.current[item.post.ID] = React.createRef();
    }
  });

  useEffect(() => {
    const handleViewportChange = debounce(() => {
      if (window.innerWidth < 768) {
          setLayout('list');
      }
    }, 250); // Debounce time in milliseconds

    window.addEventListener('resize', handleViewportChange);

    // Clean up the event listener when the component unmounts
    return () => {
        window.removeEventListener('resize', handleViewportChange);
    };
  }, []); // Run once on mount

  return (
    <div className='md:w-3/4 px-2 md:pl-4 mt-6 md:mt-0'>
      <div className='flex items-center mb-4'>
        <div>
          <h2 className='uppercase text-sm uppercase text-gray tracking-wider'>
            {itemsName}
          </h2>
          <p className='text-sm text-gray-400'>{filteredItems.length} results</p>
        </div>
        <div id="listing-layout-toggle" className='hidden md:flex ml-auto items-center'>
          <span
            className={`mr-2 cursor-pointer ${layout === 'grid' ? 'opacity-1' : 'opacity-40 hover:opacity-70'}`}
            onClick={() => setLayout('grid')}
          >
            <GridIcon style={{ width: '32px', height: '32px' }} />
          </span>
          |
          <span
            className={`ml-2 cursor-pointer ${layout === 'list' ? 'opacity-1' : 'opacity-40 hover:opacity-70'}`}
            onClick={() => setLayout('list')}
          >
            <ListIcon style={{ width: '32px', height: '32px' }} />
          </span>
        </div>

      </div>

      <TransitionGroup
        className={`item-listing flex-wrap gap-2 ${layout === 'grid' ? 'flex' : 'flex-col'} listing-layout-${layout}`}
      >
        {filteredItems.map((item) => {
          const ref = itemRefs.current[item.post.ID];

          return (
            <CSSTransition
              timeout={500}
              classNames="item-item-transition"
              key={item.post.ID}
              nodeRef={ref}
            >
              <LayoutListItem ref={ref} item={item} layout={layout} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
}

export default LayoutListGrid;
