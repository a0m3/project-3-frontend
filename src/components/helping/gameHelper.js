export function getWrongAnswers(correctAnswer) {
    const wrong = [0, 1, 2, 3].filter(
        index => index !== correctAnswer
    )

    wrong.sort(() => Math.random() - 0.5)
    return wrong;
}


export function getFiftyFiftyAnswers(correctAnswer) {
    const wrong = getWrongAnswers(correctAnswer)

    return wrong.slice(0, 2)
}



export function getAudienceResult(correctAnswer) {
    const result = [0, 0, 0, 0]

    result[correctAnswer] = 60

    let remaining = 40

    for (let i = 0; i < 4; i++) {
        if (i !== correctAnswer) {
            const percentage = Math.floor(Math.random() * remaining)

            result[i] = percentage
            remaining = remaining - percentage
        }
    }

    return result
}


export function getPhoneAnswer(correctAnswer) {
    const isCorrect = Math.random() < 0.8

    if (isCorrect) {
        return correctAnswer
    }

    const wrong = getWrongAnswers(correctAnswer)

    return wrong[0]
}


export function checkAnswer(selected, correctAnswer) {
    if (selected === correctAnswer) {
        return true
    }

    return false
}
