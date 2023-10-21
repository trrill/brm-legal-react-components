import React, { useState, useEffect } from 'react';
import ProductItem from '../items/ProductItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ReactComponent as GridIcon } from '../../assets/svg/view_module_black_24dp.svg';
import { ReactComponent as ListIcon } from '../../assets/svg/view_list_black_24dp.svg';

import './ProductListing.css';

function ProductListing({ products, currentFilter }) {
  const [layout, setLayout] = useState('grid');
  const [searchTerm] = useState('');

  const filteredProducts = products.filter((product) => {
    const productCategories = product.categories || {};
    const productCustomers = product.customers || {};

    const categorySlugs = Object.values(productCategories).map((category) => category.slug);
    const customerSlugs = Object.values(productCustomers).map((customer) => customer.slug);

    const selectedCategories = Object.values(currentFilter.categories || {});
    const selectedCustomers = Object.values(currentFilter.customers || {});

    const matchesCategories =
      selectedCategories.length === 0 ||
      categorySlugs.some((slug) => selectedCategories.includes(slug));

    const matchesCustomers =
      selectedCustomers.length === 0 ||
      customerSlugs.some((slug) => selectedCustomers.includes(slug));
    
    const matchesSearch =
      searchTerm === '' ||
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      categorySlugs.some((slug) => slug.toLowerCase().includes(searchTerm.toLowerCase())) ||
      customerSlugs.some((slug) => slug.toLowerCase().includes(searchTerm.toLowerCase()));


    return matchesCategories && matchesCustomers && matchesSearch;
  });

  useEffect(() => {
    // Function to handle viewport width changes
    const handleViewportChange = () => {
      if (window.innerWidth < 768) {
        setLayout('list');
      } else {
        setLayout('grid');
      }
    };

    // Set initial layout based on viewport width
    handleViewportChange();

    // Add a window resize event listener to update layout on resize
    window.addEventListener('resize', handleViewportChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleViewportChange);
    };
  }, []); // Empty dependency array ensures this effect runs once on mount


  return (
    <div className='md:w-3/4 px-2 md:pl-4 mt-6 md:mt-0'>
      <div className='flex items-center mb-4'>
        <div>
          <h2 className='uppercase text-sm uppercase text-gray tracking-wider'>Providers</h2>
          <p className='text-sm text-gray-400'>{filteredProducts.length} results</p>
        </div>
        <div id="listing-layout-toggle" className='hidden md:flex ml-auto items-center'>
          <span 
            className={`mr-2 cursor-pointer ${layout === 'grid' ? 'opacity-1' : 'opacity-40 hover:opacity-70'}`} 
            onClick={() => setLayout('grid')}
            >
              <GridIcon style={{width: '32px', height: '32px'}} />
          </span>
          |
          <span 
            className={`ml-2 cursor-pointer ${layout === 'list' ? 'opacity-1' : 'opacity-40 hover:opacity-70'}`}
            onClick={() => setLayout('list')}
            >
            <ListIcon style={{width: '32px', height: '32px'}} />
          </span>
        </div>

      </div>
   
      <TransitionGroup 
        className={`product-listing flex-wrap gap-2 ${layout === 'grid' ? 'flex' : 'flex-col'} listing-layout-${layout}`}>
          {filteredProducts.map((product) => (
              <CSSTransition
                  key={product.post.ID}
                  timeout={500}
                  classNames="product-item-transition"
              >
                  <ProductItem product={product} layout={layout} />
              </CSSTransition>
          ))}
      </TransitionGroup>
    </div>
  );
}

export default ProductListing;
