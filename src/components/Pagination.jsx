import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [pageInput, setPageInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [countryData, setCountryData] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const countriesPerPage = 50;

  useEffect(() => {
    fetch('https://restcountries.com/v3/all')
      .then(response => response.json())
      .then(data => {
        setCountryData(data);
        setFilteredCountries(data);
      });
  }, []);

  useEffect(() => {
    const filtered = countryData.filter(country =>
      country.name.common.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchInput, countryData]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleInputChange = (e) => {
    setPageInput(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      const pageNumber = parseInt(pageInput);
      if (!isNaN(pageNumber)) {
        handlePageChange(pageNumber);
      }
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 px-3 py-1 rounded ${
            i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const currentCountries = filteredCountries.slice((currentPage - 1) * countriesPerPage, currentPage * countriesPerPage);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      <div className="flex justify-center items-center mb-16">
        <input
          type="text"
          placeholder="Search by country name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="px-40 py-2 bg-black border text-white border-gray-300 rounded-md mr-2"
        />
       
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {currentCountries.map(country => (
          <div className="flex flex-col items-center" key={country.name.common}>
            <img src={`https://flagcdn.com/${country.cca2.toLowerCase()}.svg`} alt={country.name.common} className="w-[250px] h-[120px]" />
            <strong>{country.name.common}</strong>
            <p><strong>Capital</strong>: {country.capital}</p>
            <p><strong>Population</strong>: {country.population}</p>
            <p><strong>Region</strong>: {country.region}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center pt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 mr-2"
        >
          <FaChevronLeft className="mr-1" />
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 ml-2"
        >
          <FaChevronRight className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;



