import React, { useState, useEffect } from 'react';
import dataService from '../services/dataService';
import { Filter, X, AlertCircle, Search } from 'lucide-react';
import './Transactions.css';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [locations, setLocations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    country: 'all',
    cities: [],
    fromDate: '',
    toDate: ''
  });

  const [appliedFilters, setAppliedFilters] = useState({
    country: 'all',
    cities: [],
    fromDate: '',
    toDate: ''
  });

  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [citySearch, setCitySearch] = useState('');

  useEffect(() => {
    fetchLocations();
    fetchTransactions();
  }, []);

  // Close city dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cityDropdownOpen && !event.target.closest('.city-checklist-dropdown')) {
        setCityDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [cityDropdownOpen]);

  const fetchLocations = async () => {
    try {
      const response = await dataService.getLocations();
      if (response.success) {
        setLocations(response.data);
      }
    } catch (err) {
      console.error('Error fetching locations:', err);
    }
  };

  const fetchTransactions = async (filterParams = {}) => {
    try {
      setLoading(true);
      
      // Get all transactions with filters
      const response = await dataService.getTransactions(filterParams);
      
      if (response.success) {
        setTransactions(response.data.transactions);
      }
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => {
      const updated = { ...prev, [name]: value };
      
      // Reset cities when country changes
      if (name === 'country') {
        updated.cities = [];
      }
      
      return updated;
    });
  };

  const handleCityToggle = (city) => {
    setFilters(prev => ({
      ...prev,
      cities: prev.cities.includes(city)
        ? prev.cities.filter(c => c !== city)
        : [...prev.cities, city]
    }));
  };

  const handleRemoveCity = (city) => {
    setFilters(prev => ({
      ...prev,
      cities: prev.cities.filter(c => c !== city)
    }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    fetchTransactions(filters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      country: 'all',
      cities: [],
      fromDate: '',
      toDate: ''
    };
    setFilters(clearedFilters);
    setAppliedFilters(clearedFilters);
    fetchTransactions(clearedFilters);
    setCityDropdownOpen(false);
    setCitySearch('');
  };

  const hasActiveFilters = () => {
    return (
      appliedFilters.country !== 'all' ||
      appliedFilters.cities.length > 0 ||
      appliedFilters.fromDate ||
      appliedFilters.toDate
    );
  };

  // Get cities based on selected country
  const getAvailableCities = () => {
    if (filters.country === 'all' || !locations[filters.country]) {
      return [];
    }
    return locations[filters.country] || [];
  };

  // Filter cities based on search
  const getFilteredCities = () => {
    const cities = getAvailableCities();
    if (!citySearch) return cities;
    return cities.filter(city => 
      city.toLowerCase().includes(citySearch.toLowerCase())
    );
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      completed: 'badge-success',
      pending: 'badge-warning',
      failed: 'badge-danger'
    };
    return `badge ${statusClasses[status] || 'badge-info'}`;
  };

  if (loading && transactions.length === 0) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading transactions...</p>
      </div>
    );
  }

  return (
    <div className="transactions">
      <div className="transactions-header">
        <div>
          <h1>Transactions</h1>
          <p>View and filter your transaction history</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-card card">
        <div className="filters-header">
          {/* <div className="filters-title"> */}
            {/* <Filter size={20} /> */}
            {/* <h3>Filters</h3> */}
          {/* </div> */}
          {hasActiveFilters() && (
            <span className="active-filters-badge">
              {Object.values(appliedFilters).filter(v => v && v !== 'all').length} active
            </span>
          )}
        </div>

        <div className="filters-grid">
          {/* Country Filter - Single Select */}
          <div className="filter-group">
            <label htmlFor="country">Select Country</label>
            <select
              id="country"
              value={filters.country}
              onChange={(e) => handleFilterChange('country', e.target.value)}
            >
              <option value="all">All Countries</option>
              {Object.keys(locations).map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          {/* City Filter - Checklist with Search */}
          <div className="filter-group">
            <label>Select Cities</label>
            <div className="city-checklist-dropdown">
              <button
                type="button"
                className="checklist-button"
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                disabled={filters.country === 'all'}
              >
                {filters.cities.length === 0 
                  ? 'Select Cities' 
                  : `${filters.cities.length} selected`}
                <span className="dropdown-arrow">{cityDropdownOpen ? '▲' : '▼'}</span>
              </button>
              
              {/* Selected Cities Tags */}
              {filters.cities.length > 0 && (
                <div className="selected-tags">
                  {filters.cities.map(city => (
                    <span key={city} className="tag">
                      {city}
                      <button
                        type="button"
                        className="tag-remove"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveCity(city);
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {cityDropdownOpen && filters.country !== 'all' && (
                <div className="checklist-options">
                  {/* Search Box */}
                  <div className="checklist-search">
                    <input
                      type="text"
                      placeholder="Search cities..."
                      value={citySearch}
                      onChange={(e) => setCitySearch(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  
                  {/* City Checkboxes */}
                  <div className="checklist-items-scroll">
                    {getFilteredCities().length === 0 ? (
                      <div className="no-results">No cities found</div>
                    ) : (
                      getFilteredCities().map(city => (
                        <label key={city} className="checklist-item">
                          <input
                            type="checkbox"
                            checked={filters.cities.includes(city)}
                            onChange={() => handleCityToggle(city)}
                          />
                          <span>{city}</span>
                        </label>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            {filters.country === 'all' ? (
              <small className="filter-hint">Select a country first</small>
            ) : (
              <small className="filter-hint">Click to select multiple cities</small>
            )}
          </div>

          {/* From Date */}
          <div className="filter-group">
            <label htmlFor="fromDate">From Date</label>
            <input
              type="date"
              id="fromDate"
              value={filters.fromDate}
              onChange={(e) => handleFilterChange('fromDate', e.target.value)}
            />
          </div>

          {/* To Date */}
          <div className="filter-group">
            <label htmlFor="toDate">To Date</label>
            <input
              type="date"
              id="toDate"
              value={filters.toDate}
              onChange={(e) => handleFilterChange('toDate', e.target.value)}
            />
          </div>
        </div>

        <div className="filters-actions">
          <button 
            className="btn btn-primary btn-sm"
            onClick={handleApplyFilters}
          >
            <Search size={16} />
            Apply
          </button>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={handleClearFilters}
            disabled={!hasActiveFilters()}
          >
            <X size={16} />
            Clear
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-error">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Transactions Table */}
      <div className="transactions-table-card card">
        <div className="table-header">
          <h3>Transactions List</h3>
          <span className="table-count">{transactions.length} transactions</span>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="no-data">
            <p>No transactions found</p>
            {hasActiveFilters() && (
              <button className="btn btn-secondary" onClick={handleClearFilters}>
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="table-container">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Date</th>
                  <th>Country</th>
                  <th>City</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>
                      <span className="transaction-id">{transaction.id}</span>
                    </td>
                    <td>{transaction.date}</td>
                    <td>
                      <div className="location-cell">
                        <span className="country-flag">🌍</span>
                        {transaction.country}
                      </div>
                    </td>
                    <td>{transaction.city}</td>
                    <td>
                      <span className={`amount ${transaction.type}`}>
                        {transaction.type === 'credit' ? '+' : '-'}
                        ${parseFloat(transaction.amount).toFixed(2)}
                      </span>
                    </td>
                    <td>
                      <span className={getStatusBadge(transaction.status)}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;

