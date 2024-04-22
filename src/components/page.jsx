import React, { useState } from 'react';
import Pagination from './Pagination';

const MyComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContinent, setSelectedContinent] = useState('');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const pageCount = 5; // Total number of pages

  // Sample countries data structure
  const countriesByContinent = {
    africa: ['Country1', 'Country2', 'Country3'],
    asia: ['Country4', 'Country5', 'Country6'],
    // Add other continents here...
  };

  // Function to filter countries based on selected continent
  const filteredCountries = selectedContinent ? countriesByContinent[selectedContinent] : [];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-4 flex flex-col md:flex-row justify-between items-center pt-8">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-2xl">View of countries</p>
          <p>Page {currentPage} of {pageCount}</p>
        </div>
        
      </div>
      {/* Pass filtered countries to Pagination component */}
      <Pagination currentPage={currentPage} totalPages={pageCount} onPageChange={handlePageChange} countries={filteredCountries} />
    </div>
  );
};

export default MyComponent;





