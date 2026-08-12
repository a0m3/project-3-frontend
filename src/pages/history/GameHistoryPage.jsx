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
    <div>GameHistoryPage</div>
  )
}

export default GameHistoryPage