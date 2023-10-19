import React, { useState, useEffect } from 'react';
import ProductGrid from '../../components/grids/ProductGrid';
import SidebarFilter from '../../components/filters/SidebarFilter';

function App() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
	const [customers, setCustomers] = useState([]);
	const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [loading, setLoading] = useState(false);

	const initialState = {
		products: [],    // store the list of products fetched from API
		filters: {       // store the applied filters
		  category: [],
		  customer: []
		},
		loading: false,  // track if data is being fetched
		error: null      // store any error message
	};

	// Fetch top-level categories
	const fetchTopLevelProductCategories = async () => {
		try {
			const categoryUrl = `${process.env.REACT_APP_ATL_LIC_BASE_URL}/wp-json/wp/v2/product_category?post_type=legal_provider&parent=0&hide_empty=true`;
			const response = await fetch(categoryUrl);
			const data = await response.json();
			setCategories(data);
		} catch (error) {
			console.error("Error fetching categories: ", error);
		}
	};

    useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const apiUrl = `${process.env.REACT_APP_ATL_LIC_BASE_URL}/wp-json/wp/v2/legal_tech_provider`;
				const response = await fetch(apiUrl);
				const data = await response.json();
				
				setProducts(data);
				setFilteredProducts(data); // Initially, no filters are applied.
			} catch (error) {
				console.error("Error fetching data: ", error);
			} finally {
				setLoading(false);
			}
		};
	
		fetchData();
	}, []); // Run on mount

	useEffect(() => {
        // Fetch customers and set the state
        const fetchCustomers = async () => {
            try {
                const customerUrl = `${process.env.REACT_APP_ATL_LIC_BASE_URL}/wp-json/wp/v2/customer_type?post_type=legal_provider&parent=0&hide_empty=true`;
                const response = await fetch(customerUrl);
                const data = await response.json();
                setCustomers(data);
            } catch (error) {
                console.error("Error fetching customers: ", error);
            }
        };

        fetchTopLevelProductCategories();
        fetchCustomers();
    }, []);
	

	const handleCategoryChange = (category) => {
		setSelectedCategory(category);
		if (category) {
			setFilteredProducts(products.filter(product => product.category === category));
		} else {
			setFilteredProducts(products); // Reset to show all products if no category is selected
		}
	};	


    return (
        <div className="app">
            <SidebarFilter
				categories={categories}
				customers={customers}
				selectedCategory={selectedCategory}
				selectedCustomer={selectedCustomer}
				onSelectCategory={setSelectedCategory}
				onSelectCustomer={setSelectedCustomer}
			/>

            <ProductGrid products={filteredProducts} />
        </div>
    );
}

export default App;
