import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import PropertyCard from "./Propertycard";

const Properties = ({ filters }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/rentandsale`
        );

        if (res.data.properties) {
          const mapped = res.data.properties.map((p) => ({
            ...p,
            type: p.type || (p.basicDetails?.price ? "sale" : "rent"),
          }));
          setProperties(mapped);
        } else {
          setProperties([]);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Reset page to 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Filter properties based on filters
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Property Type filter
      if (filters.propertyType && property.propertyType !== filters.propertyType) {
        return false;
      }

      // Location filter (compare city)
      // if (filters.location && property.location?.city !== filters.location) {
      //   return false;
      // }
      if (filters.city) {
  if (!property.location || property.location.city.toLowerCase() !== filters.city.toLowerCase()) {
    return false;
  }
}

      // Rent/Buy filter
      if (
        filters.rentBuy &&
        property.type?.toLowerCase() !== filters.rentBuy.toLowerCase()
      ) {
        return false;
      }

      // Bedrooms filter
      if (filters.bedrooms) {
        const bhkType = property.basicDetails?.bhkType;
        if (!bhkType || bhkType.toLowerCase() !== filters.bedrooms.toLowerCase())
          return false;
      }

      return true;
    });
  }, [properties, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  // Pagination handlers
  const goToPage = (pageNumber) => setCurrentPage(pageNumber);
  const goToNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const goToPrevPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  if (loading)
    return (
      <div className="py-10 px-4 text-center text-gray-600">Loading...</div>
    );
  if (error)
    return (
      <div className="py-10 px-4 text-center text-red-500">{error}</div>
    );

  return (
    <div className="py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Featured Properties</h2>
      <p className="text-gray-500 text-center mb-10">
        Discover the best properties handpicked for you
      </p>

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProperties.length > 0 ? (
          currentProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No properties found
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded ${
              currentPage === 1
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "text-blue-600 border-blue-600 hover:bg-blue-100"
            }`}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`px-3 py-1 border rounded ${
                  currentPage === pageNum
                    ? "bg-blue-600 text-white border-blue-600"
                    : "text-blue-600 border-blue-600 hover:bg-blue-100"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "text-blue-600 border-blue-600 hover:bg-blue-100"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Properties;


