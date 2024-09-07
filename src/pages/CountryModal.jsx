import React from 'react';
import { useNavigate } from 'react-router-dom';

function CountryModal({ country, onClose, darkMode }) {
  const navigate = useNavigate();

  if (!country) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`bg-white ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg max-w-lg w-full relative`}>
        <button 
          onClick={onClose} 
          className={`absolute top-4 right-4 ${darkMode ? 'text-white' : 'text-gray-900'} text-2xl`}
        >
          &times;
        </button>
        <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>{country.name.common}</h2>
        <img 
          src={country.flags.png} 
          alt={country.flags.alt} 
          className="w-full h-[200px] object-cover rounded-lg mb-4"
        />
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
        <button 
          onClick={() => navigate(`/country/${country.name.slug}`)} 
          className={`mt-4 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 ${darkMode ? 'bg-blue-700' : 'bg-blue-500'}`}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default CountryModal;
