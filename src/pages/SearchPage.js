import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MediaCard from '../components/MediaCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(5); // Set the initial display limit here

  useEffect(() => {
    const fetchData = async () => {
      if (query.trim() === '') {
        setResults([]); // Clear results if the query is empty
        return;
      }

      setLoading(true);

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=72a814220967e9899c058deb9f37ed4a&language=en-US&query=${query}&page=1&include_adult=false`
        );
        setResults(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error searching:', error);
        setResults([]);
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform the search using the useEffect hook
  };

  const handleShowMore = () => {
    setDisplayLimit(displayLimit + 10); // Increase the display limit when "Show More" is clicked
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSearch} className="flex items-center justify-center mb-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies and TV shows"
            className="pl-10 pr-4 py-2 w-full sm:w-96 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
          </div>
        </div>
        <button
          type="submit"
          className="ml-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/* Display results only when query is not empty */}
      {query.trim() !== '' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {loading ? (
            <div className="text-center text-white text-lg">Loading...</div>
          ) : results.length > 0 ? (
            results.slice(0, displayLimit).map((item) => <MediaCard key={item.id} media={item} />)
          ) : (
            <div className="text-center text-white text-opacity-80 text-lg leading-7">
              No results found for <span className="font-semibold">{query}</span>
            </div>
          )}
        </div>
      )}

      {/* Show the "Show More" button only when there are more results to display */}
      {results.length > displayLimit && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleShowMore}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
