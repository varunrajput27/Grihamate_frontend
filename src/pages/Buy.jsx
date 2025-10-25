import React, { useState, useEffect } from "react";
import axios from "axios";
import Propertycard from "../components/Propertycard";
import { X } from "lucide-react";

const Buy = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 

  // 1. Initial/Default Filter State
  const initialFilters = {
    propertyType: "",
    bhk: "",
    furnishing: "",
    minPrice: 2000000,
    maxPrice: 300000000,
  };
  // 'filters' holds the current selections made by the user
  const [filters, setFilters] = useState(initialFilters);

  // 'appliedFilters' holds the filters that were last successfully applied (used for fetching)
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);


  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  // ------------------- API Logic -------------------

  // This function now takes the filters that should be applied (e.g., appliedFilters)
  const fetchProperties = async (currentFilters) => {
    setIsLoading(true);
    try {
      const params = {
        propertyFor: "sale",
      };

      // Construct API parameters based on currentFilters
      if (currentFilters.propertyType) params.propertyType = currentFilters.propertyType;
      if (currentFilters.bhk) params.bhkType = currentFilters.bhk;
      if (currentFilters.furnishing) params.furnishingStatus = currentFilters.furnishing;
      if (currentFilters.minPrice) params.minPrice = currentFilters.minPrice;
      if (currentFilters.maxPrice) params.maxPrice = currentFilters.maxPrice;

      const res = await axios.get(`${VITE_API_BASE_URL}/api/sale/all`, {
        params
      });

      setProperties(Array.isArray(res.data?.properties) ? res.data.properties : []);
      setCurrentPage(1);
      // Update applied filters state only after successful fetch
      setAppliedFilters(currentFilters); 

    } catch (err) {
      console.error("Error fetching properties", err);
      setProperties([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 💡 FIX 1: Initial fetch uses appliedFilters state (which is initialFilters at start)
  useEffect(() => {
    fetchProperties(appliedFilters);
  }, [appliedFilters]); // Re-fetch only when filters are applied/reset

  // ------------------- Filter & Effect Handlers -------------------

  // Universal handler to update the selection/draft filters
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for range input (Price)
  const handleRangeChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      maxPrice: Number(e.target.value),
    }));
  };

  // 💡 FIX 2: Handler for the "Apply Filters" button click
  const handleApplyFilters = () => {
    // Pass the current state of filters to the fetch function
    fetchProperties(filters);
  };
  
  // 💡 FIX 3: Function to clear all filters
  const handleClearFilters = () => {
    // Reset filters (user selection) and applied filters (fetch state)
    setFilters(initialFilters);
    setAppliedFilters(initialFilters); // This triggers the useEffect to fetch all properties
  };

  // ------------------- Pagination Logic -------------------

  const totalPages = Math.ceil(properties.length / propertiesPerPage);
  const indexOfLast = currentPage * propertiesPerPage;
  const indexOfFirst = indexOfLast - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPrevPage = () => handlePageChange(currentPage - 1);
  const goToNextPage = () => handlePageChange(currentPage + 1);
  const goToPage = (page) => handlePageChange(page);

  // ------------------- Render -------------------

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:space-x-8">
        
        {/* Sidebar Filters */}
        <aside className="md:w-1/4 bg-white rounded-lg shadow-md p-6 mb-8 md:mb-0 sticky top-24 self-start">
          <div className="flex justify-between items-center mb-6 border-b pb-2">
            <h2 className="text-xl font-semibold">Find Sale By</h2>
            
            {/* 💡 FIX 4: Clear Filter Button with better icon */}
             <button
              onClick={handleClearFilters}
              className="text-gray-500 hover:text-red-500 cursor-pointer flex items-center"
              title="Clear filters"
            >
              <X size={20} className="mr-1" />
              Clear
            </button>
          </div>

          <div className="mb-5">
            <label className="block mb-1 font-medium">Property Type</label>
            <select
              name="propertyType"
              // Added cursor-pointer
              className="w-full border rounded px-3 py-2 cursor-pointer"
              value={filters.propertyType}
              onChange={handleChange}
            >
              <option value="">All</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block mb-1 font-medium">BHK</label>
            <select
              name="bhk"
              // Added cursor-pointer
              className="w-full border rounded px-3 py-2 cursor-pointer"
              value={filters.bhk}
              onChange={handleChange}
            >
              <option value="">All</option>
              <option value="1BHK">1 BHK</option>
              <option value="2BHK">2 BHK</option>
              <option value="3BHK">3 BHK</option>
              <option value="4BHK">4 BHK</option>
              <option value="5BHK">5 BHK+</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block mb-1 font-medium">Furnishing</label>
            <select
              name="furnishing"
              // Added cursor-pointer
              className="w-full border rounded px-3 py-2 cursor-pointer"
              value={filters.furnishing}
              onChange={handleChange}
            >
              <option value="">All</option>
              <option value="Fully Furnished">Fully Furnished</option>
              <option value="Semi Furnished">Semi Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-medium">Max Price</label>
            <div className="flex justify-between text-sm mb-1 text-gray-600">
              <span>Min: ₹{filters.minPrice.toLocaleString()}</span>
              <span>Max: ₹{filters.maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={2000000}
              max={30000000}
              step={500000}
              value={filters.maxPrice}
              onChange={handleRangeChange}
              // Added cursor-pointer
              className="w-full cursor-pointer" 
            />
          </div>

          {/* Apply Filters Button */}
          <button
            onClick={handleApplyFilters}
            // Added cursor-pointer
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer transition duration-150"
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Apply Filters"}
          </button>
        </aside>

        {/* Property Listings */}
        <main className="md:w-3/4">
          {isLoading ? (
            <p className="text-center text-gray-500 mt-10">Loading properties...</p>
          ) : currentProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProperties.map((property) => (
                <Propertycard 
                    key={property._id} 
                    property={property} 
                    // Assuming Propertycard internally handles click/link with cursor-pointer
                    className="cursor-pointer" 
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">No properties found matching your criteria.</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-3 flex-wrap">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-blue-600 hover:text-white cursor-pointer transition duration-150"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => goToPage(i + 1)}
                  className={`px-4 py-2 border rounded cursor-pointer transition duration-150 ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-blue-600 hover:text-white cursor-pointer transition duration-150"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Buy;