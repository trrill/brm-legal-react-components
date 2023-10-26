import React, { useState, useEffect, useCallback, useRef } from 'react';
import LayoutListGrid from '../../components/layouts/LayoutListGrid';
import SidebarFilter from '../../components/filters/SidebarFilter';
import './tailwind-output.css';
import './App.css';

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
      selectedItems: selectedBonusCategories,
      onSelect: setSelectedBonusCategories,
      filterKey: "value",
      items: [
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
      selectedItems: selectedSalaryScales,
      onSelect: setSelectedSalaryScales,
      filterKey: "value",
      items: [
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
    },
    
  ];
  

  const isDevelopment = window.location.hostname === "dev.abovethelaw.com" || window.location.hostname === "localhost";

  const apiBasePoint = isDevelopment 
    ? 'http://dev.aldus.abovethelaw.com:3000/wp-api'
    : 'https://aldus.abovethelaw.com:3000/wp-api';

  const fetchedFirmsRef = useRef(false);

  const handleSearch = (searchTerm) => {
    // Update the filteredFirms based on the search term

    const filtered = firms.filter((firm) => {
      // Check if the firm title, excerpt, content, or categories/customers match the search term
      return (
        firm.post.post_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        firm.post.post_excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||

        firm.bonus_category.some((category) =>
          category.display.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        firm.salary_scale.some((salary) =>
          salary.display.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    });

    // Set the filtered firms in the state
    setFilteredFirms(filtered);
  };

  useEffect(() => {
    const fetchFirms = async () => {
      //setLoading(true);
      try {
        console.log('Fetching firms...');
        const apiUrl = `${apiBasePoint}/wp-json/custom/v1/transparency_firms_data`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setFirms(data);
        setFilteredFirms(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        //setLoading(false);
      }
    };

    if ( ! fetchedFirmsRef.current) {
      fetchFirms();
      fetchedFirmsRef.current = true;
    }
    
  }, [firms, apiBasePoint]);

  

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
          items={filteredFirms} 
          currentFilter={currentFilter} e
        />
      </div>
    </div>
  );
}

export default App;
