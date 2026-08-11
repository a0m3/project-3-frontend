import {useEffect, useState} from 'react'
import {Link} from 'react-router'
import { getMyCustomGames } from '../../services/customGameService'

function CustomGamesList() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadGames() {
      try {
        const data = await getMyCustomGames()
        setGames(data)
      } catch(error){
        setError(
          error.response?.data?.message ||
          'Could not load games'
        )
      }
      setLoading(false)
    }
    loadGames()
  },[])
  return (
    <div className='page'>
      <header className='page-header'>
        <h1> Custom Games</h1>
        <p> Create your own millionaire game</p>
      </header>

      {error && <p className='error-banner' role='alert'>{error}</p>}

      <Link to='/custom-games/new' className='btn btn-primary'>
        + Add new custom game
      </Link>

      {loading && <p className='page-loading'> Loading...</p>}

      {!loading && games.length === 0 &&(
        <div className='empty-state'> 
          <p>You have no custom games yet.</p>
        </div>
      )}
      <ul className='list-grid'>
        {games.map(game => (
          <li className='card list-row' key={game._id}>
            <div className='list-row-main'>
              <h3>{game.name}</h3>
              <span>
                {game.questionCount} questions
              </span>
            </div>
            <Link to={`/custom-games/${game._id}`} className='btn btn-secondary'>Open</Link>

          </li>
        ))}
      </ul>
    </div>
  )
}

export default CustomGamesList