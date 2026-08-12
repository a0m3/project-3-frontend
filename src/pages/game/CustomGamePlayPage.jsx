import { use, useState } from "react"
import { useParams, Link } from "react-router"
import GamePlay from "../../components/GamePlay"
import { playGame } from "../../services/customGameService"

function CustomGamePlayPage() {

  const { id } = useParams()
  const [game, setGame] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function startGame() {

    setLoading(true)
    setError("")

    try {
      const data = await playGame(id)
      setGame(data)
    }
    catch (error) {
      setError(error.response?.data?.message || "Could not load this game.")
    }
    setLoading(false)
  }

  if (game) {
    return (
      <div className="page">
        <GamePlay
          questions={game.questions}
          ladder={game.ladder}
          mode="custom"
          gameName={game.name}
          customGameId={game._id}
          onPlayAgain={startGame}
        ></GamePlay>
      </div>
    )
  }
  return (
    <div className="page">
      <div className="page-header">
        <h1>{game?.name || "Custom Game"}</h1>
      </div>

      <div className="card">
        <button className="btn" onClick={startGame} disabled={loading}>
          {loading ? "Loading..." : "Start Game"}
        </button>

        <p>
          <Link to={`/custom-games/${id}`}>← Back to game</Link>
        </p>
      </div>
    </div>
  )
}

export default CustomGamePlayPage