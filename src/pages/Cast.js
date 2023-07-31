import React from 'react'
import CastDetail from '../components/CastDetail'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'


const Cast = () => {
  const {  } = useParams();
  return (
    <div className=''>
      <header className="py-4 bg-gray-900  text-white">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-semibold">
          Netflixy
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/watchlist" className="hover:text-gray-300">Watchlist</Link>
            <Link to="/watched" className='hover:text-gray-300'>Watched</Link>
            {/* Add more navigation links if needed */}
          </div>
        </nav>
      </div>
    </header>
        <CastDetail />
    </div>
  )
}

export default Cast