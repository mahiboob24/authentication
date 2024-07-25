import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const SearchAutocomplete = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [recentSearchDetails, setRecentSearchDetails] = useState({});

  // Fetch recent search details when recent searches change
  useEffect(() => {
    if (recentSearches.length > 0) {
      Promise.all(recentSearches.map(name =>
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      ))
        .then(details => {
          const recentDetails = details.reduce((acc, detail) => {
            acc[detail.data.name] = detail.data;
            return acc;
          }, {});
          setRecentSearchDetails(recentDetails);
        })
        .catch(error => {
          console.error('Error fetching recent search details:', error);
        });
    }
  }, [recentSearches]);

  // Fetch search results when query or dropdown state changes
  useEffect(() => {
    if (isDropdownOpen && searchQuery) {
      axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
        .then(response => {
          const results = response.data.results.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          Promise.all(results.map(pokemon => axios.get(pokemon.url)))
            .then(details => {
              setSearchResults(details.map(detail => detail.data));
            });
        })
        .catch(error => {
          console.error('Error fetching Pokémon data:', error);
        });
    } else {
      setSearchResults([]);
    }
  }, [isDropdownOpen, searchQuery]);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      setRecentSearches(prev => [...new Set([searchQuery.toLowerCase(), ...prev])]);
      setSearchQuery('');
    }
  };

  return (
    <div className="search-container">
      <div
        className="search-dropdown"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search Pokémon"
            aria-label="Search"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleMouseEnter}
          />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        {isDropdownOpen && (
          <div className="dropdown-menu px-3 rounded-3 border-0 shadow">
            {recentSearches.length > 0 && (
              <>
                <h6 className="dropdown-header">Recent Searches</h6>
                <div className="row">
                  {recentSearches.map((recent, index) => {
                    const pokemon = recentSearchDetails[recent];
                    return pokemon ? (
                      <div key={index} className="col-sm-6">
                        <div className="d-flex align-items-center py-2 px-1 rounded-3">
                          <img
                            src={pokemon.sprites.front_default}
                            alt={pokemon.name}
                            style={{ width: '50px', height: '50px', marginRight: '10px' }}
                          />
                          <div>
                            <h6>{pokemon.name}</h6>
                            <span>{pokemon.types.map(type => type.type.name).join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
                <hr className="dropdown-divider" />
              </>
            )}
            {searchResults.length > 0 && (
              <>
                <h6 className="dropdown-header">Search Results</h6>
                <div className="row">
                  {searchResults.map((pokemon, index) => (
                    <div key={index} className="col-sm-6">
                      <div className="d-flex align-items-center py-2 px-1 rounded-3">
                        <img
                          src={pokemon.sprites.front_default}
                          alt={pokemon.name}
                          style={{ width: '50px', height: '50px', marginRight: '10px' }}
                        />
                        <div>
                          <h6>{pokemon.name}</h6>
                          <span>{pokemon.types.map(type => type.type.name).join(', ')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAutocomplete;
