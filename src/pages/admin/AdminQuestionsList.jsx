import {useState,useEffect} from 'react'
import {Link} from 'react-router'
import { getAllQuestions, deleteQuestion } from '../../services/questionService'
import { moneyPool, moneyAmount } from '../../utils/moneyLadder'

function AdminQuestionsList() {
  const [questions, setQuestions] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadQuestions() {
      try {
        const data = await getAllQuestions()
        setQuestions(data)
      } catch (error) {
        setError(
          error.response?.data?.message || 'Could not load questions.'
        )
      }
      setLoading(false)
    }
    loadQuestions()
  }, [])

  async function removeQuestion(id) {
    if (!window.confirm('Delete this question?')) {
      return
    }

    try {
      await deleteQuestion(id)
      setQuestions(questions.filter(question => question._id !== id))
    } catch (error) {
      setError(
        error.response?.data?.message || 'Could not delete question.'
      )
    }
  }

  const levels = new Set(questions.map(question => question.level))

  const missing = moneyPool
    .map((amount, index) => index + 1)
    .filter(level => !levels.has(level))

  return (
    <div className='page'>
      <header className='page-title'>
        <h1> Admin Question List</h1>
      </header>
      {error && <p className='error-box' role='alert'>{error}</p>}

      {missing.length > 0 &&(
        <p className='error-box' role='alert'>
          Missing levels: {missing.join(',')}
        </p>
      )}
      <Link to ='/admin/questions/new' className='button main-button'>
      + Add question
      </Link>

      {loading && <p className='loading'>Loading...</p>}

      {!loading && questions.length === 0 &&(
        <p> No questions yet</p>
      )}
      {!loading && questions.length === 0 && (
        <article className='card'>
          <table className='admin-table'>
            <thead>
              <tr>
                <th>Level</th>
                <th>Prize</th>
                <th>Question</th>
                <th>Correct</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map(question => (
                <tr key={question._id}>
                  <td>{question.level}</td>

                  <td> {moneyAmount(moneyPool[question.level - 1])} </td>

                  <td>{question.question}</td>
                  <td>{['A', 'B', 'C', 'D'][question.correctAnswer]}</td>

                  <td>
                    <div className='button-row'>
                      <Link
                        to={'/admin/questions/' + question._id + '/edit'}
                        className='button small-button second-button'
                      >
                        Edit
                      </Link>

                      <button
                        className='button small-button danger-button'
                        onClick={() => removeQuestion(question._id)}
                      >
                        Delete
                      </button>
                    </div>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      )}
    </div>
  )
}

export default AdminQuestionsList
