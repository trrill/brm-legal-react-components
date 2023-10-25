import React, { useState, useEffect, useCallback, useRef } from 'react';
import LayoutListGrid from '../../components/layouts/LayoutListGrid';
import SidebarFilter from '../../components/filters/SidebarFilter';
import './tailwind-output.css';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  //const [loading, setLoading] = useState(false);
  
  const [currentFilter, setCurrentFilter] = useState({
    categories: [],
    customers: [],
  });

  const isDevelopment = window.location.hostname === "dev.abovethelaw.com" || window.location.hostname === "localhost";

  const apiBasePoint = isDevelopment 
    ? 'http://dev.abovethelaw.com/legal-innovation-center'
    : 'https://abovethelaw.com/legal-innovation-center';

  const fetchedProductsRef = useRef(false);

  const fetchTopLevelTaxonomyTerms = useCallback(async (taxonomyType, stateSetter) => {
    try {
      const url = `${apiBasePoint}/wp-json/custom/v1/taxonomy/?taxonomy=${taxonomyType}&post_type=legal_provider`;
      const response = await fetch(url);
      const data = await response.json();
      stateSetter(data);
    } catch (error) {
      console.error(`Error fetching ${taxonomyType}: `, error);
    }
  }, [apiBasePoint]);

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
    const fetchProviders = async () => {
      //setLoading(true);
      try {
        console.log('Fetching providers...');
        const apiUrl = `${apiBasePoint}/wp-json/custom/v1/providers_with_terms`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        //setLoading(false);
      }
    };

    if ( ! fetchedProductsRef.current) {
      fetchProviders();
      fetchedProductsRef.current = true;
    }
    
  }, [products, apiBasePoint]);

  useEffect(() => {
    fetchTopLevelTaxonomyTerms('product_category', setCategories);
    fetchTopLevelTaxonomyTerms('customer_type', setCustomers);
  }, [fetchTopLevelTaxonomyTerms]);

  return (
    <div className="app bg-gray-100" id="legal-provider-directory">
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
        <LayoutListGrid 
          products={filteredProducts} 
          currentFilter={currentFilter} 
        />
      </div>
    </div>
  );
}

export default App;
