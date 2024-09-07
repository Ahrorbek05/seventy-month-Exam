import React, { useContext, useState, useMemo, useCallback } from 'react';
import { CountryContext } from '../countryContext';
import { Link } from 'react-router-dom';

function CountryHome() {
    const { filteredCountries, region, filterByRegion, status, darkMode, toggleDarkMode } = useContext(CountryContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const countriesPage = 12;

    const filteredResults = useMemo(() => {
        return filteredCountries.filter((country) =>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [filteredCountries, searchTerm]);

    const indexOfCountry = currentPage * countriesPage;
    const indexOfFirstCountry = indexOfCountry - countriesPage;
    const currentCountries = useMemo(() => filteredResults.slice(indexOfFirstCountry, indexOfCountry), [filteredResults, indexOfFirstCountry, indexOfCountry]);

    const totalPages = useMemo(() => Math.ceil(filteredResults.length / countriesPage), [filteredResults.length]);

    const handleRegionChange = useCallback((e) => {
        filterByRegion(e.target.value);
        setCurrentPage(1);
    }, [filterByRegion]);

    const handleSearchChange = useCallback((e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    }, []);

    return (
        <div className={`app ${darkMode ? 'dark' : ''}`}>
            <header className="app-header flex justify-between shadow-md items-center py-4 px-24 bg-white dark:bg-gray-800">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Where in the world?</h1>
                <button
                    onClick={toggleDarkMode}
                    className="ml-4 p-2 border rounded-lg shadow-sm dark:bg-gray-700 dark:text-white">
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </header>

            <div className="search-region-container mx-24 mb-8 mt-8 flex flex-col gap-4 sm:flex-row justify-between items-center">
                <input
                    className="p-4 border-2 w-full sm:w-[460px] rounded-md outline-none shadow-md dark:bg-gray-700 dark:text-white"
                    type="search"
                    placeholder='Search...'
                    onChange={handleSearchChange}
                />
                <select
                    onChange={handleRegionChange}
                    value={region}
                    className="select select-bordered w-full sm:w-48 max-w-xs dark:bg-gray-700 dark:text-white"
                >
                    <option value="All">All Regions</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>

            <main className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
                {status === 'loading' ? (
                    <p className="text-center text-gray-900 dark:text-white"><span className="loading loading-ring loading-lg"></span></p>
                ) : status === 'failed' ? (
                    <p className="text-center text-red-500 dark:text-red-400">Failed to load countries.</p>
                ) : (
                    <>
                        <div className="grid px-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {currentCountries.map((country) => (
                                <Link to={`/country/${country.name.common}`} key={country.name.common}>
                                    <div className="card bg-white w-[310px] dark:bg-gray-800 cursor-pointer shadow-xl transition transform hover:scale-105 duration-300">
                                        <figure>
                                            <img src={country.flags.png} alt={country.flags.alt} className="w-full h-48 object-cover" />
                                        </figure>
                                        <div className="card-body">
                                            <h2 className="card-title text-lg font-bold text-gray-900 dark:text-white">{country.name.common}</h2>
                                            <p className="text-gray-700 dark:text-gray-300 text-sm"><strong>Population:</strong> {country.population.toLocaleString()}</p>
                                            <p className="text-gray-700 dark:text-gray-300 text-sm"><strong>Region:</strong> {country.region}</p>
                                            <p className="text-gray-700 dark:text-gray-300 text-sm"><strong>Capital:</strong> {country.capital ? country.capital.join(', ') : 'N/A'}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="flex justify-center gap-4 items-center mt-6">
                            <button 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                                className="btn btn-outline" 
                                disabled={currentPage === 1}
                            >
                                Previous page
                            </button>
                            <button 
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                                className="btn btn-outline" 
                                disabled={currentPage === totalPages}
                            >
                                Next page
                            </button>
                            <p className="text-gray-900 dark:text-white ml-4">{`Page ${currentPage} of ${totalPages}`}</p>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

export default CountryHome;
