import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CountryContext } from '../countryContext';
import CountryModal from '../pages/CountryModal';

function CountryDetails() {
  const { slug } = useParams();
  const { filteredCountries, darkMode } = useContext(CountryContext);
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const country = filteredCountries.find(c => c.name.common.toLowerCase() === slug.toLowerCase());

  if (!country) {
    return <p className="text-center text-red-500">Country not found!</p>;
  }

function handleBorderClick(border) {
    const borderSlug = typeof border === 'object' ? border : border;
    const borderCountry = filteredCountries.find(c => c.slug === borderSlug);
    
    if (borderCountry) {
      setSelectedCountry(borderCountry);
      setIsModalOpen(true);
    }
  };

  const borderNames = country.borders ? country.borders.map(border => typeof border.slug === 'object' ? border.slug : border.slug) : [];
  

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <header className={`flex justify-between shadow-md items-center py-4 px-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <h1 className={`text-2xl font-bold`}>Where in the world?</h1>
        
      </header>

      <div className="container mx-72 max-w-[1200px] p-6">
        <button 
          onClick={() => navigate('/')} 
          className={`mb-6 ${darkMode ? 'text-blue-400' : 'text-black'} hover:underline`}
        >
          &larr; Back
        </button>
        <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>{country.name.common}</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 flex-shrink-0">
            <img 
              src={country.flags.png} 
              alt={country.flags.alt} 
              className="w-full h-[300px] object-cover shadow-lg rounded-lg" 
            />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center">
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Country Information</h2>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <strong>Population:</strong> {country.population.toLocaleString()}
            </p>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <strong>Region:</strong> {country.region}
            </p>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <strong>Capital:</strong> {country.capital ? country.capital.join(', ') : 'N/A'}
            </p>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <strong>Subregion:</strong> {country.subregion}
            </p>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <strong>Languages:</strong> {Object.values(country.languages).join(', ')}
            </p>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <strong>Currencies:</strong> {Object.values(country.currencies).map(curr => curr.name).join(', ')}
            </p>
          </div>
        </div>
        {borderNames.length > 0 && (
          <div className="mt-8">
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Border Countries</h2>
            <div className="flex flex-wrap gap-4">
              {borderNames.map((border, index) => (
                <span 
                  key={index} 
                  onClick={() => handleBorderClick(border.slug)}
                  className={`inline-block cursor-pointer ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} px-3 py-1 rounded-md shadow`}
                >
                  {border}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      {isModalOpen && 
        <CountryModal 
          country={selectedCountry} 
          onClose={() => setIsModalOpen(false)} 
          darkMode={darkMode} 
        />
      }
    </div>
  );
}

export default CountryDetails;
