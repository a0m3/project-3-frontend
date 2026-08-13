import { useState } from "react"
import { Link } from "react-router"
import GamePlay from "../../components/GamePlay"
import { getGameQuestions } from "../../services/questionService"
import { moneyPool, moneyAmount } from "../../utils/moneyLadder"


function RegularGamePage() {

  const [game, setGame] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(null)

  async function startGame() {
    setLoading(true)
    setError('')

    try{
      const data = await getGameQuestions()
      setGame({...data, startedAt: Date.now() })
    }
    catch(error){
      setError(
        error.response?.data?.message || 'Could not load questions.'
      )
    }
    setLoading(false)

  }

if(game){
  return(
    <section className="page">
      <GamePlay key={game.startedAt}
      questions={game.questions}
      ladder={game.ladder||moneyPool}
      mode='regular'
      gameName='Regular Millionare'
      onPlayAgain={startGame}
      ></GamePlay>
    </section>
  )
}


  return (
    <section className="page">
      <header className="page-title">
        <h1>Regular Game</h1>
        <p>Answer questions and climb the money ladder to win the MILLION!</p>
      </header>

      <article className="card text-center">
        <h3>How it works</h3>

        <ul>
          <li>Questions become harder.</li>
          <li>You have three lifelines.</li>
          <li>A wrong answer ends the game.</li>
          <li>Top prize: {moneyAmount(moneyPool[moneyPool.length - 1])}</li>
        </ul>
        <div className="button-row">
        <button className="button main-button" onClick={startGame} disabled={loading}>
          {loading? 'Loading...' : 'Start Game'}
        </button>

        <p><Link to='/dashboard'>← Back</Link></p>
        </div>
      </article> 
    </section>
  )
}

export default RegularGamePage