import {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router'
import QuestionEditor from '../../components/QuestionEditor'
import { getGameById, updateCustomGame } from '../../services/customGameService'

function EditCustomGame() {
  const {id} = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  useEffect(() => {
    async function loadGame() {
      try{
        const game = await getGameById(id)
        setName(game.name)
        setQuestions(game.questions)
      } catch(error) {
        setError(
          error.response?.data?.message || 'Could not load game'
        )
      }
      setLoading(false)
    }
    loadGame()
  }, [id])

  async function handleSubmit(event) {
    event.preventDefault()

    if (!name.trim()) {
      setError('Please enter a game name')
      return
    }
    try{
      await updateCustomGame(id, {
        name: name,
        questions: questions
      })
      navigate(`/custom-games/${id}`)
    } catch (error) {
      setError (
          error.response?.data?.message || 'Could not save game'
      )
    }
  }
  
  if(loading) {
    return <p className='page-loading'> Loading...</p>
  }

  return (
    <div className='page page-narrow'>
      <header className='page-header'>
        <h1> Edit Custom games</h1>
      </header>
      {error && <p className='error-banner' role='alert'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <article className='card'>
          <div className='form-field'>
            <label htmlFor='game-name'>Game name</label>
            <input id='game-name' value={name} onChange={event => setName(event.target.value)}/>
          </div>
        </article>
        <QuestionEditor questions={questions} setQuestions={setQuestions}/>
        <div className='btn-row'>
          <button className='btn btn-primary' type='submit'>Save changes</button>
          <Link to={`/custom-games/${id}`} className='btn'>Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default EditCustomGame