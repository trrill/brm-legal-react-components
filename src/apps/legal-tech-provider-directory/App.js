import React, { useState, useEffect } from 'react';
import ProductGrid from '../../components/grids/ProductGrid';
import SidebarFilter from '../../components/filters/SidebarFilter';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]); // Initialize as an empty array
  const [selectedCustomers, setSelectedCustomers] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false);

  const [currentFilter, setCurrentFilter] = useState({
    productCategories: [],
    customers: [],
  });

  const fetchTopLevelParentTerm = async (termId, taxonomyType) => {
    const apiUrl = `${process.env.REACT_APP_ATL_LIC_BASE_URL}/wp-json/wp/v2/${taxonomyType}/${termId}`;
    const response = await fetch(apiUrl);
    const term = await response.json();
  
    // If the term has a parent, recursively fetch the parent
    if (term.parent !== 0) {
      return fetchTopLevelParentTerm(term.parent, taxonomyType);
    }
    return term; // This is the top-level term
  };
  
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
        const apiUrl = `${process.env.REACT_APP_ATL_LIC_BASE_URL}/wp-json/wp/v2/legal_tech_provider`;
        const response = await fetch(apiUrl);
        const data = await response.json();
    
        // Fetch top-level parent terms for each post
        const postsWithTopLevelTerms = await Promise.all(data.map(async post => {
          const productCategoryParents = await Promise.all(post.product_category.map(termId => fetchTopLevelParentTerm(termId, 'product_category')));
          const customerTypeParents = await Promise.all(post.customer_type.map(termId => fetchTopLevelParentTerm(termId, 'customer_type')));
          
          return {
            ...post,
            productCategoryParents,
            customerTypeParents
          };
        }));
    
        setProducts(postsWithTopLevelTerms);
        setFilteredProducts(postsWithTopLevelTerms); 
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    

    const fetchTermDetails = async (termIds, taxonomy= 'category' ) => {
      const termDetails = [];
    
      for (const termId of termIds) {
        if (!termId) {
          termDetails.push(null); // Handle cases where term ID is missing
          continue;
        }
    
        try {
          const termUrl = `${process.env.REACT_APP_ATL_LIC_BASE_URL}/wp-json/wp/v2/${taxonomy}/${termId}`; // Replace 'your_taxonomy' with the actual taxonomy name
          const termResponse = await fetch(termUrl);
          const termData = await termResponse.json();
          termDetails.push(termData);
        } catch (error) {
          console.error(`Error fetching term details for term ID ${termId}: `, error);
          termDetails.push(null); // Handle errors gracefully
        }
      }
    
      return termDetails;
    };
    

    fetchProviders();
    fetchTopLevelTaxonomyTerms('product_category', setCategories);
    fetchTopLevelTaxonomyTerms('customer_type', setCustomers);
  }, []);

  return (
    <div className="app">
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

      <ProductGrid products={filteredProducts} currentFilter={currentFilter} />
    </div>
  );
}

export default App;
