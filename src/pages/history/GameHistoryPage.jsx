import { useEffect, useState } from "react"
import { getMyHistory } from "../../services/historyService"
import { moneyAmount } from "../../utils/moneyLadder"



function GameHistoryPage() {

  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await getMyHistory()
        setHistory(data)
      }
      catch (error) {
        setError(
          error.response?.data?.message ||
          "Could not load history."
        )
      }
      setLoading(false)
    }
    loadHistory()

  }, [])
  return (
    <div className="page">
      <div className="page-title">
        <h1>Game History</h1>
      </div>

      {loading && (<p className="loading">Loading...</p>)}

      {!loading && history.length === 0 && (
        <div>
          <p>You have not played any games yet.</p>
        </div>
      )}

      <div className="list">
        {history.map(game => (
          <div className="card row" key={game._id}>
            <div className="row-main">
              <h3>{game.gameName}</h3>

              <span>
                {game.correctCount}/{game.totalQuestions} correct
              </span>
              <br />
              <span>{new Date(game.playedAt).toLocaleDateString()}</span>
            </div>

            <div>
              <div>
                {moneyAmount(game.moneyWon)}
              </div>
              <span>{game.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GameHistoryPage