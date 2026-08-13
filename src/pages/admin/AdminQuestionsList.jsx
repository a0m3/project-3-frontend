import {useState,useEffect} from 'react'
import {link} from 'react-router'
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
    <div>AdminQuestionsList</div>
  )
}

export default AdminQuestionsList
