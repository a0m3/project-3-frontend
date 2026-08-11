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
        'Could not create game.'
      )
    }
  }
  return (
    <div></div>
  )
}

export default CreateCustomGame