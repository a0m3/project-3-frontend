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
      setGame(data)
    }
    catch(err){
      setError(
        error.response?.data?.message || 'Could not load questions.'
      )
    }
    setLoading(false)

  }

if(game){
  return(
    <section className="page">
      <GamePlay 
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
    <section>
      <header>
        <h1>Regular Game</h1>
        <p>Answer questions and climb the money ladder to win the MILLION!</p>
      </header>

      <article className="card">
        <h3>How it works</h3>

        <ul>
          <li>Questions become harder.</li>
          <li>You have three lifelines.</li>
          <li>A wrong answer ends the game.</li>
          <li>Top prize: {moneyAmount(moneyPool[moneyPool.length - 1])}</li>
        </ul>

        <button className="btn btn-primary" onClick={startGame} disabled={loading}>
          {loading? 'Loading...' : 'Start Game'}
        </button>

        <p><Link to='/dashboard'>← Back</Link></p>
      </article>
    </section>
  )
}

export default RegularGamePage