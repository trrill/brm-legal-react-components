import React from 'react';

function SidebarFilter({
  categories,
  selectedCategories,
  onSelectCategories,
  customers,
  selectedCustomers,
  onSelectCustomers,
  currentFilter,
  setCurrentFilter,
}) {

  console.log("selectedCategories:", selectedCategories);
  console.log("selectedCustomers:", selectedCustomers);
  

    const toggleCategory = (categorySlug) => {
      const updatedCategories = selectedCategories.includes(categorySlug)
        ? selectedCategories.filter((category) => category !== categorySlug)
        : [...selectedCategories, categorySlug];
    
      onSelectCategories(updatedCategories);
    
      // Update the currentFilter for productCategories
      setCurrentFilter((prevFilter) => ({
        ...prevFilter,
        productCategories: updatedCategories,
      }));
    };
    
    const toggleCustomer = (customerSlug) => {
      const updatedCustomers = selectedCustomers.includes(customerSlug)
        ? selectedCustomers.filter((customer) => customer !== customerSlug)
        : [...selectedCustomers, customerSlug];
    
      onSelectCustomers(updatedCustomers);
    
      // Update the currentFilter for customers
      setCurrentFilter((prevFilter) => ({
        ...prevFilter,
        customers: updatedCustomers,
      }));
    };
    
    

  return (
    <div className="filter-sidebar">
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.slug)}
                onChange={() => toggleCategory(category.slug)}
              />
              {category.name}
            </label>
          </li>
        ))}
      </ul>

      <h2>Customers</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedCustomers.includes(customer.slug)}
                onChange={() => toggleCustomer(customer.slug)}
              />
              {customer.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarFilter;
