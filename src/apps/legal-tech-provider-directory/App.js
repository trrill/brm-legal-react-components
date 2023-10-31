import React, { useState, useEffect, useCallback, useRef } from 'react';
import LayoutListGrid from '../../components/layouts/LayoutListGrid';
import SidebarFilter from '../../components/filters/SidebarFilter';
import './tailwind-output.css';
import './App.css';

function App() {
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [currentFilter, setCurrentFilter] = useState({});
  const [categories, setCategories] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  const isDevelopment = window.location.hostname === "dev.abovethelaw.com" || window.location.hostname === "localhost";

  const apiBasePoint = isDevelopment 
  ? 'http://dev.aldus.abovethelaw.com:3000/wp-api/legal-innovation-center'
  : 'https://aldus.abovethelaw.com:3000/wp-api/legal-innovation-center';  

  const fetchedProvidersRef = useRef(false);

  const filterGroups = [
    {
      title: "Categories",
      selectedFilterItems: selectedCategories,
      onSelect: setSelectedCategories,
      filterKey: "product_category",
      itemKey: "slug",
      filterItems: categories
    },
    {
      title: "Customers",
      selectedFilterItems: selectedCustomers,
      onSelect: setSelectedCustomers,
      filterKey: "customer_type",
      itemKey: "slug",
      filterItems: customers
    }
  ];  

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
    const regex = new RegExp(searchTerm.toLowerCase());
  
    const matchesSearchTerm = (str) => regex.test(str.toLowerCase());
  
    const providerMatchesSearch = (provider) => {
      // Check if the provider title, excerpt, or content matches the search term
      if (
        matchesSearchTerm(provider.post.post_title) ||
        matchesSearchTerm(provider.post.post_excerpt) ||
        matchesSearchTerm(provider.post.post_content)
      ) {
        return true;
      }
  
      // Check if any of the provider's categories/customers match the search term
      const categoryMatches = provider.categories.some((category) => matchesSearchTerm(category.name));
      const customerMatches = provider.customers.some((customer) => matchesSearchTerm(customer.name));
  
      return categoryMatches || customerMatches;
    };
  
    // Filter providers based on the search criteria
    const filtered = providers.filter(providerMatchesSearch);
  
    // Update the state
    setFilteredProviders(filtered);
  };
  

  useEffect(() => {
    const fetchData = async () => {
        try {
            
            await fetchTopLevelTaxonomyTerms('product_category', setCategories);
            await fetchTopLevelTaxonomyTerms('customer_type', setCustomers);

            // Once both taxonomy terms have been fetched, fetch the providers
            const apiUrl = `${apiBasePoint}/wp-json/custom/v1/providers_with_terms`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            let dataArray = data;
            
            if (!Array.isArray(data)) {
                dataArray = Object.values(data);
            }

            setProviders(dataArray);
            setFilteredProviders(dataArray);
        } catch (error) {
            console.error("Error fetching data: ", error);
        } finally {
            // setLoading(false);
        }
    };

    if (!fetchedProvidersRef.current) {
        fetchData();
        fetchedProvidersRef.current = true;
    }
}, [fetchTopLevelTaxonomyTerms, apiBasePoint]);

  return (
    <div className="app bg-gray-100" id="legal-provider-directory">
      <h1 className="uppercase text-white text-mono text-5xl text-center p-4 pt-5 m-0 mb-4 gradient-title">
        Legal Tech Directory
      </h1>
      <div className="md:flex mx-auto">
        <SidebarFilter
          filterGroups={filterGroups}
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter} 
          onSearch={handleSearch}
        />
        <LayoutListGrid 
          items={filteredProviders} 
          currentFilter={currentFilter} 
        />
      </div>
    </div>
  );
}

export default App;
