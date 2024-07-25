// src/components/Home.js
import React from 'react';
import SearchAutocomplete from './SearchAutocomplete';

const Home = () => {
  const handleSelect = (value) => {
    console.log('Selected:', value);
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Welcome to Our Application</h3>
              <p className="text-center">
                This is the home page of our application.
              </p>
              <SearchAutocomplete
                placeholder="Search..."
                searchEndpoint="https://jsonplaceholder.typicode.com/todos"
                onSelect={handleSelect}
                debounceTime={500} // Optional, customize debounce time
                minQueryLength={3} // Optional, customize minimum query length
              />
            
              <div className="text-center mt-4">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
