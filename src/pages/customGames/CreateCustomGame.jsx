import {useState} from 'react'
import {Link, useNavigate} from 'react-router'
import QuestionEditor from '../../components/QuestionEditor'
import { createCustomGame } from '../../services/customGameService'

function CreateCustomGame() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [questions, setQuestions] = useState([])
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('Please enter a proper game name.')
      return
    }
    if (questions.length < 3) {
      setError('Add at least 3 questions.')
      return
    }
    try{
      const game = await createCustomGame({
        name: name,
        questions: questions
      })
      navigate(`/custom-games/${game._id}`)
    }catch(error){
      setError(
        error.response?.data?.message ||
        'Could not create game.',
        console.log(error)
      )
    }
  }
  return (
    <div className='page narrow-page'>
      <header className='page-title'>
        <h1>Create Custom Game</h1>
      </header>
      {error && <p className="error-box" role='alert'>{error}</p>}

      <form onSubmit={handleSubmit}>
        <article className='card'>
          <div className="field">
            <label htmlFor='game-name'>Game Name</label>
            <input 
            id='game-name'
            value={name}
            onChange={event =>
              setName(event.target.value)
            }
            placeholder='My game'
            />
          </div>
        </article>
        <QuestionEditor
        questions={questions}
        setQuestions={setQuestions}
        />
        <div className='button-row'>
          <button className='button main-button' type='submit'>Save game</button>
          <Link to='/custom-games' className='button'>Cancel</Link>
        </div>
        <p className={`question-count ${questions.length < 3 ? 'question-count-warning' : ''}`}>
          {questions.length} question{questions.length !== 1 ? 's' : ''} added
        </p>
      </form>
    </div>
  )
}

export default CreateCustomGame