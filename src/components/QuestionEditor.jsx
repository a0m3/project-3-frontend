import {useState} from 'react'

const answers = ['A', 'B', 'C', 'D']

function QuestionEditor((questions, setQuestions)) {
    const newQuestion = {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0
    }

    const [form, setForm] = useState(emptyQuestion)
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
  return (
    <div>
      
    </div>
  )
}

export default QuestionEditor
