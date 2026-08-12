import { useAuth } from "../context/AuthContext"
import { Link } from "react-router"



function Dashboard() {
  const { user } = useAuth()
  return (
    <div className="page">
      <div className="page-title">
        <h1>Welcome {user.username}</h1>
        <p>Choose a game mode</p>
      </div>

      <div className="modes">
        <Link className="mode" to="/play/regular">
        <h2>Regular Who wants to be a millionare game</h2>
        <p>Play the classic game</p>
        </Link>

        <Link className="mode" to="/custom-games">
        <h2>Custom Games</h2>
        <p>Create and play your own questions</p>
        </Link>

        <Link className="mode" to="/history">
        <h2>Games History</h2>
        <p>Checkout your previous games status</p>
        </Link>
      </div>

    </div>
  )
}

export default Dashboard