import React, { useState, useEffect, useRef } from 'react';
import LayoutListGrid from '../../components/layouts/LayoutListGrid';
import SidebarFilter from '../../components/filters/SidebarFilter';
import './tailwind-output.css';
import './App.css';

// Law Firm Transparency Directory
function App() {
  const [firms, setFirms] = useState([]);
  const [filteredFirms, setFilteredFirms] = useState([]);
  const [currentFilter, setCurrentFilter] = useState({});
  const [selectedBonusCategories, setSelectedBonusCategories] = useState([]);
  const [selectedSalaryScales, setSelectedSalaryScales] = useState([]);

  const filterGroups = [
    {
      title: "Bonus Category",
      note: "When the billable hours requirement is unknown or in excess of 2000 hours, bonuses are marked as Full Match.",
      selectedFilterItems: selectedBonusCategories,
      onSelect: setSelectedBonusCategories,
      filterKey: "bonus_category",
      itemKey: "value",
      filterItems: [
        {
          id: "bonus_category_8",
          name: "Market +",
          slug: "market-plus",
          value: 8
        },
        {
          id: "bonus_category_5",
          name: "Full Match < 2000 Hours Billable Requirement",
          slug: "full-match-less-than-2000-hours-billable-requirement",
          value: 5
        },
        {
          id: "bonus_category_4",
          name: "Full Match",
          slug: "full-match",
          value: 4
        },
        {
          id: "bonus_category_3",
          name: "Less Than Market",
          slug: "less-than-market",
          value: 2
        },
        {
          id: "bonus_category_1",
          name: "Black Box",
          slug: "black-box",
          value: 1
        }

      ]
    },
    {
      title: "Salary Scale",
      note: "Market salary is based on a $202,500-205,000 scale for first-year associates.",
      selectedFilterItems: selectedSalaryScales,
      onSelect: setSelectedSalaryScales,
      filterKey: "salary_scale",
      itemKey: "value",
      filterItems: [
        {
          id: "salary_scale_4",
          name: "Market +",
          slug: "market-plus",
          value: 4
        },
        {
          id: "salary_scale_3",
          name: "Market",
          slug: "market",
          value: 3
        },
        {
          id: "salary_scale_2",
          name: "Below Market",
          slug: "below-market",
          value: 2
        },
      ]
    }
  ];
  
  const isDevelopment = window.location.hostname === "dev.abovethelaw.com" || window.location.hostname === "localhost";

  const apiBasePoint = isDevelopment 
    ? 'http://dev.aldus.abovethelaw.com:3000/wp-api'
    : 'https://aldus.abovethelaw.com:3000/wp-api';

  const fetchedFirmsRef = useRef(false);

  const handleSearch = (searchTerm) => {
    const regex = new RegExp(searchTerm.toLowerCase());
  
    const matchesSearchTerm = (str) => regex.test(str.toLowerCase());
  
    const firmMatchesSearch = (firm) => {
      // Check if the provider title, excerpt, or content matches the search term
      if (
        matchesSearchTerm(firm.post.post_title) ||
        matchesSearchTerm(firm.post.post_excerpt) ||
        matchesSearchTerm(firm.post.post_content)
      ) {
        return true;
      }
  
      // Check if any of the firm's categories/customers match the search term
      const bonusCategoryMatches = firm.bonus_category.some((category) => matchesSearchTerm(category.display));
      const salaryScaleMatches = firm.salary_scale.some((customer) => matchesSearchTerm(customer.display));
  
      return bonusCategoryMatches || salaryScaleMatches;
    };
  
    // Filter providers based on the search criteria
    const filtered = firms.filter(firmMatchesSearch);
  
    // Update the state
    setFilteredFirms(filtered);
  };

  useEffect(() => {
    const fetchFirms = async () => {
      //setLoading(true);
      try {
        const apiUrl = `${apiBasePoint}/wp-json/custom/v1/transparency_firms_data`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        let dataArray = data;

        if ( ! Array.isArray(data) ) {
          dataArray = Object.values(data);
        }
        
        setFirms(dataArray);
        setFilteredFirms(dataArray);

      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        //
      }
    };

    if ( ! fetchedFirmsRef.current) {
      fetchFirms();
      fetchedFirmsRef.current = true;
    }
    
  }, [firms, apiBasePoint]);

  return (
    <div className="app bg-gray-100" id="legal-provider-directory">
      <h1 className="uppercase text-4xl text-center p-4 pt-5 m-0 mb-4 border-b-2 border-pear">
        Law Firm Transparency
      </h1>
      <div className="md:flex mx-auto">
        <SidebarFilter
          filterGroups={filterGroups}
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter} 
          onSearch={handleSearch}
        />
        <LayoutListGrid 
          itemsName="Firms"
          items={filteredFirms} 
          filterGroups={filterGroups} 
          currentFilter={currentFilter} 
        />
      </div>
    </div>
  );
}

export default App;
