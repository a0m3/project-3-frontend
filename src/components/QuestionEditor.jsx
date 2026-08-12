import {useState} from 'react'

const answers = ['A', 'B', 'C', 'D']

function QuestionEditor({questions, setQuestions}) {
    function nextLevel(list){
        const usedLevel = list.map(oneQuestion => oneQuestion.level)
        for (let level = 1; level <= 15; level++){
            if(!usedLevel.includes(level)) {
                return level
            }
        }
        return 1
    } 

    const [form, setForm] = useState({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        level: 1
    })
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

    function resetForm(updatedQuestions){
        setForm({
            question: '',
            options: ['', '', '', ''],
            correctAnswer: 0,
            level: nextLevel(updatedQuestions)
        })
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
        const level = Number(form.level)
        if(Number.isNaN(level) || level < 1 || level > 15) {
            setError('Difficulty level must be selected between 1 and 15')
            return
        }

        const duplicateLevel = questions.some((oneQuestion, index) => oneQuestion.level === level && index !== editIndex)
        if (duplicateLevel) {
            setError(`Level ${level} is already used by another question`)
            return
        }
        const question = {
            question: form.question.trim(),
            options: form.options.map(option => option.trim()),
            correctAnswer: Number(form.correctAnswer),
            level: level
        }
        let updatedQuestions
        if(editIndex === null) {
            updatedQuestions=[...questions,question]
        } else{
            updatedQuestions = [...questions]
            updatedQuestions[editIndex] = question
        }
        setQuestions(updatedQuestions)
        resetForm(updatedQuestions)
    }
    function editQuestion (index) {
        const question = questions[index]

        setForm({
            question: question.question,
            options: [...question.options],
            correctAnswer: question.correctAnswer,
            level: question.level
        })

        setEditIndex(index)
        setError('')
    }
    function deleteQuestion(index) {
        const updatedQuestions = questions.filter((question, i) => i !== index)
        setQuestions(updatedQuestions)
        if (editIndex === index) {
            resetForm(updatedQuestions)
        }
    }
  return (
    <div>
      {questions.length > 0 && (
        <ul className="questions">
            {questions.map((question,index) => (
                <li className="question-item" key={index}>
                    <h4>
                        question {index + 1}: {question.question}
                    </h4>
                    <p>Level {question.level}</p>
                    <ul className='options'>
                        {question.options.map((option, i) =>(
                            <li key={i} className={
                                i === question.correctAnswer
                                 ? 'correct-option' 
                                 : ''
                            }>
                                {answers[i]}. {option}
                                {i === question.correctAnswer && ' ✓'}

                            </li>
                        ))}
                    </ul>
                    <div className='button-row'>
                        <button type='button' className='button small-button second-button' onClick={() => editQuestion(index)}>
                            Edit
                        </button>
                        <button type='button' className='button small-button danger-button' onClick={() => deleteQuestion(index)}>
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
        {error && <p className="error-box" role='alert'>{error}</p>}

        <div>
            <div className='field'>
                <label htmlFor='question-text'>Question</label>
                <textarea id="question-text"
                name='question'
                rows='2'
                value={form.question}
                onChange={handleChange}
                />
            </div>

            <div className='field'>
                <label htmlFor='question-level'>Difficulty level (1 - 15)</label>
                <select id="question-level"
                name='level'
                value={form.level}
                onChange={handleChange}
                > 
                {Array.from({ length:15}, (_, i) => i + 1).map(level =>(
                    <option key={level} value={level}>
                        {level}
                    </option>
                ))}
                </select>
            </div>


            <fieldset>
                <legend className='legend-field'>Answer options</legend>
                {form.options.map((option, index)=> (
                    <div className='option-row' key={index}>
                        <span className='option-letter'>
                            {answers[index]}
                        </span>

                    <label htmlFor={`option-${index}`} className='screen-reader'>
                        {'Answer ' + answers[index] + ' '}
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
                    <input className='correct-radio'
                    type='radio'
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

            <div className='button-row'>
                <button type='button' className='button main-button' onClick={handleSubmit}>
                {editIndex === null ? 'Add question' : 'Update question'}
                </button>

                {editIndex !== null &&(
                    <button type='button' className='button' onClick={() =>resetForm(questions)}>
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
