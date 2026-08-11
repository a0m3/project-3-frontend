import React from 'react'
import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'

function Homepage() {

  const {user} = useAuth()

  return (
    <div className='page'>
      <div>
        <h1>Who Wants To Be A Millionare!</h1>
        <p>Answer questions, climb the money ladder, and try to win $1,000,000.</p>

        {!user ? (
          <div className="btn-row">
            <Link to="/sign-up" className="btn btn-primary">Sign Up Now to Play</Link>
            <Link to="/sign-in" className="btn btn-secondary">Sign In</Link>
          </div>
        ) : (
          <Link to="/dashboard" className="btn btn-primary">Go to Game Modes</Link>
        )}
      </div>
      <div className="mode-grid">
        <div className="mode-card">
          <h2>Regular Millionaire</h2>
          <p>Play the classic game with 15 levels.</p>
        </div>

        <div className="mode-card">
          <h2>Custom Games</h2>
          <p>Create your own questions and play them.</p>
        </div>
      </div>
    </div >
  )
}

export default Homepage