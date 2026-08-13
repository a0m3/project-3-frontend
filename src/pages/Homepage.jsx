import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'

function Homepage() {

  const {user} = useAuth()

  return (
    <div className='page'>
      <div className='hero'>
        <h1>Who Wants To Be A Millionare!</h1>
        <p>Answer questions, climb the money ladder, and try to win $1,000,000.</p>

        {!user ? (
          <div className="button-row home-btn">
            <Link to="/sign-up" className="button main-button">Sign Up Now to Play</Link>
            <Link to="/sign-in" className="button second-button">Sign In</Link>
          </div>
        ) : (
          <Link to="/dashboard" className="button main-button">Go to Game Modes</Link>
        )}
      </div>
      <div className="modes">
        <div className="mode">
          <h2>Regular Millionaire</h2>
          <p>Play the classic game with 15 levels.</p>
        </div>

        <div className="mode">
          <h2>Custom Games</h2>
          <p>Create your own questions and play them.</p>
        </div>
      </div>
    </div >
  )
}

export default Homepage