import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, filterByRegion } from './redux/countrySlice';
import './App.css';
import { Select } from 'daisyui';

function App() {
  const dispatch = useDispatch();
  const { filteredCountries, region, status } = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

function handleRegionChange(e) {
    dispatch(filterByRegion(e.target.value));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Where in the world?</h1>
        <Select onChange={handleRegionChange} value={region}>
          <option value="All">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </Select>
      </header>

      <main>
        {status === 'loading' ? (
          <p>Loading countries...</p>
        ) : status === 'failed' ? (
          <p>Failed to load countries.</p>
        ) : (
          <div className="countries-grid">
            {filteredCountries.map((country) => (
              <div key={country.name} className="country-card">
                <img src={country.flag} alt={country.name} />
                <div className="country-info">
                  <h2>{country.name}</h2>
                  <p>Population: {country.population}</p>
                  <p>Region: {country.region}</p>
                  <p>Capital: {country.capital}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
