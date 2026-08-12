import {useState,useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router'
import { getQuestionById, createQuestion } from '../../services/questionService'
import { moneyPool, moneyAmount } from '../../utils/moneyLadder'

const answers =['A', 'B', 'C', 'D']

function AdminQuestionForm() {
  const {id} = useParams()
  const navigate = useNavigate()

  const editing = Boolean(id)

  const [form, setForm] = useState ({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    level: 1
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(editing)

  useEffect(() => {
    if (!editing) {
      return
    }
    async function loadQuestion(){
      try{
        const question = await getQuestionById(id) 
        setForm({
          question: question.question,
          options: question.options,
          correctAnswer: question.correctAnswer,
          level: question.level
        })
      } catch(error){
        setError(
          error.response?.data?.message || 'Could not load question.'
        )
      }
      setLoading(false)
    }
    loadQuestion()
  },[id,editing])
  function handleChange(event) {
    const {name, value} = event.target
    setForm({
      ...form,
      [name]: value
    })
  }

  function changeOption(index, value) {
    const options = [...form.options]
    options[index] = value

    setForm({
      ...form,
      options: options
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!form.question.trim()){
      setError('Question text is required')
      return
    }
    for (const option of form.options) {
      if(!option.trim()) {
        setError('All four answers are required')
        return
      }
    }
    const data = {
      question: form.question.trim(),
      options: form.options.map(option => option.trim()),
      correctAnswer: Number(form.correctAnswer),
      level: Number(form.level)
    }
    try {
      if(editing) {
        await updateQuestion(id,data)
      } else {
        await createQuestion(data)
      }
      navigate('/admin/questions')
    } catch(error){
      setError(
        error.response?.data?.message || 'Could not save question.'
      )
    }
  }
  if(loading) {
    return <p className='loading'> Loading...</p>
  }
  return (
    <div>AdminQuestionForm</div>
  )
}

export default AdminQuestionForm