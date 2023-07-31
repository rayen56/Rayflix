import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Watchlist from './Watchlist';
import Watched from './Watched';
import useLocalStorage from './useLocalStorage';
import Home from './pages/Home';
import MovieDetailPage from './pages/MovieDetailPage';
import TvDetailPage from './pages/TvDetailPage'
import Cast from './pages/Cast';
import MoviePage from './pages/MoviePage';
import TvshowPage from './pages/TVShowsPage';
function App() {
  const [watchlist, setWatchlist] = useLocalStorage('watchlist', []);
  const [watchedList, setWatchedList] = useLocalStorage('watchedList', []);

  const addToWatchlist = (movie) => {
    const movieExists = watchlist.some((item) => item.id === movie.id);

    if (movieExists) {
      // Movie is already in the watchlist, remove it
      setWatchlist((prevWatchlist) => prevWatchlist.filter((item) => item.id !== movie.id));
    } else {
      // Movie is not in the watchlist, add it
      setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
    }
  };

  const addToWatched = (movie) => {
    const movieExists = watchedList.some((item) => item.id === movie.id);

    if (movieExists) {
      // Movie is already in the watched list, remove it
      setWatchedList((prevWatchedList) => prevWatchedList.filter((item) => item.id !== movie.id));
    } else {
      // Movie is not in the watched list, add it
      setWatchedList((prevWatchedList) => [...prevWatchedList, movie]);
    }
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist((prevWatchlist) => prevWatchlist.filter((item) => item.id !== movieId));
  };

  const removeFromWatched = (movieId) => {
    setWatchedList((prevWatchedList) => prevWatchedList.filter((item) => item.id !== movieId));
  };

  const clearWatchlist = () => {
    setWatchlist([]);
  };

  const clearWatched = () => {
    setWatchedList([]);
  };


  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cast/:castId" element={<Cast />} />
          <Route exact path="/movies" element={<MoviePage />} />
          <Route exact path="/tvshow" element={<TvshowPage />} />
          <Route
            path="/movie/:id"
            element={
              <MovieDetailPage
                addToWatchlist={addToWatchlist}
                watchlist={watchlist}
                watchedList={watchedList}
                addToWatched={addToWatched}
                removeFromWatchlist={removeFromWatchlist}
                removeFromWatched={removeFromWatched}
              />
            }
          />
          <Route path='/tv/:id' element={<TvDetailPage
            addToWatchlist={addToWatchlist}
            watchlist={watchlist}
            watchedList={watchedList}
            addToWatched={addToWatched}
            removeFromWatchlist={removeFromWatchlist}
            removeFromWatched={removeFromWatched} />} />
          <Route
            path="/watchlist"
            element={
              <Watchlist
                watchlist={watchlist}
                removeFromWatchlist={removeFromWatchlist}
                clearWatchlist={clearWatchlist}
              />
            }
          />
          <Route
            path="/watched"
            element={
              <Watched
                watchedList={watchedList}
                removeFromWatched={removeFromWatched}
                clearWatched={clearWatched}
              />
            }
          />
        </Routes>
    </Router>
  );
}

export default App;
