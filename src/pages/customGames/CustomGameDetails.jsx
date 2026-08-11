import {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { getGameById, deleteGame } from '../../services/customGameService'


function CustomGameDetails() {
  const {id} = useParams()
  const navigate = useNavigate()

  const [game, setGame] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadGame() {
      try{
        const data = await getGameById(id)
        setGame(data)
      } catch(error){
        setError(
          error.response?.data?.message || 'Could not load game'
        )
      }
      setLoading(false)
    }
    loadGame()
  },[id])

  async function handleDelete() {
    const answer = window.confirm(
      'Delete this custom game?'
    )
    if (!answer) {
      return
    }
    try{
      await deleteGame(id)
      navigate('/custom-games')
    } catch(error){
      setError(
          error.response?.data?.message || 'Could not delete game'
      )
    }
  }
  if(loading) {
    return <p className='page-loading'>Loading...</p>
  }
  if(!game) {
    return(
      <section className='page page-narrow'>
        <p className='error-banner' role='alert'>{error}</p>
        <Link to ='/custom-games'>Back</Link>
      </section>
    )
  }
  const canStart = game.questions.length >= 3
  return (
    <div>CustomGameDetails</div>
  )
}


export default CustomGameDetails