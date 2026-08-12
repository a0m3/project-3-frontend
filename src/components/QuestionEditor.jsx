import {useState} from 'react'

const answers = ['A', 'B', 'C', 'D']

function QuestionEditor({questions, setQuestions}) {
    const newQuestion = {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0
    }

    const [form, setForm] = useState(newQuestion)
    const [editIndex, setEditIndex] = useState(null)
    const [error, setError] = useState('')

    function handleChange(event){
        const {name, value} = event.target
        setForm({
            ...form,
            [name]: value
        })
    }
    function changeOption(index,value) {
        const options = [...form.options]
        options[index] = value

        setForm({
            ...form,
            options: options
        })
    }

    function resetForm(){
        setForm(newQuestion)
        setEditIndex(null)
        setError('')
    }

    function handleSubmit(event){
        event.preventDefault()

        if (!form.question.trim()){
            setError('Question text cannot be empty.')
            return
        }

        for (const option of form.options){
            if (!option.trim()){
                setError('All four answers must be filled')
                return
            }
        }

        const question = {
            question: form.question.trim(),
            options: form.options.map(option => option.trim()),
            correctAnswer: Number(form.correctAnswer)
        }
        if(editIndex === null) {
            setQuestions([...questions,question])
        } else{
            const updated = [...questions]
            updated[editIndex] = question
            setQuestions(updated)
        }
        resetForm()
    }
    function editQuestion (index) {
        const question = questions[index]

        setForm({
            question: question.question,
            options: [...question.options],
            correctAnswer: question.correctAnswer
        })

        setEditIndex(index)
        setError('')
    }
    function deleteQuestion(index) {
        setQuestions(questions.filter(( question, i) => i !== index))
        if (editIndex === index) {
            resetForm()
        }
    }
  return (
    <div>
      {questions.length > 0 && (
        <ul className="question-list">
            {questions.map((question,index) => (
                <li className="question-list-item" key={index}>
                    <h4>
                        question {index + 1}: {question.question}
                    </h4>
                    <ul className='options-preview'>
                        {question.options.map((option, i) =>(
                            <li key={i} className={
                                i === question.correctAnswer
                                 ? 'is-correct' 
                                 : ''
                            }>
                                {answers[i]}. {option}
                                {i === question.correctAnswer && ' ✓'}

                            </li>
                        ))}
                    </ul>
                    <div className='btn-row'>
                        <button type='button' className='btn btn-sm btn-secondary' onClick={() => editQuestion(index)}>
                            Edit
                        </button>
                        <button type='button' className='btn btn-sm btn-danger' onClick={() => deleteQuestion(index)}>
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
      )}
      <article className='card'>
        <header>
            <h2>
                {editIndex === null ? 'Add a question': 'Edit question'}
            </h2>
        </header>
        {error && <p className="Error-banner" role='alert'>{error}</p>}

        <div>
            <div className='form-field'>
                <label htmlFor='question-text'>Question</label>
                <textarea id="question-text"
                rows='2'
                value={form.question}
                onChange={handleChange}
                />
            </div>

            <fieldset>
                <legend>Answer options</legend>
                {form.options.map((option, index)=> (
                    <div className='option-input-row' key={index}>
                        <span className='option-key'>
                            {answers[index]}
                        </span>
                    <label htmlFor={`option-${index}`} className='sr-only'>
                        {'Answer ' + answers[index]}
                    </label>
                    <input id={`option-${index}`}
                    type='text'
                    placeholder={'Answer ' + answers[index]}
                    value={option}
                    onChange={event =>
                        changeOption(index, event.target.value)
                    }
                    />
                    
                    <label>
                    <input type='radio'
                    name='correctAnswer'
                    value={index}
                    checked={
                        Number(form.correctAnswer) === index
                    }
                    onChange={handleChange}
                    />
                    correct
                    </label>
                    </div>
                ))}
            </fieldset>

            <div className='btn-row'>
                <button type='submit' className='btn btn-primary' onClick={handleSubmit}>
                {editIndex === null ? 'Add question' : 'Update question'}
                </button>

                {editIndex !== null &&(
                    <button type='button' className='btn' onClick={resetForm}>
                        cancel
                    </button>
                )}
            </div>
        </div>
      </article>
    </div>
  )
}

export default QuestionEditor
