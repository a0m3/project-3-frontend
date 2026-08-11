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
  return (
    <div>
      
    </div>
  )
}

export default QuestionEditor
