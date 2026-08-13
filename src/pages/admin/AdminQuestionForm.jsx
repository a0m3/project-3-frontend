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
    <div className='page narrow-page'>
      <header className='page-title'>
      <h1> {editing ? 'Edit question' : 'Add a question'}</h1>
      </header>
      {error && <p className='error-box' role='alert'>{error}</p>}

      <form onSubmit={handleSubmit}>
        <article className='card'>
          <div className='field'>
            <label htmlFor='question-text'>Question</label>
            <textarea
              id='question-text'
              name='question'
              rows='3'
              value={form.question}
              onChange={handleChange}
            />
          </div>

          <fieldset>
            <legend className='legend-field'>Answer options</legend>
            {form.options.map((option, index) => (
              <div className='option-row' key={index}>
                <span className='option-letter'>
                  {answers[index]}
                </span>

                <label htmlFor={`option-${index}`} className='screen-reader'>
                  {'Answer ' + answers[index]}
                </label>
                <input
                 id={`option-${index}`}
                type='text'
                value={option}
                onChange={event => changeOption(index, event.target.value)}
                />

                <label>
                  <input
                    type='radio'
                    name='correctAnswer'
                    value={index}
                    checked={Number(form.correctAnswer) === index}
                    onChange={handleChange}
                  />
                  correct
                </label>
              </div>
            ))}
          </fieldset>

          <div className='field'>
            <label htmlFor='question-level'>Difficulty Level</label>

            <select
              id='question-level'
              name='level'
              value={form.level}
              onChange={handleChange}
            >
              {moneyPool.map((amount, index) => (
                <option value={index + 1} key={index}>
                  Level {index + 1} - {moneyAmount(amount)}
                </option>
              ))}
            </select>
          </div>

          <div className='button-row'>
            <button className='button main-button' type='submit'>
              {editing ? 'Update Question' : 'Create Question'}
            </button>

            <Link to='/admin/questions' className='button'>
              Cancel
            </Link>
          </div>
        </article>
      </form>
    </div>
  )
}

export default AdminQuestionForm