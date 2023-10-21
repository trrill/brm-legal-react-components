import React, { useState, useEffect } from 'react';
import ProductListing from '../../components/grids/ProductListing';
import SidebarFilter from '../../components/filters/SidebarFilter';

import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]); // Initialize as an empty array
  const [selectedCustomers, setSelectedCustomers] = useState([]); // Initialize as an empty array
  //const [loading, setLoading] = useState(false);
  

  const [currentFilter, setCurrentFilter] = useState({
    categories: [],
    customers: [],
  });

  const handleSearch = (searchTerm) => {
    // Update the filteredProducts based on the search term

    const filtered = products.filter((product) => {
      // Check if the product title, excerpt, content, or categories/customers match the search term
      return (
        product.post.post_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.post.post_excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.post.post_content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.categories.some((category) =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        product.customers.some((customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    });

    // Set the filtered products in the state
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    const fetchTransparencyFirms = async () => {
      setLoading(true);
      try {
        console.log('Fetching providers...');
        const apiUrl = `${process.env.REACT_APP_ATL_BASE_URL}/wp-json/custom/v1/transparency_firms_with_terms`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (products.length === 0) {
      fetchTransparencyFirms();
    }
    
    //fetchTopLevelTaxonomyTerms('product_category', setCategories);
    //fetchTopLevelTaxonomyTerms('customer_type', setCustomers);
  }, [products, ]);

  return (
    <div className="app" id="legal-provider-directory">
      <h1 className="uppercase text-white text-mono text-5xl text-center p-4 pt-5 m-0 mb-4 gradient-title">
        Legal Tech Directory
      </h1>
      <div className="md:flex mx-auto">
        <SidebarFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onSelectCategories={setSelectedCategories}
          customers={customers}
          selectedCustomers={selectedCustomers}
          onSelectCustomers={setSelectedCustomers}
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter} 
          onSearch={handleSearch}
        />
        <ProductListing 
          products={filteredProducts} 
          currentFilter={currentFilter} 
        />
      </div>
    </div>
  );
}

export default App;
