import {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { getGameById, deleteGame } from '../../services/customGameService'


function CustomGameDetails() {
  const {id} = useParams()
  const navigate = useNavigate()

  const [game, setGame] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [showConfirm, setShowConfirm] = useState(false)

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
    <div className='page page-narrow'>
      <header className='page-header'>
        <h1>{game.name}</h1>
        <p>{game.questions.length} questions</p>
      </header>
      {error && <p className='error-banner' role='alert'>{error}</p>}
      {!canStart && (
        <p className="error-banner" role="alert">
            Add at least 3 questions before starting.
        </p>
      )}
      {showConfirm && (
        <div className='card confirm-box'>
          <p>Are you sure you want to delete this custom game? this action cant be undone</p>
          <div className='btn-row'>
            <button className='btn btn-danger' onClick={handleDelete}>
              Yes i am sure
            </button>
            <button className='btn' onClick={() => setShowConfirm(true)}>
              Cancel
            </button>
          </div>
          </div>
      )}
      <div className='btn-row'>
        <button className='btn btn-primary' disabled ={!canStart} onClick={() =>
          navigate(`/custom-games/${id}/play`)
        }
        >Start game
        </button>
        <Link to={`/custom-games/${id}/edit`} className='btn btn-secondary'>Edit</Link>

        <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
      </div>
      <article className='card'>
        <h3>Questions</h3>
        <ul className='question-list'>
          {game.questions.map((question,index) => (
            <li className='question-list-item' key={index}>
              <h4> Question {index +1} : {question.question} </h4>
              <ul className='options-preview'>
                {question.options.map((option, i) => (
                  <li key={i} className={ i === question.correctAnswer ? 'is-correct' : ''}>
                    {['A', 'B', 'C', 'D'][i]}. {option}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </article>
    </div>
  )
}


export default CustomGameDetails