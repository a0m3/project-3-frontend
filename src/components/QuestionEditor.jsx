import {useState} from 'react'

const answers = ['A', 'B', 'C', 'D']

function QuestionEditor((questions, setQuestions)) {
    const newQuestion = {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0
    }

    const [form, setForm] = useState(newQuestion)
    const [editIndex, setEditIndex] = useState(null)
    const [error, setError] = useState('')
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

    function saveQuestion(event){
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
            question: questions.question,
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
                                i === question.correctAnswer ? 'is correct' : ''
                            }>
                                {answers[i]}. {option}
                                {i === question.correctAnswer && '✓'}

                            </li>
                        ))}
                    </ul>
                    <div className='btn-row'>
                        <button type='button' className='btn btn-sm btn-secondary' onClick={() => deleteQuestion(index)}>
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
      )}
      <article className='card'></article>
    </div>
  )
}

export default QuestionEditor
