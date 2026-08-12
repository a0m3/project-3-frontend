import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { logout, user, isAdmin } = useAuth()
  return (
    <nav className='navbar'>
      <Link to="/" className="brand">
        Millionare<span>?</span></Link>
      {user
        ?
        (<>
          <Link to="/play/regular">Regular</Link>
          <Link to="/custom-games">Custom Games</Link>
          <Link to="/history">History</Link>

          {isAdmin && (
            <Link to="/admin/questions">Admin</Link>
          )}

          <Link to="/profile" className="username">
            {user.username}
          </Link>

          <button className="button small-button" onClick={logout}>
            Sign Out
          </button>
        </>) :
        (<>
          <Link to='/sign-up'>Sign Up</Link>
          <Link to='/sign-in'>Sign In</Link>
        </>)}
    </nav>
  )
}

export default Navbar