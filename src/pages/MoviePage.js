import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieCard from '../components/movies/MovieCard';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    type: 'popular',
    genre: '',
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // New state variables for search
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const pageSize = 20; // Set the maximum number of movies to show per page

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const { type, genre } = filter;
        let endpoint = '';
        if (type === 'high_rated') {
          endpoint = 'top_rated';
        } else {
          endpoint = 'popular';
        }

        const params = {
          api_key: '72a814220967e9899c058deb9f37ed4a',
          language: 'en-US',
          page: page,
          per_page: pageSize, // Add the pageSize parameter to limit the number of movies per page
        };

        if (genre) {
          params.with_genres = genre;
        }

        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${endpoint}`,
          {
            params: params,
          }
        );

        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/genre/movie/list',
          {
            params: {
              api_key: '72a814220967e9899c058deb9f37ed4a',
              language: 'en-US',
            },
          }
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchMovies();
    fetchGenres();
    handleSearch(); // Fetch search results when the component mounts or when searchQuery changes
  }, [filter, page, searchQuery]);

  const handleFilterChange = (event) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [event.target.name]: event.target.value,
    }));
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/search/movie',
        {
          params: {
            api_key: '72a814220967e9899c058deb9f37ed4a',
            language: 'en-US',
            query: searchQuery,
            page: 1,
            include_adult: false,
          },
        }
      );

      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (

    <>
    <header className="py-4 bg-gray-900  text-white">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center ">
          <Link to="/" className="text-2xl font-semibold tracking-widest uppercase">
          Rayflix
          </Link>
          <div className="space-x-6  ">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/movies" className="hover:text-gray-300">Movies</Link>
            <Link to="/tvshow" className='hover:text-gray-300'>TV Shows</Link>
            <Link to="/watchlist" className="hover:text-gray-300">Watchlist</Link>
            <Link to="/watched" className='hover:text-gray-300'>Watched</Link>
            {/* Add more navigation links if needed */}
          </div>
        </nav>
      </div>
    </header>
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-8">Movies</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center mb-8">
  <div className="mr-4 mb-4 sm:mb-0">
    <label htmlFor="type" className="text-white text-lg font-semibold">
      
    </label>
    <select
      id="type"
      name="type"
      className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 bg-gray-800 text-white text-lg font-semibold"
      value={filter.type}
      onChange={handleFilterChange}
    >
      <option value="popular">Popular</option>
      <option value="high_rated">High Rated</option>
    </select>
  </div>
  <div>
    <label htmlFor="genre" className="text-white text-lg font-semibold mr-2">
      
    </label>
    <select
      id="genre"
      name="genre"
      className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 bg-gray-800 text-white text-lg font-semibold"
      value={filter.genre}
      onChange={handleFilterChange}
    >
      <option value="">All Genres</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  </div>
  <div className="ml-4">
    <label htmlFor="search" className="text-white text-lg font-semibold">
    </label>
    <input
      type="text"
      id="search"
      name="search"
      className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 bg-gray-800 text-white text-lg font-semibold"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
      }}
      placeholder="Search for movies..."
    />
  </div>
</div>

        {loading ? (
          <div className="text-white text-center py-8">Loading movies...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 max-w-6xl mx-auto">
            {searchQuery.trim() !== '' && searchResults.length > 0 ? (
              // Display search results if available
              searchResults.map((movie) => (
                <Link key={movie.id} to={`/movies/${movie.id}`}>
                  <MovieCard movie={movie} />
                </Link>
              ))
            ) : (
              // Otherwise, display the regular movie grid
              movies.slice(0, pageSize).map((movie) => (
                <Link key={movie.id} to={`/movies/${movie.id}`}>
                  <MovieCard movie={movie} />
                </Link>
              ))
            )}
          </div>
        )}
                <div className="flex items-center justify-center mt-4">
  <button
    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l ${
      page === 1 ? 'opacity-50 cursor-not-allowed' : ''
    }`}
    onClick={handlePrevPage}
    disabled={page === 1}
  >
    Previous
  </button>
  <span className="mx-4 text-white font-bold">
    Page {page} of {totalPages}
  </span>
  <button
    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r ${
      page === totalPages ? 'opacity-50 cursor-not-allowed' : ''
    }`}
    onClick={handleNextPage}
    disabled={page === totalPages}
  >
    Next
  </button>
</div>

      </div>
    </div></>
  );
};

export default MoviesPage;

