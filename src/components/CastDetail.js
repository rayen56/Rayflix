import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RelatedMovies from './RelatedMovies';
import RelatedTv from './RelatedTv';
const CastDetail = () => {
  const { castId } = useParams();
  const [cast, setCast] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCastDetail = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${castId}?api_key=72a814220967e9899c058deb9f37ed4a&language=en-US`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch cast details');
        }
        const data = await response.json();
        setCast(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchCastDetail();
  }, [castId]);

  if (loading) {
    return <div className="text-white py-16 px-8 min-h-screen">Loading cast details...</div>;
  }

  return (
    <div className="bg-gray-900 text-white py-16 px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <img
            src={`https://image.tmdb.org/t/p/w300${cast.profile_path}`}
            alt={cast.name}
            className="w-48 h-48 object-cover rounded-full"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">{cast.name}</h1>
        <p className="text-gray-300 text-xl mb-4">{cast.biography}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500 text-sm">Known For</p>
            <p className="text-xl mb-2">{cast.known_for_department}</p>
            <p className="text-gray-500 text-sm">Birthday</p>
            <p className="text-xl mb-2">{cast.birthday}</p>
            <p className="text-gray-500 text-sm">Place of Birth</p>
            <p className="text-xl mb-2">{cast.place_of_birth}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Popularity</p>
            <p className="text-xl mb-2">{cast.popularity.toFixed(1)}</p>
            <p className="text-gray-500 text-sm">Gender</p>
            <p className="text-xl mb-2">{cast.gender === 1 ? 'Female' : 'Male'}</p>
            <p className="text-gray-500 text-sm">Homepage</p>
            {cast.homepage ? (
              <a
                href={cast.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-xl"
              >
                {cast.homepage}
              </a>
            ) : (
              <p className="text-xl">N/A</p>
            )}
          </div>
        </div>
        <RelatedMovies castId={castId} />
        <RelatedTv castId={castId} />
      </div>
    </div>
  );
};

export default CastDetail;
