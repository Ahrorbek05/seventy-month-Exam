import React, { createContext, useState, useEffect } from 'react';
import axios from './axios';

export const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [region, setRegion] = useState('All');
  const [status, setStatus] = useState('idle');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      setStatus('loading');
      try {
        const response = await axios.get('/countries');
        setCountries(response.data.data);
        setFilteredCountries(response.data.data);
        setStatus('success');
      } catch (error) {
        setStatus('failed');
      }
    };
    fetchCountries();
  }, []);

  const filterByRegion = (region) => {
    setRegion(region);
    if (region === 'All') {
      setFilteredCountries(countries);
    } else {
      setFilteredCountries(countries.filter(country => country.region === region));
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <CountryContext.Provider value={{ filteredCountries, region, filterByRegion, status, darkMode, toggleDarkMode }}>
      {children}
    </CountryContext.Provider>
  );
};
