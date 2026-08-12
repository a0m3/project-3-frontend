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
      <section className='page narrow-page'>
        <p className='error-box' role='alert'>{error}</p>
        <Link to ='/custom-games'>Back</Link>
      </section>
    )
  }
  const canStart = game.questions.length >= 3
  return (
    <div className='page narrow-page'>
      <header className='page-title'>
        <h1>{game.name}</h1>
        <p>{game.questions.length} questions</p>
      </header>
      {error && <p className='error-box' role='alert'>{error}</p>}
      {!canStart && (
        <p className="error-box" role="alert">
            Add at least 3 questions before starting.
        </p>
      )}
      {showConfirm && (
        <div className='card confirm'>
          <p>Are you sure you want to delete this custom game? this action cant be undone</p>
          <div className='button-row'>
            <button className='button danger-button' onClick={handleDelete}>
              Yes i am sure
            </button>
            <button className='button' onClick={() => setShowConfirm(true)}>
              Cancel
            </button>
          </div>
          </div>
      )}
      <div className='button-row'>
        <button className='button main-button' disabled ={!canStart} onClick={() =>
          navigate(`/custom-games/${id}/play`)
        }
        >Start game
        </button>
        <Link to={`/custom-games/${id}/edit`} className='button second-button'>Edit</Link>

        <button className='button danger-button' onClick={handleDelete}>Delete</button>
      </div>
      <article className='card'>
        <h3>Questions</h3>
        <ul className='questions'>
          {game.questions.map((question,index) => (
            <li className='question-item' key={index}>
              <h4> Question {index +1} : {question.question} </h4>
              <ul className='options'>
                {question.options.map((option, i) => (
                  <li key={i} className={ i === question.correctAnswer ? 'correct-option' : ''}>
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