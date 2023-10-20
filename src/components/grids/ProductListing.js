import React, { useState } from 'react';
import ProductItem from '../items/ProductItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ReactComponent as GridIcon } from '../../assets/svg/view_module_black_24dp.svg';
import { ReactComponent as ListIcon } from '../../assets/svg/view_list_black_24dp.svg';

function ProductListing({ products, currentFilter }) {
  const [layout, setLayout] = useState('grid');

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

    return matchesCategories && matchesCustomers;
  });

  return (
    <div className='lg:w-3/4 px-2 lg:pl-4'>
      <div className='flex items-center'>
        <div>
          <h2 className='uppercase text-sm uppercase text-gray tracking-wider'>Results</h2>
          <p className='text-sm text-gray-400'>{filteredProducts.length} results</p>
        </div>
        <div id="listing-layout-toggle" className='ml-auto flex'>
          <span 
            className={`mr-2 cursor-pointer ${layout === 'grid' ? 'opacity-1' : 'opacity-50 hover:opacity-70'}`} 
            onClick={() => setLayout('grid')}
            >
              <GridIcon />
          </span>
          |
          <span 
            className={`ml-2 cursor-pointer ${layout === 'list' ? 'opacity-1' : 'opacity-70 hover:opacity-80'}`}
            onClick={() => setLayout('list')}
            >
            <ListIcon />
          </span>
        </div>

      </div>
   
        <TransitionGroup 
          className={`product-listing flex-wrap ${layout === 'grid' ? 'flex' : 'flex-col'} listing-layout-${layout}`}>
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
