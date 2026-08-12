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
    <div>RegularGamePage</div>
  )
}

export default RegularGamePage