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
  const [loading, setLoading] = useState(false);

  const [currentFilter, setCurrentFilter] = useState({
    categories: [],
    customers: [],
  });

  /* const fetchTopLevelParentTerm = async (termId, taxonomyType) => {
    const apiUrl = `${process.env.REACT_APP_ATL_LIC_BASE_URL}/wp-json/wp/v2/${taxonomyType}/${termId}`;
    const response = await fetch(apiUrl);
    const term = await response.json();

    // If the term has a parent, recursively fetch the parent
    if (term.parent !== 0) {
      return fetchTopLevelParentTerm(term.parent, taxonomyType);
    }
    return term; // This is the top-level term
  }; */

  const fetchTopLevelTaxonomyTerms = async (taxonomyType, stateSetter) => {
    try {
      const url = `${process.env.REACT_APP_ATL_LIC_BASE_URL}/wp-json/wp/v2/${taxonomyType}?post_type=legal_provider&parent=0&hide_empty=true`;
      const response = await fetch(url);
      const data = await response.json();
      stateSetter(data);
    } catch (error) {
      console.error(`Error fetching ${taxonomyType}: `, error);
    }
  };

  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
      try {
        const apiUrl = `${process.env.REACT_APP_ATL_LIC_BASE_URL}/wp-json/custom/v1/providers_with_terms`;
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

    fetchProviders();
    fetchTopLevelTaxonomyTerms('product_category', setCategories);
    fetchTopLevelTaxonomyTerms('customer_type', setCustomers);
  }, []);

  return (
    <div className="app lg:flex mx-auto" id="legal-provider-directory">
      <SidebarFilter
        categories={categories}
        selectedCategories={selectedCategories}
        onSelectCategories={setSelectedCategories}
        customers={customers}
        selectedCustomers={selectedCustomers}
        onSelectCustomers={setSelectedCustomers}
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter} 
      />
      <ProductListing 
        products={filteredProducts} 
        currentFilter={currentFilter} 
      />
    </div>
  );
}

export default App;
